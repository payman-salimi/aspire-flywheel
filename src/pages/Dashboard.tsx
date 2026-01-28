import { AppLayout } from "@/components/layout/AppLayout";
import { TodoList } from "@/components/dashboard/TodoList";
import { TopCreators } from "@/components/dashboard/TopCreators";
import { DiscoverCreators } from "@/components/dashboard/DiscoverCreators";
import { RecentContent } from "@/components/dashboard/RecentContent";
import { AspireAgent } from "@/components/dashboard/AspireAgent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu } from "lucide-react";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-normal">Welcome, Payman</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-black text-white hover:bg-black/90">
                Quick Actions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>New Campaign</DropdownMenuItem>
              <DropdownMenuItem>Add Creator</DropdownMenuItem>
              <DropdownMenuItem>Create Content Brief</DropdownMenuItem>
              <DropdownMenuItem>Schedule Post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Time Filter */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-8">
            Last 30 days
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <Menu className="mr-2 h-4 w-4" />
            View More
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Members</p>
              <p className="text-4xl font-normal">1</p>
              <p className="text-xs text-muted-foreground">
                0.0% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Posts</p>
              <p className="text-4xl font-normal">1</p>
              <p className="text-xs text-muted-foreground">
                0.0% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Impressions</p>
              <p className="text-4xl font-normal">1.9K</p>
              <p className="text-xs text-muted-foreground">
                0.0% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Engagements</p>
              <p className="text-4xl font-normal">38</p>
              <p className="text-xs text-muted-foreground">
                0.0% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total TMV</p>
              <p className="text-4xl font-normal">$105.6</p>
              <p className="text-xs text-muted-foreground">
                0.0% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Sales</p>
              <p className="text-4xl font-normal">$0</p>
              <p className="text-xs text-muted-foreground">0%</p>
            </div>
          </div>
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
