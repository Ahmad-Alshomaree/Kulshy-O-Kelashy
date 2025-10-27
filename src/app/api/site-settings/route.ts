import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export async function GET() {
  try {
    await dbConnect();
    let settings = await SiteSettings.findOne().lean();
    
    if (!settings) {
      // Create default settings if none exist
      settings = await SiteSettings.create({
        siteName: 'Kulshy O-Klashy',
        contactEmail: 'contact@kulshyoklashy.com',
        socialMedia: {},
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    // Return default settings if MongoDB is not available
    return NextResponse.json({
      siteName: 'Kulshy O-Klashy',
      contactEmail: 'contact@kulshyoklashy.com',
      socialMedia: {},
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true }
    );
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json(
      { error: 'Failed to update site settings' },
      { status: 500 }
    );
  }
}
