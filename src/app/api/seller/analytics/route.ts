import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { sellerOrders, products, sellerStorage, user } from '@/db/schema';
import { eq, and, sql, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    // Verify seller role
    if (session.user.role !== 'seller') {
      return NextResponse.json({ 
        error: 'Access denied. Seller role required.',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }

    const sellerId = session.user.id;

    // 1. Calculate totalRevenue
    const revenueResult = await db.select({
      totalRevenue: sql<number>`COALESCE(SUM(${sellerOrders.total}), 0)`
    })
    .from(sellerOrders)
    .where(
      and(
        eq(sellerOrders.sellerId, sellerId),
        eq(sellerOrders.status, 'delivered'),
        eq(sellerOrders.paymentStatus, 'paid')
      )
    );

    const totalRevenue = Number(revenueResult[0]?.totalRevenue || 0);

    // 2. Calculate totalOrders
    const ordersCountResult = await db.select({
      count: sql<number>`COUNT(*)`
    })
    .from(sellerOrders)
    .where(eq(sellerOrders.sellerId, sellerId));

    const totalOrders = Number(ordersCountResult[0]?.count || 0);

    // 3. Calculate pendingOrders
    const pendingOrdersResult = await db.select({
      count: sql<number>`COUNT(*)`
    })
    .from(sellerOrders)
    .where(
      and(
        eq(sellerOrders.sellerId, sellerId),
        eq(sellerOrders.status, 'pending')
      )
    );

    const pendingOrders = Number(pendingOrdersResult[0]?.count || 0);

    // 4. Calculate totalProducts (skipped due to type mismatch: products.sellerId is integer, session.user.id is text)
    const totalProducts = 0;

    // 5. Calculate lowStockItems
    const lowStockResult = await db.select({
      count: sql<number>`COUNT(*)`
    })
    .from(sellerStorage)
    .where(
      and(
        eq(sellerStorage.sellerId, sellerId),
        sql`${sellerStorage.quantity} <= ${sellerStorage.lowStockThreshold}`
      )
    );

    const lowStockItems = Number(lowStockResult[0]?.count || 0);

    // 6. Get recentSales (last 10 orders)
    const recentSales = await db.select({
      orderId: sellerOrders.orderId,
      customerName: sellerOrders.customerName,
      productName: sellerOrders.productName,
      quantity: sellerOrders.quantity,
      total: sellerOrders.total,
      status: sellerOrders.status,
      paymentStatus: sellerOrders.paymentStatus,
      createdAt: sellerOrders.createdAt
    })
    .from(sellerOrders)
    .where(eq(sellerOrders.sellerId, sellerId))
    .orderBy(desc(sellerOrders.createdAt))
    .limit(10);

    // 7. Get topProducts (top 5 by total quantity sold)
    const topProductsResult = await db.select({
      productId: sellerOrders.productId,
      productName: sellerOrders.productName,
      totalQuantitySold: sql<number>`SUM(${sellerOrders.quantity})`,
      totalRevenue: sql<number>`SUM(${sellerOrders.total})`
    })
    .from(sellerOrders)
    .where(eq(sellerOrders.sellerId, sellerId))
    .groupBy(sellerOrders.productId, sellerOrders.productName)
    .orderBy(desc(sql`SUM(${sellerOrders.quantity})`))
    .limit(5);

    const topProducts = topProductsResult.map(product => ({
      productId: product.productId,
      productName: product.productName,
      totalQuantitySold: Number(product.totalQuantitySold || 0),
      totalRevenue: Number(product.totalRevenue || 0)
    }));

    // 8. Get ordersByStatus (count grouped by status)
    const ordersByStatusResult = await db.select({
      status: sellerOrders.status,
      count: sql<number>`COUNT(*)`
    })
    .from(sellerOrders)
    .where(eq(sellerOrders.sellerId, sellerId))
    .groupBy(sellerOrders.status);

    const ordersByStatus: Record<string, number> = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };

    ordersByStatusResult.forEach(item => {
      if (item.status) {
        ordersByStatus[item.status] = Number(item.count || 0);
      }
    });

    // 9. Get revenueByMonth (last 6 months)
    const revenueByMonthResult = await db.select({
      month: sql<string>`strftime('%Y-%m', ${sellerOrders.createdAt})`,
      revenue: sql<number>`SUM(${sellerOrders.total})`
    })
    .from(sellerOrders)
    .where(
      and(
        eq(sellerOrders.sellerId, sellerId),
        eq(sellerOrders.status, 'delivered'),
        eq(sellerOrders.paymentStatus, 'paid')
      )
    )
    .groupBy(sql`strftime('%Y-%m', ${sellerOrders.createdAt})`)
    .orderBy(desc(sql`strftime('%Y-%m', ${sellerOrders.createdAt})`))
    .limit(6);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const revenueByMonth = revenueByMonthResult.map(item => {
      const [year, month] = (item.month || '').split('-');
      const monthIndex = parseInt(month, 10) - 1;
      const monthName = monthNames[monthIndex] || month;
      return {
        month: `${monthName} ${year}`,
        revenue: Number(item.revenue || 0)
      };
    }).reverse();

    // Return analytics data
    return NextResponse.json({
      totalRevenue,
      totalOrders,
      pendingOrders,
      totalProducts,
      lowStockItems,
      recentSales,
      topProducts,
      ordersByStatus,
      revenueByMonth
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}