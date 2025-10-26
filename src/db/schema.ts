import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Users Table
export const user = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('customer'),
  avatarUrl: text('avatar_url'),
  phone: text('phone'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Categories Table
export const kulshyCategories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  parentId: integer('parent_id').references((): any => kulshyCategories.id),
  createdAt: text('created_at').notNull(),
});

// Products Table
export const kulshyProducts = sqliteTable('products', {
  productId: integer('id').primaryKey({ autoIncrement: true }),
  sellerId: integer('seller_id').references(() => user.id),
  productCategories: integer('category_id').references(() => kulshyCategories.id),
  productName: text('name').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  originalPrice: real('original_price'),
  stock: integer('stock').notNull().default(0),
  sku: text('sku').notNull().unique(),
  rating: real('rating').notNull().default(0),
  reviewCount: integer('review_count').notNull().default(0),
  viewCount: integer('view_count').notNull().default(0),
  isNew: integer('is_new', { mode: 'boolean' }).notNull().default(false),
  isSaled: integer('is_sale', { mode: 'boolean' }).notNull().default(false),
  discount: text('discount'),
  colors: text('colors'),
  sizes: text('sizes'),
  features: text('features'),
  specifications: text('specifications'),
  tags: text('tags'),
  mainImage: text('main_image').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Product Images Table
export const productImages = sqliteTable('product_images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').references(() => kulshyProducts.productId),
  imageUrl: text('image_url').notNull(),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: text('created_at').notNull(),
});

// Cart Items Table
export const cartItems = sqliteTable('cart_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => user.id),
  productId: integer('product_id').references(() => kulshyProducts.productId),
  quantity: integer('quantity').notNull().default(1),
  selectedColor: text('selected_color'),
  selectedSize: text('selected_size'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Wishlist Items Table
export const wishlistItems = sqliteTable('wishlist_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => user.id),
  productId: integer('product_id').references(() => kulshyProducts.productId),
  createdAt: text('created_at').notNull(),
});

// Addresses Table
export const addresses = sqliteTable('addresses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => user.id),
  type: text('type').notNull(),
  fullName: text('full_name').notNull(),
  addressLine1: text('address_line1').notNull(),
  addressLine2: text('address_line2'),
  city: text('city').notNull(),
  state: text('state').notNull(),
  postalCode: text('postal_code').notNull(),
  country: text('country').notNull(),
  phone: text('phone').notNull(),
  isDefault: integer('is_default', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Payment Methods Table
export const paymentMethods = sqliteTable('payment_methods', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => user.id),
  type: text('type').notNull(),
  cardLastFour: text('card_last_four'),
  cardBrand: text('card_brand'),
  isDefault: integer('is_default', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Orders Table
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => user.id),
  orderNumber: text('order_number').notNull().unique(),
  status: text('status').notNull().default('pending'),
  subtotal: real('subtotal').notNull(),
  shippingCost: real('shipping_cost').notNull(),
  total: real('total').notNull(),
  shippingAddressId: integer('shipping_address_id').references(() => addresses.id),
  paymentMethodId: integer('payment_method_id').references(() => paymentMethods.id),
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Order Items Table
export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id').references(() => orders.id),
  productId: integer('product_id').references(() => kulshyProducts.productId),
  productName: text('product_name').notNull(),
  productPrice: real('product_price').notNull(),
  quantity: integer('quantity').notNull(),
  selectedColor: text('selected_color'),
  selectedSize: text('selected_size'),
  subtotal: real('subtotal').notNull(),
  createdAt: text('created_at').notNull(),
});

// Reviews Table
export const reviews = sqliteTable('reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').references(() => kulshyProducts.productId),
  userId: integer('user_id').references(() => user.id),
  rating: integer('rating').notNull(),
  title: text('title'),
  comment: text('comment').notNull(),
  isVerifiedPurchase: integer('is_verified_purchase', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Stripe Orders Table
export const stripeOrders = sqliteTable('stripe_orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: text('order_id').notNull().unique(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  customerEmail: text('customer_email').notNull(),
  customerName: text('customer_name').notNull(),
  stripePaymentIntentId: text('stripe_payment_intent_id').unique(),
  stripeCheckoutSessionId: text('stripe_checkout_session_id').unique(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull().default('usd'),
  status: text('status').notNull().default('pending'),
  paymentStatus: text('payment_status').notNull().default('unpaid'),
  items: text('items', { mode: 'json' }).notNull(),
  shippingAddress: text('shipping_address', { mode: 'json' }),
  metadata: text('metadata', { mode: 'json' }),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});