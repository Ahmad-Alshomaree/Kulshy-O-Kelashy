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
    console.error('Error fetching footer section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer section' },
      { status: 500 }
    );
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
