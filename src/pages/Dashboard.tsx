import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TodoList } from "@/components/dashboard/TodoList";
import { TopCreators } from "@/components/dashboard/TopCreators";
import { DiscoverCreators } from "@/components/dashboard/DiscoverCreators";
import { RecentContent } from "@/components/dashboard/RecentContent";
import { AspireAgent } from "@/components/dashboard/AspireAgent";
import { Button } from "@/components/ui/button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <AppLayout
      title="Home"
      description="Overview of your creator marketing performance"
      actions={
        <Button asChild>
          <Link to="/campaigns/new">
            <AddIcon sx={{ fontSize: 16 }} className="mr-2" />
            New Campaign
          </Link>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <MetricCard
            title="Active Members"
            value="128"
            change="+12%"
            changeType="positive"
            description="from last month"
          />
          <MetricCard
            title="Total Contents"
            value="1,245"
            change="+86"
            changeType="positive"
            description="this month"
          />
          <MetricCard
            title="Impressions"
            value="2.4M"
            change="+24%"
            changeType="positive"
            description="from last month"
          />
          <MetricCard
            title="Engagements"
            value="186K"
            change="-5%"
            changeType="negative"
            description="from last month"
          />
          <MetricCard
            title="TMV"
            value="$245K"
            change="+32%"
            changeType="positive"
            description="total media value"
          />
          <MetricCard
            title="Total Sales"
            value="$48,250"
            change="+15%"
            changeType="positive"
            description="from last month"
          />
        </div>

        {/* Activity and Aspire's Agent */}
        <div className="grid gap-6 lg:grid-cols-[65fr_35fr]">
          <TodoList />
          <AspireAgent />
        </div>

        {/* Discover Creators and Top Performers */}
        <div className="grid gap-6 lg:grid-cols-[65fr_35fr]">
          <DiscoverCreators />
          <TopCreators />
        </div>

        {/* Recent Content */}
        <RecentContent />
      </div>
    </AppLayout>
  );
}
