import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parentId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  parentId: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
