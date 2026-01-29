import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Filter, MoreVertical, CheckCircle, Edit3, Users, Upload } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "brief_signed" | "brief_edit" | "application" | "content_submitted";
  title: string;
  description: string;
  timestamp: string;
  isRecent: boolean;
  actions?: { label: string; variant?: "default" | "outline" }[];
  images?: string[];
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "brief_signed",
    title: "Brief signed",
    description: "3 creators signed brief to Ambassador Campaign",
    timestamp: "Now",
    isRecent: true,
    actions: [{ label: "View Signed Briefs", variant: "outline" }],
  },
  {
    id: "2",
    type: "brief_signed",
    title: "Brief signed",
    description: "4 creators signed brief to Summer 2026 Campaign",
    timestamp: "Now",
    isRecent: true,
    actions: [{ label: "View Signed Briefs", variant: "outline" }],
  },
  {
    id: "3",
    type: "brief_edit",
    title: "Brief edit requested",
    description: "Kim Vuong requested edits to brief",
    timestamp: "1 minute ago",
    isRecent: true,
    actions: [
      { label: "Review", variant: "default" },
      { label: "Edit", variant: "outline" },
    ],
  },
  {
    id: "4",
    type: "brief_signed",
    title: "Brief signed",
    description: "12 creators signed brief to Ambassador Campaign",
    timestamp: "1 hr ago",
    isRecent: false,
    actions: [{ label: "View Signed Briefs", variant: "outline" }],
  },
  {
    id: "5",
    type: "application",
    title: "New application received",
    description: "48 creators applied to campaign 2026 ambassadors",
    timestamp: "3 hours ago",
    isRecent: false,
    actions: [{ label: "View All Applicant", variant: "outline" }],
  },
  {
    id: "6",
    type: "content_submitted",
    title: "Content submitted",
    description: "Samantha Rivers submitted 2 content",
    timestamp: "3 hours ago",
    isRecent: false,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop",
    ],
    actions: [
      { label: "Approve", variant: "default" },
      { label: "Reject", variant: "outline" },
    ],
  },
];

const activityIcons = {
  brief_signed: { icon: CheckCircle, className: "bg-green-100 text-green-600" },
  brief_edit: { icon: Edit3, className: "bg-blue-100 text-blue-600" },
  application: { icon: Users, className: "bg-purple-100 text-purple-600" },
  content_submitted: { icon: Upload, className: "bg-orange-100 text-orange-600" },
};

export function TodoList() {
  const [timeFilter, setTimeFilter] = useState("this_week");
  const [isTodayOpen, setIsTodayOpen] = useState(true);

  const todayActivities = activities;
  const todayCount = todayActivities.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Activity Feed</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                <DropdownMenuItem>View settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[1200px] pr-4">
          <Collapsible open={isTodayOpen} onOpenChange={setIsTodayOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded-md px-2 transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Today</span>
                <Badge variant="secondary" className="text-xs">
                  {todayCount}
                </Badge>
              </div>
              {isTodayOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="space-y-4">
                {todayActivities.map((activity) => (
                  <ActivityItemCard key={activity.id} activity={activity} />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function ActivityItemCard({ activity }: { activity: ActivityItem }) {
  const iconConfig = activityIcons[activity.type];
  const Icon = iconConfig.icon;

  return (
    <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${iconConfig.className}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium">{activity.title}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
            {activity.isRecent && (
              <div className="h-2 w-2 rounded-full bg-green-500" />
            )}
          </div>
        </div>
        {activity.images && activity.images.length > 0 && (
          <div className="flex gap-2">
            {activity.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Content ${index + 1}`}
                className="h-16 w-16 rounded-md object-cover"
              />
            ))}
          </div>
        )}
        {activity.actions && activity.actions.length > 0 && (
          <div className="flex items-center gap-2">
            {activity.actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "outline"}
                size="sm"
                className="h-7 text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
