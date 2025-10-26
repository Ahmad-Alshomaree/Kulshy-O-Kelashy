import { db } from '@/db';
import { users } from '@/db/schema';
import bcrypt from 'bcrypt';

async function main() {
    const passwordHash = await bcrypt.hash('password123', 10);
    
    const sampleUsers = [
        {
            email: 'admin@shop.com',
            name: 'Admin User',
            passwordHash: passwordHash,
            role: 'admin',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
            phone: '+1234567890',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            email: 'seller@shop.com',
            name: 'Seller User',
            passwordHash: passwordHash,
            role: 'seller',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seller',
            phone: '+1234567891',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            email: 'customer@shop.com',
            name: 'Customer User',
            passwordHash: passwordHash,
            role: 'customer',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=customer',
            phone: '+1234567892',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(users).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});