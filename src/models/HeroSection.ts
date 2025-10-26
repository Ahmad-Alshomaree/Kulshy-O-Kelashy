import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroSection extends Document {
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  buttons: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSectionSchema = new Schema<IHeroSection>({
  title: { type: String, required: true },
  subtitle: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  image: { type: String, required: true },
  buttons: {
    primary: {
      text: { type: String, required: true },
      link: { type: String, required: true },
    },
    secondary: {
      text: { type: String, required: true },
      link: { type: String, required: true },
    },
  },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default mongoose.models.HeroSection || mongoose.model<IHeroSection>('HeroSection', HeroSectionSchema);
