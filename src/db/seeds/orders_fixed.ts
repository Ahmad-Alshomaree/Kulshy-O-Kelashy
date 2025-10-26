import { db } from '@/db';
import { orders, user } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    // Query existing users
    const seller1 = await db.select().from(user).where(eq(user.email, 'seller1@example.com')).limit(1);
    const seller2 = await db.select().from(user).where(eq(user.email, 'seller2@example.com')).limit(1);
    
    if (seller1.length === 0 || seller2.length === 0) {
        throw new Error('Seller users not found. Please run user seeder first.');
    }

    const seller1Id = seller1[0].id;
    const seller2Id = seller2[0].id;

    // Query customer users
    const customers = await db.select().from(user).limit(8);
    
    if (customers.length < 8) {
        throw new Error('Not enough customer users found. Please run user seeder first.');
    }

    // Calculate timestamps
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    const sixDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
    const fourDaysAgo = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
    const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000);

    const sampleOrders = [
        {
            user_id: customers[0].id,
            seller_id: seller1Id,
            total_amount: 219.98,
            status: 'delivered',
            payment_status: 'paid',
            shipping_address: '123 Main St, New York, NY 10001',
            created_at: sevenDaysAgo.toISOString(),
            updated_at: twoDaysAgo.toISOString(),
        },
        {
            user_id: customers[1].id,
            seller_id: seller1Id,
            total_amount: 149.99,
            status: 'shipped',
            payment_status: 'paid',
            shipping_address: '456 Oak Ave, Los Angeles, CA 90001',
            created_at: threeDaysAgo.toISOString(),
            updated_at: oneDayAgo.toISOString(),
        },
        {
            user_id: customers[2].id,
            seller_id: seller1Id,
            total_amount: 89.99,
            status: 'processing',
            payment_status: 'paid',
            shipping_address: '789 Pine Rd, Chicago, IL 60601',
            created_at: oneDayAgo.toISOString(),
            updated_at: oneDayAgo.toISOString(),
        },
        {
            user_id: customers[3].id,
            seller_id: seller1Id,
            total_amount: 299.98,
            status: 'pending',
            payment_status: 'pending',
            shipping_address: '321 Elm St, Houston, TX 77001',
            created_at: fiveHoursAgo.toISOString(),
            updated_at: fiveHoursAgo.toISOString(),
        },
        {
            user_id: customers[4].id,
            seller_id: seller2Id,
            total_amount: 299.99,
            status: 'delivered',
            payment_status: 'paid',
            shipping_address: '555 Fashion Blvd, Miami, FL 33101',
            created_at: tenDaysAgo.toISOString(),
            updated_at: threeDaysAgo.toISOString(),
        },
        {
            user_id: customers[5].id,
            seller_id: seller2Id,
            total_amount: 139.98,
            status: 'shipped',
            payment_status: 'paid',
            shipping_address: '777 Style Ave, Seattle, WA 98101',
            created_at: fourDaysAgo.toISOString(),
            updated_at: twoDaysAgo.toISOString(),
        },
        {
            user_id: customers[6].id,
            seller_id: seller2Id,
            total_amount: 59.99,
            status: 'processing',
            payment_status: 'paid',
            shipping_address: '999 Trend St, Boston, MA 02101',
            created_at: twoDaysAgo.toISOString(),
            updated_at: oneDayAgo.toISOString(),
        },
        {
            user_id: customers[7].id,
            seller_id: seller2Id,
            total_amount: 379.97,
            status: 'cancelled',
            payment_status: 'refunded',
            shipping_address: '111 Vogue Dr, Austin, TX 78701',
            created_at: sixDaysAgo.toISOString(),
            updated_at: fiveDaysAgo.toISOString(),
        },
    ];

    await db.insert(orders).values(sampleOrders);
    
    console.log('✅ Orders seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});