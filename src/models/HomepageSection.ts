import mongoose, { Schema, Document } from 'mongoose';

export interface IHomepageSection extends Document {
  title: string;
  featureType: 'high-rated' | 'offers' | 'most-viewed' | 'new-arrivals' | 'custom';
  displayOrder: number;
  backgroundColor?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HomepageSectionSchema = new Schema<IHomepageSection>({
  title: { type: String, required: true },
  featureType: { 
    type: String, 
    required: true, 
    enum: ['high-rated', 'offers', 'most-viewed', 'new-arrivals', 'custom'],
    default: 'custom'
  },
  displayOrder: { type: Number, required: true, default: 0 },
  backgroundColor: { type: String },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default mongoose.models.HomepageSection || mongoose.model<IHomepageSection>('HomepageSection', HomepageSectionSchema);
