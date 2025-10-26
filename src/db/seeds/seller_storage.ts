import { db } from '@/db';
import { sellerStorage } from '@/db/schema';

async function main() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
    const twelveDaysAgo = new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000);
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
    const fourDaysAgo = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

    const sampleStorage = [
        {
            sellerId: 'seller_tech001',
            productId: 1,
            productName: 'Apple MacBook Pro 16" M3 Max',
            sku: 'ELEC-MBP-001-WH1',
            quantity: 5,
            lowStockThreshold: 10,
            warehouse: 'Warehouse A - Electronics',
            lastRestocked: fiveDaysAgo.toISOString(),
            createdAt: thirtyDaysAgo.toISOString(),
            updatedAt: fiveDaysAgo.toISOString(),
        },
        {
            sellerId: 'seller_tech001',
            productId: 2,
            productName: 'Sony WH-1000XM5 Wireless Headphones',
            sku: 'ELEC-SONY-002-WH1',
            quantity: 42,
            lowStockThreshold: 15,
            warehouse: 'Warehouse A - Electronics',
            lastRestocked: tenDaysAgo.toISOString(),
            createdAt: thirtyDaysAgo.toISOString(),
            updatedAt: tenDaysAgo.toISOString(),
        },
        {
            sellerId: 'seller_tech001',
            productId: 17,
            productName: 'Samsung 65" 4K QLED Smart TV',
            sku: 'ELEC-TV-017-WH1',
            quantity: 8,
            lowStockThreshold: 5,
            warehouse: 'Warehouse A - Electronics',
            lastRestocked: threeDaysAgo.toISOString(),
            createdAt: thirtyDaysAgo.toISOString(),
            updatedAt: threeDaysAgo.toISOString(),
        },
        {
            sellerId: 'seller_tech001',
            productId: 1,
            productName: 'Apple MacBook Pro 16" M3 Max',
            sku: 'ELEC-MBP-001-WH2',
            quantity: 3,
            lowStockThreshold: 8,
            warehouse: 'Warehouse B - Premium Tech',
            lastRestocked: sevenDaysAgo.toISOString(),
            createdAt: thirtyDaysAgo.toISOString(),
            updatedAt: sevenDaysAgo.toISOString(),
        },
        {
            sellerId: 'seller_fashion002',
            productId: 3,
            productName: 'Premium Cotton Henley Shirt',
            sku: 'CLOTH-HEN-003-WH1',
            quantity: 128,
            lowStockThreshold: 20,
            warehouse: 'Warehouse C - Apparel',
            lastRestocked: twoDaysAgo.toISOString(),
            createdAt: thirtyDaysAgo.toISOString(),
            updatedAt: twoDaysAgo.toISOString(),
        },
        {
            sellerId: 'seller_fashion002',
            productId: 4,
            productName: 'Slim Fit Denim Jeans',
            sku: 'CLOTH-DEN-004-WH1',
            quantity: 7,
            lowStockThreshold: 15,
            warehouse: 'Warehouse C - Apparel',
            lastRestocked: twelveDaysAgo.toISOString(),
            createdAt: thirtyDaysAgo.toISOString(),
            updatedAt: twelveDaysAgo.toISOString(),
        },
        {
            sellerId: 'seller_fashion002',
            productId: 18,
            productName: 'Leather Crossbody Messenger Bag',
            sku: 'CLOTH-BAG-018-WH1',
            quantity: 54,
            lowStockThreshold: 10,
            warehouse: 'Warehouse C - Apparel',
            lastRestocked: fourDaysAgo.toISOString(),
            createdAt: thirtyDaysAgo.toISOString(),
            updatedAt: fourDaysAgo.toISOString(),
        },
        {
            sellerId: 'seller_fashion002',
            productId: 3,
            productName: 'Premium Cotton Henley Shirt',
            sku: 'CLOTH-HEN-003-WH2',
            quantity: 6,
            lowStockThreshold: 10,
            warehouse: 'Warehouse D - Fashion Overflow',
            lastRestocked: fifteenDaysAgo.toISOString(),
            createdAt: thirtyDaysAgo.toISOString(),
            updatedAt: fifteenDaysAgo.toISOString(),
        },
    ];

    await db.insert(sellerStorage).values(sampleStorage);
    
    console.log('✅ Seller storage seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});