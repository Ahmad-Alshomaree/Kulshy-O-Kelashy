import { db } from '@/db';
import { user, account } from '@/db/schema';
import bcrypt from 'bcrypt';

async function main() {
    const currentTimestamp = new Date();

    // Hash passwords
    const johnPassword = await bcrypt.hash('password123', 10);
    const saraPassword = await bcrypt.hash('password456', 10);

    // Create users
    const sampleUsers = [
        {
            id: 'user_john_doe_001',
            name: 'John Doe',
            email: 'john@example.com',
            emailVerified: false,
            image: null,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            id: 'user_sara_ali_002',
            name: 'Sara Ali',
            email: 'sara@example.com',
            emailVerified: true,
            image: null,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
    ];

    await db.insert(user).values(sampleUsers);

    // Create account records with hashed passwords
    const sampleAccounts = [
        {
            id: 'acc_john_001',
            accountId: 'john@example.com',
            providerId: 'credential',
            userId: 'user_john_doe_001',
            password: johnPassword,
            accessToken: null,
            refreshToken: null,
            idToken: null,
            accessTokenExpiresAt: null,
            refreshTokenExpiresAt: null,
            scope: null,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            id: 'acc_sara_002',
            accountId: 'sara@example.com',
            providerId: 'credential',
            userId: 'user_sara_ali_002',
            password: saraPassword,
            accessToken: null,
            refreshToken: null,
            idToken: null,
            accessTokenExpiresAt: null,
            refreshTokenExpiresAt: null,
            scope: null,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
    ];

    await db.insert(account).values(sampleAccounts);

    console.log('✅ Auth users and accounts seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});