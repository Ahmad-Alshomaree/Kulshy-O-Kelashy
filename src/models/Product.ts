import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  sellerId?: mongoose.Types.ObjectId;
  categoryId?: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
  viewCount: number;
  isNew: boolean;
  isSale: boolean;
  discount?: string;
  colors?: string[];
  sizes?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  tags?: string[];
  mainImage: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  sellerId: { type: Schema.Types.ObjectId, ref: 'User' },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  stock: { type: Number, required: true, default: 0 },
  sku: { type: String, required: true, unique: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  isNew: { type: Boolean, default: false },
  isSale: { type: Boolean, default: false },
  discount: { type: String },
  colors: [{ type: String }],
  sizes: [{ type: String }],
  features: [{ type: String }],
  specifications: { type: Map, of: String },
  tags: [{ type: String }],
  mainImage: { type: String, required: true },
  images: [{ type: String }],
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
