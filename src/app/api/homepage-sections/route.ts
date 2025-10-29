import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HomepageSection from '@/models/HomepageSection';

export async function GET() {
  try {
    await dbConnect();
    const sections = await HomepageSection.find({ isActive: true })
      .sort({ displayOrder: 1 })
      .lean();
    
    return NextResponse.json(sections);
  } catch (error) {
    if (process.env.MONGODB_URI) console.error('Error fetching homepage sections:', error);
    // Return mock data if MongoDB is not available
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const section = await HomepageSection.create(body);
    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    console.error('Error creating homepage section:', error);
    return NextResponse.json(
      { error: 'Failed to create homepage section' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { error: 'Section ID is required' },
        { status: 400 }
      );
    }
    
    const section = await HomepageSection.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );
    
    return NextResponse.json(section);
  } catch (error) {
    console.error('Error updating homepage section:', error);
    return NextResponse.json(
      { error: 'Failed to update homepage section' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Section ID is required' },
        { status: 400 }
      );
    }
    
    await HomepageSection.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Error deleting homepage section:', error);
    return NextResponse.json(
      { error: 'Failed to delete homepage section' },
      { status: 500 }
    );
  }
}
