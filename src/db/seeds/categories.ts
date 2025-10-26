import { db } from '@/db';
import { categories } from '@/db/schema';

async function main() {
    const sampleCategories = [
        {
            name: 'Electronics',
            slug: 'electronics',
            description: 'Latest gadgets, computers, and electronic devices',
            parentId: null,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Clothing',
            slug: 'clothing',
            description: 'Fashion apparel for men and women',
            parentId: null,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Home & Garden',
            slug: 'home-garden',
            description: 'Furniture, decor, and gardening supplies',
            parentId: null,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Sports',
            slug: 'sports',
            description: 'Sports equipment and athletic wear',
            parentId: null,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Books',
            slug: 'books',
            description: 'Books, magazines, and reading materials',
            parentId: null,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Beauty',
            slug: 'beauty',
            description: 'Cosmetics, skincare, and beauty products',
            parentId: null,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Toys',
            slug: 'toys',
            description: 'Toys and games for all ages',
            parentId: null,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Furniture',
            slug: 'furniture',
            description: 'Indoor and outdoor furniture',
            parentId: null,
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(categories).values(sampleCategories);
    
    console.log('✅ Categories seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});