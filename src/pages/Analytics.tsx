import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MetricCard } from "@/components/dashboard/MetricCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import DownloadIcon from "@mui/icons-material/Download";

const revenueData = [
  { date: "Jan 1", revenue: 4200, clicks: 1200 },
  { date: "Jan 5", revenue: 5800, clicks: 1800 },
  { date: "Jan 10", revenue: 4900, clicks: 1500 },
  { date: "Jan 15", revenue: 7200, clicks: 2200 },
  { date: "Jan 20", revenue: 8100, clicks: 2600 },
  { date: "Jan 25", revenue: 9500, clicks: 3100 },
];

const topCreators = [
  { id: 1, name: "Sarah Johnson", revenue: 12450, orders: 156, cvr: 3.8 },
  { id: 2, name: "Mike Chen", revenue: 9800, orders: 124, cvr: 4.2 },
  { id: 3, name: "Emily Davis", revenue: 7650, orders: 98, cvr: 3.1 },
  { id: 4, name: "Alex Rivera", revenue: 5200, orders: 67, cvr: 2.8 },
  { id: 5, name: "Jessica Kim", revenue: 4100, orders: 52, cvr: 2.4 },
];

const campaignPerformance = [
  { name: "Summer Collection", revenue: 18500, orders: 234 },
  { name: "Product Review", revenue: 12300, orders: 156 },
  { name: "Holiday Promo", revenue: 9800, orders: 124 },
  { name: "Affiliate Q1", revenue: 7600, orders: 96 },
];

export default function Analytics() {
  return (
    <AppLayout
      title="Dashboard"
      description="Track performance and attribution"
      actions={
        <div className="flex items-center gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <DownloadIcon sx={{ fontSize: 16 }} className="mr-2" />
            Export
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Overview Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Clicks"
            value="12,456"
            change="+23%"
            changeType="positive"
            description="from last period"
          />
          <MetricCard
            title="Total Orders"
            value="487"
            change="+18%"
            changeType="positive"
            description="from last period"
          />
          <MetricCard
            title="Attributed Revenue"
            value="$48,250"
            change="+32%"
            changeType="positive"
            description="from last period"
          />
          <MetricCard
            title="Avg. Conversion Rate"
            value="3.9%"
            change="+0.6%"
            changeType="positive"
            description="from last period"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
              <CardDescription>Attributed revenue from creator collaborations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="date"
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Revenue by collaboration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      type="number"
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Creator Leaderboard */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Creator Leaderboard</CardTitle>
                <CardDescription>Top performing creators by attributed revenue</CardDescription>
              </div>
              <Tabs defaultValue="revenue">
                <TabsList>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="cvr">CVR</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCreators.map((creator, index) => (
                <div
                  key={creator.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <span className="text-lg font-semibold text-muted-foreground w-6">
                    {index + 1}
                  </span>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {creator.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{creator.name}</span>
                      <span className="font-semibold">
                        ${creator.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress
                        value={(creator.revenue / topCreators[0].revenue) * 100}
                        className="h-2 flex-1"
                      />
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{creator.orders} orders</span>
                        <span>{creator.cvr}% CVR</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
