import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const SITE_NAME = 'EcoShop';
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export interface OrderConfirmationEmailData {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  orderDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface PasswordResetEmailData {
  email: string;
  resetToken: string;
  expiresIn: string;
}

export interface EmailVerificationData {
  email: string;
  verificationToken: string;
  expiresIn: string;
}

// Send order confirmation email
export async function sendOrderConfirmationEmail(data: OrderConfirmationEmailData) {
  try {
    const itemsHtml = data.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `
      )
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #4A7C59; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Order Confirmation</h1>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
            <p>Hi ${data.customerName},</p>
            <p>Thank you for your order! We've received your order and will start processing it shortly.</p>
            
            <div style="background-color: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <h2 style="margin-top: 0;">Order Details</h2>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Order Date:</strong> ${data.orderDate}</p>
            </div>
            
            <div style="background-color: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <h2 style="margin-top: 0;">Items Ordered</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f0f0f0;">
                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                    <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              
              <div style="margin-top: 20px; padding-top: 10px; border-top: 2px solid #ddd;">
                <p style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Subtotal:</span>
                  <span>$${data.subtotal.toFixed(2)}</span>
                </p>
                <p style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Shipping:</span>
                  <span>$${data.shippingCost.toFixed(2)}</span>
                </p>
                <p style="display: flex; justify-content: space-between; margin: 15px 0 0 0; font-size: 18px; font-weight: bold;">
                  <span>Total:</span>
                  <span>$${data.total.toFixed(2)}</span>
                </p>
              </div>
            </div>
            
            <div style="background-color: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <h2 style="margin-top: 0;">Shipping Address</h2>
              <p style="margin: 5px 0;">${data.shippingAddress.fullName}</p>
              <p style="margin: 5px 0;">${data.shippingAddress.addressLine1}</p>
              ${data.shippingAddress.addressLine2 ? `<p style="margin: 5px 0;">${data.shippingAddress.addressLine2}</p>` : ''}
              <p style="margin: 5px 0;">${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postalCode}</p>
              <p style="margin: 5px 0;">${data.shippingAddress.country}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${SITE_URL}/account/orders" style="display: inline-block; background-color: #4A7C59; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Order Status</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              If you have any questions about your order, please contact us at support@ecoshop.com
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    const { data: response, error } = await resend.emails.send({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to: data.customerEmail,
      subject: `Order Confirmation - ${data.orderNumber}`,
      html,
    });

    if (error) {
      console.error('Error sending order confirmation email:', error);
      throw error;
    }

    return response;
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    throw error;
  }
}

// Send password reset email
export async function sendPasswordResetEmail(data: PasswordResetEmailData) {
  try {
    const resetUrl = `${SITE_URL}/reset-password?token=${data.resetToken}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #4A7C59; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Reset Your Password</h1>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
            <p>Hi,</p>
            <p>We received a request to reset your password for your ${SITE_NAME} account.</p>
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="display: inline-block; background-color: #4A7C59; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; word-break: break-all; font-size: 14px;">
              ${resetUrl}
            </p>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              <strong>This link will expire in ${data.expiresIn}.</strong>
            </p>
            
            <p style="font-size: 14px; color: #666;">
              If you didn't request a password reset, you can safely ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    const { data: response, error } = await resend.emails.send({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to: data.email,
      subject: 'Reset Your Password',
      html,
    });

    if (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }

    return response;
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw error;
  }
}

// Send email verification
export async function sendEmailVerificationEmail(data: EmailVerificationData) {
  try {
    const verificationUrl = `${SITE_URL}/verify-email?token=${data.verificationToken}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #4A7C59; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Verify Your Email</h1>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
            <p>Welcome to ${SITE_NAME}!</p>
            <p>Please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="display: inline-block; background-color: #4A7C59; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; word-break: break-all; font-size: 14px;">
              ${verificationUrl}
            </p>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              <strong>This link will expire in ${data.expiresIn}.</strong>
            </p>
            
            <p style="font-size: 14px; color: #666;">
              If you didn't create an account, you can safely ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    const { data: response, error } = await resend.emails.send({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to: data.email,
      subject: 'Verify Your Email Address',
      html,
    });

    if (error) {
      console.error('Error sending email verification:', error);
      throw error;
    }

    return response;
  } catch (error) {
    console.error('Failed to send email verification:', error);
    throw error;
  }
}

// Send seller order notification
export async function sendSellerOrderNotification({
  sellerEmail,
  sellerName,
  orderNumber,
  productName,
  quantity,
  total,
}: {
  sellerEmail: string;
  sellerName: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  total: number;
}) {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order Received</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #4A7C59; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">New Order Received!</h1>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
            <p>Hi ${sellerName},</p>
            <p>Great news! You've received a new order.</p>
            
            <div style="background-color: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <h2 style="margin-top: 0;">Order Details</h2>
              <p><strong>Order Number:</strong> ${orderNumber}</p>
              <p><strong>Product:</strong> ${productName}</p>
              <p><strong>Quantity:</strong> ${quantity}</p>
              <p><strong>Total:</strong> $${total.toFixed(2)}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${SITE_URL}/seller/orders" style="display: inline-block; background-color: #4A7C59; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Order</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Please process this order as soon as possible to ensure customer satisfaction.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    const { data: response, error } = await resend.emails.send({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to: sellerEmail,
      subject: `New Order Received - ${orderNumber}`,
      html,
    });

    if (error) {
      console.error('Error sending seller order notification:', error);
      throw error;
    }

    return response;
  } catch (error) {
    console.error('Failed to send seller order notification:', error);
    throw error;
  }
}
