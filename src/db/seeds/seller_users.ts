import { db } from '@/db';
import { user, account } from '@/db/schema';
import bcrypt from 'bcrypt';

async function main() {
    const now = new Date();
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Create seller users
    const sampleUsers = [
        {
            id: 'seller_tech001',
            name: 'TechHub Store',
            email: 'seller1@example.com',
            emailVerified: true,
            image: null,
            role: 'seller',
            businessName: 'TechHub Store',
            storeId: 'store-tech001',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'seller_fashion002',
            name: 'Fashion Boutique',
            email: 'seller2@example.com',
            emailVerified: true,
            image: null,
            role: 'seller',
            businessName: 'Fashion Boutique',
            storeId: 'store-fashion002',
            createdAt: now,
            updatedAt: now,
        }
    ];

    // Create corresponding account records
    const sampleAccounts = [
        {
            id: 'acc_seller_tech001',
            accountId: 'seller1@example.com',
            providerId: 'credential',
            userId: 'seller_tech001',
            password: hashedPassword,
            accessToken: null,
            refreshToken: null,
            idToken: null,
            accessTokenExpiresAt: null,
            refreshTokenExpiresAt: null,
            scope: null,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'acc_seller_fashion002',
            accountId: 'seller2@example.com',
            providerId: 'credential',
            userId: 'seller_fashion002',
            password: hashedPassword,
            accessToken: null,
            refreshToken: null,
            idToken: null,
            accessTokenExpiresAt: null,
            refreshTokenExpiresAt: null,
            scope: null,
            createdAt: now,
            updatedAt: now,
        }
    ];

    // Insert users
    await db.insert(user).values(sampleUsers);
    
    // Insert accounts
    await db.insert(account).values(sampleAccounts);
    
    console.log('✅ Seller users and accounts seeder completed successfully');
    console.log('📧 Login credentials: seller1@example.com / password123');
    console.log('📧 Login credentials: seller2@example.com / password123');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});