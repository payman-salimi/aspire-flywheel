import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  DollarSign,
  FileImage,
  Calendar,
  Mail,
  Globe,
  Users,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  platform: string;
  followers: string;
  engagementRate: string;
  status: "active" | "pending" | "inactive";
  joinedDate: string;
  campaigns: number;
}

interface MemberDetailSheetProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock campaign history data
const mockCampaignHistory = [
  {
    id: "1",
    name: "Summer Collection Launch",
    status: "completed",
    startDate: "Jan 15, 2026",
    endDate: "Feb 15, 2026",
    tasksCompleted: 4,
    totalTasks: 4,
    earnings: "$1,200",
  },
  {
    id: "2",
    name: "Product Review Campaign",
    status: "in_progress",
    startDate: "Jan 20, 2026",
    endDate: "Feb 20, 2026",
    tasksCompleted: 2,
    totalTasks: 5,
    earnings: "$400",
  },
  {
    id: "3",
    name: "Holiday Promo 2025",
    status: "completed",
    startDate: "Dec 1, 2025",
    endDate: "Dec 31, 2025",
    tasksCompleted: 3,
    totalTasks: 3,
    earnings: "$800",
  },
];

// Mock submissions data
const mockSubmissions = [
  {
    id: "1",
    title: "Summer Lookbook Video",
    type: "video",
    campaign: "Summer Collection Launch",
    submittedAt: "Jan 25, 2026",
    status: "approved",
    views: "45.2K",
    engagement: "3.8K",
  },
  {
    id: "2",
    title: "Product Unboxing",
    type: "video",
    campaign: "Product Review Campaign",
    submittedAt: "Jan 28, 2026",
    status: "pending",
    views: "—",
    engagement: "—",
  },
  {
    id: "3",
    title: "Holiday Gift Guide",
    type: "image",
    campaign: "Holiday Promo 2025",
    submittedAt: "Dec 15, 2025",
    status: "approved",
    views: "28.1K",
    engagement: "2.1K",
  },
  {
    id: "4",
    title: "Behind the Scenes",
    type: "story",
    campaign: "Summer Collection Launch",
    submittedAt: "Jan 22, 2026",
    status: "approved",
    views: "12.5K",
    engagement: "890",
  },
];

// Mock performance metrics
const mockMetrics = {
  totalImpressions: "1.2M",
  impressionsTrend: 12.5,
  totalEngagements: "89.4K",
  engagementsTrend: 8.3,
  totalEarnings: "$2,400",
  earningsTrend: 15.2,
  avgEngagementRate: "7.4%",
  engagementRateTrend: -2.1,
  contentPieces: 12,
  contentTrend: 25.0,
  completionRate: "95%",
  completionTrend: 5.0,
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "completed":
    case "approved":
      return "default";
    case "in_progress":
    case "pending":
      return "secondary";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};

const getContentTypeBadge = (type: string) => {
  switch (type) {
    case "video":
      return "bg-purple-500/10 text-purple-600 border-purple-200";
    case "image":
      return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "story":
      return "bg-pink-500/10 text-pink-600 border-pink-200";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "Instagram":
      return "bg-pink-500/10 text-pink-600 border-pink-200";
    case "TikTok":
      return "bg-purple-500/10 text-purple-600 border-purple-200";
    case "YouTube":
      return "bg-red-500/10 text-red-600 border-red-200";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function MemberDetailSheet({
  member,
  open,
  onOpenChange,
}: MemberDetailSheetProps) {
  if (!member) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="text-lg">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <SheetTitle className="text-xl">{member.name}</SheetTitle>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {member.email}
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {member.joinedDate}
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={getPlatformColor(member.platform)}
                >
                  <Globe className="mr-1 h-3 w-3" />
                  {member.platform}
                </Badge>
                <Badge variant="outline">
                  <Users className="mr-1 h-3 w-3" />
                  {member.followers} followers
                </Badge>
                <Badge variant="outline">
                  <Heart className="mr-1 h-3 w-3" />
                  {member.engagementRate} engagement
                </Badge>
              </div>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="metrics" className="mt-2">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="mt-4 space-y-4">
            <div className="grid gap-4 grid-cols-2">
              <MetricCard
                title="Total Impressions"
                value={mockMetrics.totalImpressions}
                trend={mockMetrics.impressionsTrend}
                icon={Eye}
              />
              <MetricCard
                title="Total Engagements"
                value={mockMetrics.totalEngagements}
                trend={mockMetrics.engagementsTrend}
                icon={Heart}
              />
              <MetricCard
                title="Total Earnings"
                value={mockMetrics.totalEarnings}
                trend={mockMetrics.earningsTrend}
                icon={DollarSign}
              />
              <MetricCard
                title="Avg. Engagement Rate"
                value={mockMetrics.avgEngagementRate}
                trend={mockMetrics.engagementRateTrend}
                icon={TrendingUp}
              />
              <MetricCard
                title="Content Pieces"
                value={mockMetrics.contentPieces.toString()}
                trend={mockMetrics.contentTrend}
                icon={FileImage}
              />
              <MetricCard
                title="Task Completion"
                value={mockMetrics.completionRate}
                trend={mockMetrics.completionTrend}
                icon={Calendar}
              />
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="mt-4">
            <div className="space-y-3">
              {mockCampaignHistory.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {campaign.name}
                      </CardTitle>
                      <Badge variant={getStatusBadgeVariant(campaign.status)}>
                        {campaign.status === "in_progress"
                          ? "In Progress"
                          : campaign.status.charAt(0).toUpperCase() +
                            campaign.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm text-muted-foreground mb-3">
                      {campaign.startDate} - {campaign.endDate}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">
                        Tasks: {campaign.tasksCompleted}/{campaign.totalTasks}
                      </span>
                      <span className="text-sm font-medium text-primary">
                        {campaign.earnings}
                      </span>
                    </div>
                    <Progress
                      value={
                        (campaign.tasksCompleted / campaign.totalTasks) * 100
                      }
                      className="h-2"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{submission.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {submission.campaign}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getContentTypeBadge(submission.type)}
                        >
                          {submission.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(submission.status)}
                        >
                          {submission.status.charAt(0).toUpperCase() +
                            submission.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {submission.views}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

function MetricCard({
  title,
  value,
  trend,
  icon: Icon,
}: {
  title: string;
  value: string;
  trend: number;
  icon: React.ElementType;
}) {
  const isPositive = trend >= 0;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <div
            className={`flex items-center text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3 mr-0.5" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-0.5" />
            )}
            {Math.abs(trend)}%
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">{title}</div>
        </div>
      </CardContent>
    </Card>
  );
}
