import { AppLayout } from "@/components/layout/AppLayout";
import { TodoList } from "@/components/dashboard/TodoList";
import { DiscoverCreators } from "@/components/dashboard/DiscoverCreators";
import { RecentContent } from "@/components/dashboard/RecentContent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, ArrowUp, ArrowDown } from "lucide-react";

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
          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Creators</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">2,401</p>
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                +23% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Content</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">224</p>
                <ArrowDown className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                -7% decrease MoM
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Impressions</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">997K</p>
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                +12% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Engagement</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">50K</p>
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                +11% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">TMV</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">$997K</p>
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                +20% increase MoM
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Sales</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold">$50K</p>
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                +41% increase MoM
              </p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <TodoList />

        {/* Recent Content */}
        <RecentContent />

        {/* Discover Creators */}
        <DiscoverCreators />
      </div>
    </AppLayout>
  );
}
