import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  siteName: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  contactPhone?: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  siteName: { type: String, required: true, default: 'Kulshy O-Klashy' },
  logo: { type: String },
  favicon: { type: String },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  socialMedia: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
  },
}, {
  timestamps: true,
});

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
