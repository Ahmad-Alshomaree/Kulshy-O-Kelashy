import { db } from '@/db';
import { user } from '@/db/schema';

async function main() {
    const currentTimestamp = new Date();

    const sampleUsers = [
        {
            id: 'cust_2fK8jP9qL3mN4rT6',
            name: 'John Doe',
            email: 'customer@shop.com',
            emailVerified: false,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=customer',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            id: 'sell_5aH7kM2pW8xQ9yV1',
            name: 'Jane Smith',
            email: 'seller@shop.com',
            emailVerified: true,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seller',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
    ];

    await db.insert(user).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});