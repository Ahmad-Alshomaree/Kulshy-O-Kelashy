# 🚀 Production Deployment Guide

This guide will help you deploy your Next.js 15 e-commerce application to production with Vercel, Turso, and all required services.

## 📋 Prerequisites

Before deploying, ensure you have accounts for:

- ✅ [Vercel](https://vercel.com) - Application hosting
- ✅ [Turso](https://turso.tech) - Edge database
- ✅ [Upstash](https://upstash.com) - Redis for rate limiting
- ✅ [Stripe](https://stripe.com) - Payment processing
- ✅ [UploadThing](https://uploadthing.com) - File uploads
- ✅ [Sentry](https://sentry.io) - Error monitoring
- ✅ [Logtail](https://logtail.com) - Logging (optional)

---

## 1️⃣ Database Setup (Turso)

### Create Production Database

```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Login to Turso
turso auth login

# Create production database with replication
turso db create ecommerce-prod --group default

# Create auth token
turso db tokens create ecommerce-prod

# Get database URL
turso db show ecommerce-prod --url
```

### Run Migrations

```bash
# Set environment variables locally
export DATABASE_URL="libsql://[your-db-url].turso.io"
export DATABASE_AUTH_TOKEN="[your-token]"

# Generate and push migrations
npm run db:generate
npm run db:push
```

### Seed Initial Data

```bash
# Run seeders for categories and initial products
npm run db:seed
```

---

## 2️⃣ Upstash Redis Setup

1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database (select Global for edge compatibility)
3. Copy **REST URL** and **REST TOKEN**
4. Save these for environment variables

---

## 3️⃣ Stripe Setup

### Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers → API keys**
3. Copy your **Secret key** and **Publishable key**
4. For testing, use test keys (starts with `sk_test_` and `pk_test_`)

### Setup Webhook

1. Go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Set URL to: `https://your-domain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy **Signing secret** (starts with `whsec_`)

---

## 4️⃣ UploadThing Setup

1. Go to [UploadThing Dashboard](https://uploadthing.com/dashboard)
2. Create a new app
3. Copy **Secret** and **App ID**
4. Configure file size limits and allowed types

---

## 5️⃣ Sentry Setup

### Create Project

1. Go to [Sentry](https://sentry.io/)
2. Create a new Next.js project
3. Copy **DSN** from project settings
4. Generate **Auth Token** for source maps

### Configure Sentry

Already configured in:
- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`

---

## 6️⃣ Logtail Setup (Optional)

1. Go to [Logtail](https://logtail.com/)
2. Create a new source
3. Copy **Source Token**

---

## 7️⃣ Environment Variables

### Create `.env.production`

```bash
# Database (Turso)
DATABASE_URL=libsql://your-database.turso.io
DATABASE_AUTH_TOKEN=your-turso-token

# Authentication (better-auth)
BETTER_AUTH_SECRET=your-secure-random-secret-minimum-32-chars
BETTER_AUTH_URL=https://your-domain.com

# Stripe
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# UploadThing
UPLOADTHING_SECRET=sk_live_your_uploadthing_secret
UPLOADTHING_APP_ID=your_app_id

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Sentry (Error Monitoring)
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=your-auth-token

# Logtail (Logging) - Optional
LOGTAIL_TOKEN=your-logtail-token

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

---

## 8️⃣ Vercel Deployment

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Via GitHub Integration

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **Import Project**
4. Select your repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Add Environment Variables

1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.production`
3. Set appropriate environments (Production, Preview, Development)

### Important Settings

- **Node.js Version**: 18.x or higher
- **Regions**: Configure edge regions for global performance
- **Functions**: Ensure serverless functions have appropriate timeout (10s default)

---

## 9️⃣ Post-Deployment Checks

### 1. Verify Database Connection

```bash
# Test database query
curl https://your-domain.com/api/products?limit=1
```

### 2. Test Authentication

- Try to register a new user
- Verify email/password login
- Check protected routes

### 3. Test Rate Limiting

```bash
# Should return 429 after limit exceeded
for i in {1..20}; do
  curl https://your-domain.com/api/products
done
```

### 4. Verify File Uploads

- Login as seller
- Try uploading product images
- Check UploadThing dashboard for uploads

### 5. Test Stripe Integration

- Complete a test checkout
- Verify webhook receives events
- Check Stripe dashboard for payment

### 6. Monitor Errors

- Check Sentry for any errors
- Review Logtail logs
- Check Vercel Function logs

---

## 🔟 Performance Optimization

### Enable Caching

```typescript
// In API routes
export const revalidate = 60; // Revalidate every 60 seconds
```

### Image Optimization

- Use Next.js `<Image>` component
- Configure image domains in `next.config.ts`:

```typescript
images: {
  domains: ['utfs.io', 'uploadthing.com'],
  formats: ['image/avif', 'image/webp'],
}
```

### Database Optimization

```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
```

### Edge Functions

Convert heavy API routes to Edge runtime:

```typescript
export const runtime = 'edge';
```

---

## 1️⃣1️⃣ Monitoring & Alerts

### Vercel Analytics

- Already integrated via `<Analytics />` component
- View metrics in Vercel Dashboard

### Sentry Alerts

1. Go to Sentry Project Settings → Alerts
2. Create alert rules for:
   - Error spike detection
   - Performance degradation
   - High error rate

### Uptime Monitoring

Use services like:
- [UptimeRobot](https://uptimerobot.com/)
- [Pingdom](https://www.pingdom.com/)
- [Better Uptime](https://betteruptime.com/)

Monitor endpoints:
- `https://your-domain.com/api/health`
- `https://your-domain.com/`

---

## 1️⃣2️⃣ Backup Strategy

### Database Backups

```bash
# Create backup
turso db shell ecommerce-prod ".backup backup.db"

# Restore from backup
turso db shell ecommerce-prod ".restore backup.db"
```

### Automated Backups

```bash
# Create cron job for daily backups
0 2 * * * /usr/local/bin/turso db shell ecommerce-prod ".backup /backups/db-$(date +\%Y\%m\%d).db"
```

---

## 1️⃣3️⃣ Security Checklist

- ✅ All API routes have rate limiting
- ✅ Authentication middleware protects sensitive routes
- ✅ Environment variables are never exposed to client
- ✅ CORS is properly configured
- ✅ Content Security Policy headers are set
- ✅ HTTPS is enforced (automatic with Vercel)
- ✅ Sensitive data is encrypted in database
- ✅ File upload validation is in place
- ✅ SQL injection protection via Drizzle ORM
- ✅ XSS protection via React

---

## 1️⃣4️⃣ Scaling Considerations

### Database Scaling

- Turso automatically scales with your plan
- Consider **Read replicas** for high-traffic applications
- Monitor database size and query performance

### Edge Caching

```typescript
// Add cache headers to API responses
return new Response(JSON.stringify(data), {
  headers: {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
  },
});
```

### CDN Configuration

- Vercel provides global CDN automatically
- Static assets are cached at edge
- Consider additional CDN for user-uploaded content

---

## 1️⃣5️⃣ Troubleshooting

### Build Failures

```bash
# Check build logs in Vercel
vercel logs [deployment-url]

# Test build locally
npm run build
```

### Database Connection Issues

- Verify DATABASE_URL and DATABASE_AUTH_TOKEN
- Check Turso dashboard for database status
- Test connection with: `turso db shell ecommerce-prod`

### Webhook Issues

- Check Stripe webhook logs
- Verify webhook signature validation
- Ensure endpoint is publicly accessible

### Rate Limiting Not Working

- Verify Upstash Redis credentials
- Check Redis dashboard for connection
- Review rate limit configuration in `src/lib/rate-limit.ts`

---

## 📞 Support Resources

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Turso**: [docs.turso.tech](https://docs.turso.tech)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Stripe**: [stripe.com/docs](https://stripe.com/docs)
- **Sentry**: [docs.sentry.io](https://docs.sentry.io)

---

## ✅ Deployment Checklist

- [ ] Database created and migrated
- [ ] All environment variables set in Vercel
- [ ] Stripe webhook configured and tested
- [ ] UploadThing configured
- [ ] Sentry error monitoring active
- [ ] Rate limiting tested
- [ ] Authentication flow verified
- [ ] Payment processing tested
- [ ] File uploads working
- [ ] Performance metrics reviewed
- [ ] Security audit completed
- [ ] Backup strategy implemented
- [ ] Monitoring alerts configured

---

**🎉 Congratulations! Your application is now production-ready and deployed.**
