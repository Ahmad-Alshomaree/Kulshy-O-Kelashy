import mongoose, { Schema, Document } from 'mongoose';

export interface IFooterLink {
  label: string;
  url: string;
}

export interface IFooterColumn {
  title: string;
  links: IFooterLink[];
}

export interface IFooterSection extends Document {
  newsletter: {
    title: string;
    description: string;
  };
  columns: IFooterColumn[];
  downloadApp: {
    title: string;
    description: string;
    appStoreUrl?: string;
    playStoreUrl?: string;
    qrCode?: string;
  };
  copyright: string;
  createdAt: Date;
  updatedAt: Date;
}

const FooterSectionSchema = new Schema<IFooterSection>({
  newsletter: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  columns: [{
    title: { type: String, required: true },
    links: [{
      label: { type: String, required: true },
      url: { type: String, required: true },
    }],
  }],
  downloadApp: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    appStoreUrl: { type: String },
    playStoreUrl: { type: String },
    qrCode: { type: String },
  },
  copyright: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.FooterSection || mongoose.model<IFooterSection>('FooterSection', FooterSectionSchema);
