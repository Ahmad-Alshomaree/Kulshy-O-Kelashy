/**
 * Seed script to populate MongoDB with initial data for the data-driven website
 * Run this script with: npx tsx scripts/seed-content.ts
 */

import dbConnect from '../src/lib/mongodb';
import SiteSettings from '../src/models/SiteSettings';
import HeroSection from '../src/models/HeroSection';
import FooterSection from '../src/models/FooterSection';
import HomepageSection from '../src/models/HomepageSection';

async function seedContent() {
  try {
    console.log('Connecting to MongoDB...');
    await dbConnect();
    console.log('Connected to MongoDB successfully!');

    // Seed Site Settings
    console.log('\nSeeding Site Settings...');
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      await SiteSettings.create({
        siteName: 'Kulshy O-Klashy',
        contactEmail: 'contact@kulshyoklashy.com',
        contactPhone: '+1 (555) 123-4567',
        socialMedia: {
          facebook: '#',
          twitter: '#',
          instagram: '#',
        },
      });
      console.log('✓ Site Settings seeded');
    } else {
      console.log('✓ Site Settings already exist');
    }

    // Seed Hero Section
    console.log('\nSeeding Hero Section...');
    const existingHero = await HeroSection.findOne();
    if (!existingHero) {
      await HeroSection.create({
        title: 'Sofa Eco Cula',
        subtitle: 'Experience comfort like never before',
        price: 799.99,
        originalPrice: 999.99,
        rating: 5,
        reviewCount: 120,
        image: '/placeholder.svg?height=400&width=600&text=Modern+Sofa',
        buttons: {
          primary: {
            text: 'Shop Now',
            link: '/products',
          },
          secondary: {
            text: 'Learn More',
            link: '/about',
          },
        },
        isActive: true,
      });
      console.log('✓ Hero Section seeded');
    } else {
      console.log('✓ Hero Section already exists');
    }

    // Seed Footer Section
    console.log('\nSeeding Footer Section...');
    const existingFooter = await FooterSection.findOne();
    if (!existingFooter) {
      await FooterSection.create({
        newsletter: {
          title: 'Newsletter',
          description: 'Subscribe to our newsletter to get updates on our latest offers!',
        },
        columns: [
          {
            title: 'Support',
            links: [
              { label: 'Contact Us', url: '/support/contact' },
              { label: 'Shipping Info', url: '/support/shipping' },
              { label: 'Returns', url: '/support/returns' },
              { label: 'FAQ', url: '/support/faq' },
            ],
          },
          {
            title: 'Account',
            links: [
              { label: 'My Account', url: '/account' },
              { label: 'Order History', url: '/account/orders' },
              { label: 'Wishlist', url: '/wishlist' },
              { label: 'Profile', url: '/account/personal-info' },
            ],
          },
        ],
        downloadApp: {
          title: 'Download App',
          description: 'Get our mobile app for a better experience',
          appStoreUrl: '#',
          playStoreUrl: '#',
          qrCode: '/placeholder.svg?height=100&width=100&text=QR+Code',
        },
        copyright: '© 2023 Kulshy O-Klashy. All rights reserved.',
      });
      console.log('✓ Footer Section seeded');
    } else {
      console.log('✓ Footer Section already exists');
    }

    // Seed Homepage Sections
    console.log('\nSeeding Homepage Sections...');
    const existingSections = await HomepageSection.find();
    if (existingSections.length === 0) {
      await HomepageSection.insertMany([
        {
          title: 'High-Rated Items',
          featureType: 'high-rated',
          displayOrder: 1,
          isActive: true,
        },
        {
          title: 'Offers',
          featureType: 'offers',
          displayOrder: 2,
          backgroundColor: 'bg-muted/50',
          isActive: true,
        },
        {
          title: 'Most Viewed',
          featureType: 'most-viewed',
          displayOrder: 3,
          isActive: true,
        },
      ]);
      console.log('✓ Homepage Sections seeded');
    } else {
      console.log('✓ Homepage Sections already exist');
    }

    console.log('\n✅ All content seeded successfully!');
    console.log('\nYou can now access the admin dashboard to manage this content.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding content:', error);
    process.exit(1);
  }
}

seedContent();
