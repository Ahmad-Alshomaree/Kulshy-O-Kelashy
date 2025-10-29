import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HeroSection from '@/models/HeroSection';

export async function GET() {
  try {
    await dbConnect();
    const heroSection = await HeroSection.findOne({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();
    
    if (!heroSection) {
      return NextResponse.json(
        { error: 'No active hero section found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(heroSection);
  } catch (error) {
    if (process.env.MONGODB_URI) console.error('Error fetching hero section:', error);
    // Return mock data if MongoDB is not available
    return NextResponse.json({
      title: 'Sofa Eco Cula',
      subtitle: 'Experience comfort like never before',
      price: 799.99,
      originalPrice: 999.99,
      rating: 5,
      reviewCount: 120,
      image: '/placeholder.svg?height=400&width=600&text=Modern+Sofa',
      buttons: {
        primary: { text: 'Shop Now', link: '/products' },
        secondary: { text: 'Learn More', link: '/about' },
      },
      isActive: true,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    let heroSection;
    if (_id) {
      heroSection = await HeroSection.findByIdAndUpdate(
        _id,
        updateData,
        { new: true }
      );
    } else {
      heroSection = await HeroSection.create(updateData);
    }
    
    return NextResponse.json(heroSection);
  } catch (error) {
    console.error('Error updating hero section:', error);
    return NextResponse.json(
      { error: 'Failed to update hero section' },
      { status: 500 }
    );
  }
}
