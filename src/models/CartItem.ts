import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1, min: 1 },
  selectedColor: { type: String },
  selectedSize: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.CartItem || mongoose.model<ICartItem>('CartItem', CartItemSchema);
