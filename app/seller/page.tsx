import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SellerOverview } from "@/components/seller/seller-overview"
import { RecentSales } from "@/components/seller/recent-sales"
import { SalesChart } from "@/components/seller/sales-chart"
import { ProductPerformance } from "@/components/seller/product-performance"
import { SellerReports } from "@/components/seller/seller-reports"
import { SellerNotifications } from "@/components/seller/seller-notifications"
import { SellerAnalytics } from "@/components/seller/seller-analytics"

export default function SellerDashboard() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <SellerOverview />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <SalesChart />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProductPerformance />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <SellerAnalytics />
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <SellerReports />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <SellerNotifications />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
