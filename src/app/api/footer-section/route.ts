import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FooterSection from '@/models/FooterSection';

export async function GET() {
  try {
    await dbConnect();
    let footerSection = await FooterSection.findOne().lean();
    
    if (!footerSection) {
      return NextResponse.json(
        { error: 'Footer section not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(footerSection);
  } catch (error) {
    if (process.env.MONGODB_URI) console.error('Error fetching footer section:', error);
    // Return mock data if MongoDB is not available
    return NextResponse.json({
      links: [
        { title: 'About Us', url: '/about' },
        { title: 'Contact', url: '/contact' },
        { title: 'Privacy', url: '/privacy' },
        { title: 'Terms', url: '/terms' },
      ],
      socialMedia: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
      },
      copyright: '© 2024 Kulshy O-Klashy. All rights reserved.',
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const footerSection = await FooterSection.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true }
    );
    
    return NextResponse.json(footerSection);
  } catch (error) {
    console.error('Error updating footer section:', error);
    return NextResponse.json(
      { error: 'Failed to update footer section' },
      { status: 500 }
    );
  }
}
