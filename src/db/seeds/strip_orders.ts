import { db } from '@/db';
import { stripeOrders, orderItems, kulshyProducts } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    // First, query existing products to get accurate data
    const products = await db.select().from(kulshyProducts).where(eq(kulshyProducts.productId, 1)).limit(5);
    
    if (products.length === 0) {
        console.error('❌ No products found. Please seed kulshyProducts table first.');
        return;
    }

    // Sample shipping addresses
    const shippingAddresses = [
        { line1: '123 Main St', city: 'New York', state: 'NY', postal_code: '10001', country: 'US' },
        { line1: '456 Oak Ave', city: 'Los Angeles', state: 'CA', postal_code: '90001', country: 'US' },
        { line1: '789 Pine Rd', city: 'Chicago', state: 'IL', postal_code: '60601', country: 'US' },
    ];

    // User data for reference
    const users = [
        { id: 'user_john_doe_001', email: 'john@example.com', name: 'John Doe' },
        { id: 'user_sara_ali_002', email: 'sara@example.com', name: 'Sara Ali' },
    ];

    // Generate 5 orders
    const orderDates = [
        new Date('2024-12-05'),
        new Date('2024-12-10'),
        new Date('2024-12-15'),
        new Date('2024-12-20'),
        new Date('2024-12-25'),
    ];

    const orderStatuses = ['pending', 'processing', 'completed', 'completed', 'delivered'];
    const paymentStatuses = ['paid', 'paid', 'paid', 'paid', 'paid'];

    for (let i = 0; i < 5; i++) {
        const user = users[i % 2];
        const orderDate = orderDates[i];
        const updatedDate = new Date(orderDate);
        updatedDate.setDate(updatedDate.getDate() + Math.floor(Math.random() * 5));

        // Generate random order items (1-3 items per order)
        const numItems = Math.floor(Math.random() * 3) + 1;
        const orderItemsData = [];
        let totalAmount = 0;

        for (let j = 0; j < numItems; j++) {
            const product = products[Math.floor(Math.random() * products.length)];
            const quantity = Math.floor(Math.random() * 3) + 1;
            const price = product.sellingPrice || 0;
            const subtotal = price * quantity;

            orderItemsData.push({
                productId: product.productId,
                productName: product.productName,
                quantity: quantity,
                price: price,
                subtotal: subtotal,
            });

            totalAmount += subtotal * 100; // Convert to cents
        }

        // Create order data
        const orderId = `ORD-${orderDate.getTime()}-${Math.random().toString(36).substring(2, 8)}`;
        const stripePaymentIntentId = `pi_${Math.random().toString(36).substring(2, 15)}`;
        const stripeCheckoutSessionId = `cs_${Math.random().toString(36).substring(2, 15)}`;

        const orderData = {
            orderId: orderId,
            userId: user.id,
            customerEmail: user.email,
            customerName: user.name,
            stripePaymentIntentId: stripePaymentIntentId,
            stripeCheckoutSessionId: stripeCheckoutSessionId,
            amount: Math.round(totalAmount),
            currency: 'usd',
            status: orderStatuses[i],
            paymentStatus: paymentStatuses[i],
            items: orderItemsData,
            shippingAddress: shippingAddresses[i % shippingAddresses.length],
            metadata: {
                userId: user.id,
                orderDate: orderDate.toISOString(),
                itemCount: numItems,
            },
            createdAt: orderDate.toISOString(),
            updatedAt: updatedDate.toISOString(),
        };

        // Insert order and get the ID
        const [insertedOrder] = await db.insert(stripeOrders).values(orderData).returning({ id: stripeOrders.id });

        // Insert order items
        const orderItemsToInsert = orderItemsData.map(item => ({
            orderId: insertedOrder.id,
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
            createdAt: orderDate.toISOString(),
        }));

        await db.insert(orderItems).values(orderItemsToInsert);

        console.log(`✅ Created order ${orderId} with ${numItems} items`);
    }

    console.log('✅ Stripe orders and order items seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});