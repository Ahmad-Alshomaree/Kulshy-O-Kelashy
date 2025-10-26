import { db } from '@/db';
import { userPreferences } from '@/db/schema';

async function main() {
    const samplePreferences = [
        {
            userId: 'user_john_doe_001',
            language: 'en',
            theme: 'light',
            twoFactorEnabled: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            userId: 'user_sara_ali_002',
            language: 'ar',
            theme: 'dark',
            twoFactorEnabled: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    await db.insert(userPreferences).values(samplePreferences);
    
    console.log('✅ User preferences seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});