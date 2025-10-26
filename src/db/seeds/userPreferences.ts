import { db } from '@/db';
import { userPreferences } from '@/db/schema';

async function main() {
    const sampleUserPreferences = [
        {
            userId: 'cust_2fK8jP9qL3mN4rT6',
            language: 'en',
            theme: 'light',
            twoFactorEnabled: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            userId: 'sell_5aH7kM2pW8xQ9yV1',
            language: 'en',
            theme: 'dark',
            twoFactorEnabled: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(userPreferences).values(sampleUserPreferences);
    
    console.log('✅ User preferences seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});