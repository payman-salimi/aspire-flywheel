import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCampaigns } from "@/contexts/CampaignsContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { EditCampaignDialog } from "@/components/campaigns/EditCampaignDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Image,
  Video,
  TrendingUp,
  Eye,
  Heart,
  DollarSign,
  MousePointerClick,
  Target,
  BarChart3,
  Users,
  Search,
  MoreHorizontal,
  MessageSquare,
  Mail,
  UserMinus,
  Bell,
  Edit,
  Archive,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CampaignMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  platform: string;
  tasksCompleted: number;
  totalTasks: number;
  submissions: number;
  status: "not_started" | "on_track" | "behind" | "completed";
  lastActive: string;
}

interface Task {
  id: string;
  title: string;
  status: "completed" | "in_progress" | "pending";
  assignee: string;
  assigneeAvatar?: string;
  dueDate: string;
  type: "content" | "review" | "approval";
}

interface AdsPerformance {
  impressions: string;
  clicks: string;
  ctr: string;
  spend: string;
  conversions: number;
  cpc: string;
}

interface Submission {
  id: string;
  memberName: string;
  memberAvatar?: string;
  type: "image" | "video" | "document";
  title: string;
  submittedAt: string;
  status: "approved" | "pending" | "revision";
  adsPerformance?: AdsPerformance;
}

// Mock campaign data
const mockCampaigns = [
  {
    id: "1",
    name: "Summer Collection Launch",
    status: "active" as const,
    startDate: "Jan 15, 2026",
    endDate: "Feb 15, 2026",
    memberCount: 5,
    tasksCompleted: 12,
    totalTasks: 20,
    template: "Creator Content for Ads",
    brief: "Create engaging content showcasing our new summer collection. Focus on lifestyle imagery and authentic reviews.",
  },
  {
    id: "2",
    name: "Product Review Campaign",
    status: "active" as const,
    startDate: "Jan 20, 2026",
    endDate: "Feb 20, 2026",
    memberCount: 3,
    tasksCompleted: 5,
    totalTasks: 12,
    template: "Product Launch",
    brief: "Honest product reviews highlighting key features and benefits.",
  },
  {
    id: "3",
    name: "Holiday Promo 2025",
    status: "completed" as const,
    startDate: "Dec 1, 2025",
    endDate: "Dec 31, 2025",
    memberCount: 4,
    tasksCompleted: 16,
    totalTasks: 16,
    template: "Promotion",
    brief: "Holiday promotional content with festive themes.",
  },
];

const mockCampaignMembers: CampaignMember[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", platform: "Instagram", tasksCompleted: 0, totalTasks: 5, submissions: 0, status: "not_started", lastActive: "2 hours ago" },
  { id: "2", name: "Mike Chen", email: "mike@example.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", platform: "TikTok", tasksCompleted: 0, totalTasks: 4, submissions: 0, status: "not_started", lastActive: "1 hour ago" },
  { id: "3", name: "Emily Davis", email: "emily@example.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", platform: "YouTube", tasksCompleted: 0, totalTasks: 4, submissions: 0, status: "not_started", lastActive: "30 min ago" },
  { id: "5", name: "Jessica Kim", email: "jessica@example.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", platform: "TikTok", tasksCompleted: 0, totalTasks: 4, submissions: 0, status: "not_started", lastActive: "2 days ago" },
  { id: "8", name: "Tom Baker", email: "tom@example.com", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", platform: "TikTok", tasksCompleted: 0, totalTasks: 3, submissions: 0, status: "not_started", lastActive: "5 hours ago" },
];

const mockTasks: Task[] = [
  { id: "1", title: "Submit product photos", status: "completed", assignee: "Sarah Johnson", assigneeAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", dueDate: "Jan 20, 2026", type: "content" },
  { id: "2", title: "Create Instagram Reel", status: "completed", assignee: "Mike Chen", assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", dueDate: "Jan 22, 2026", type: "content" },
  { id: "3", title: "Review content brief", status: "in_progress", assignee: "Emily Davis", assigneeAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", dueDate: "Jan 25, 2026", type: "review" },
  { id: "4", title: "Submit TikTok video", status: "pending", assignee: "Jessica Kim", assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", dueDate: "Jan 28, 2026", type: "content" },
  { id: "5", title: "Final approval", status: "pending", assignee: "Tom Baker", assigneeAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", dueDate: "Feb 1, 2026", type: "approval" },
];

const mockSubmissions: Submission[] = [
  { 
    id: "1", 
    memberName: "Sarah Johnson", 
    memberAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", 
    type: "image", 
    title: "Product Photoshoot Set 1", 
    submittedAt: "Jan 18, 2026", 
    status: "approved",
    adsPerformance: { impressions: "45.2K", clicks: "1,234", ctr: "2.73%", spend: "$450", conversions: 89, cpc: "$0.36" }
  },
  { 
    id: "2", 
    memberName: "Mike Chen", 
    memberAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", 
    type: "video", 
    title: "Unboxing Reel", 
    submittedAt: "Jan 19, 2026", 
    status: "approved",
    adsPerformance: { impressions: "62.8K", clicks: "2,156", ctr: "3.43%", spend: "$720", conversions: 142, cpc: "$0.33" }
  },
  { 
    id: "3", 
    memberName: "Emily Davis", 
    memberAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", 
    type: "video", 
    title: "Tutorial Video Draft", 
    submittedAt: "Jan 21, 2026", 
    status: "pending"
  },
  { 
    id: "4", 
    memberName: "Jessica Kim", 
    memberAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", 
    type: "image", 
    title: "Story Graphics", 
    submittedAt: "Jan 22, 2026", 
    status: "revision"
  },
];

const getCampaignStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default";
    case "draft":
      return "secondary";
    case "completed":
      return "outline";
    case "archived":
      return "outline";
    default:
      return "default";
  }
};

const getMemberStatusBadge = (status: CampaignMember["status"]) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>;
    case "on_track":
      return <Badge variant="secondary">On Track</Badge>;
    case "behind":
      return <Badge variant="destructive">Behind</Badge>;
    case "not_started":
      return <Badge variant="outline">Not Started</Badge>;
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

const getTaskStatusIcon = (status: Task["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case "in_progress":
      return <Clock className="h-4 w-4 text-amber-500" />;
    case "pending":
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

const getSubmissionIcon = (type: Submission["type"]) => {
  switch (type) {
    case "image":
      return <Image className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    case "document":
      return <FileText className="h-4 w-4" />;
  }
};

const getSubmissionStatusBadge = (status: Submission["status"]) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-600 hover:bg-green-700">Approved</Badge>;
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "revision":
      return <Badge variant="outline" className="border-amber-500 text-amber-600">Revision</Badge>;
  }
};

export default function CampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getCampaignById, updateCampaign, archiveCampaign, unarchiveCampaign } = useCampaigns();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Find campaign by ID - first check context, then fallback to local mock data
  const campaign = getCampaignById(id || "") || mockCampaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <AppLayout title="Campaign Not Found">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">The campaign you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/collaborations")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Member Hub
          </Button>
        </div>
      </AppLayout>
    );
  }

  const filteredMembers = mockCampaignMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(filteredMembers.map((m) => m.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleSelectMember = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    }
  };

  const isAllSelected =
    filteredMembers.length > 0 &&
    filteredMembers.every((m) => selectedMembers.includes(m.id));

  const handleSendMessage = (member: CampaignMember) => {
    toast({
      title: "Message sent",
      description: `Opening conversation with ${member.name}`,
    });
  };

  const handleSendReminder = (member: CampaignMember) => {
    toast({
      title: "Reminder sent",
      description: `Task reminder sent to ${member.name}`,
    });
  };

  const handleRemoveFromCampaign = (member: CampaignMember) => {
    toast({
      title: "Member removed",
      description: `${member.name} has been removed from the campaign`,
      variant: "destructive",
    });
  };

  const handleBulkAction = (action: string) => {
    const count = selectedMembers.length;
    switch (action) {
      case "message":
        toast({ title: "Messages sent", description: `Sent message to ${count} members` });
        break;
      case "reminder":
        toast({ title: "Reminders sent", description: `Sent reminder to ${count} members` });
        break;
      case "remove":
        toast({ title: "Members removed", description: `Removed ${count} members from campaign`, variant: "destructive" });
        break;
    }
    setSelectedMembers([]);
  };

  const handleArchiveCampaign = () => {
    if (!campaign) return;

    // Check if all members have "not_started" or "completed" status
    const canArchive = mockCampaignMembers.every(
      (member) => member.status === "not_started" || member.status === "completed"
    );

    if (!canArchive) {
      toast({
        title: "Cannot archive campaign",
        description: "All members must have 'Not Started' or 'Completed' status to archive this campaign.",
        variant: "destructive",
      });
      return;
    }

    archiveCampaign(campaign.id);
    toast({
      title: "Campaign archived",
      description: `${campaign.name} has been archived successfully.`,
    });
  };

  const handleUnarchiveCampaign = () => {
    if (!campaign) return;

    unarchiveCampaign(campaign.id);
    toast({
      title: "Campaign reactivated",
      description: `${campaign.name} has been unarchived and set to active.`,
    });
  };

  const handleUpdateCampaign = (updates: Partial<typeof campaign>) => {
    if (!campaign) return;
    updateCampaign(campaign.id, updates);
    toast({
      title: "Campaign updated",
      description: "Campaign details have been updated successfully.",
    });
  };

  const completedTasks = mockTasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = mockTasks.filter((t) => t.status === "in_progress").length;
  const pendingTasks = mockTasks.filter((t) => t.status === "pending").length;

  const metrics = {
    impressions: "125.4K",
    engagements: "8.2K",
    engagementRate: "6.5%",
    estimatedValue: "$12,500",
  };

  return (
    <AppLayout
      title={campaign.name}
      description={campaign.template}
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          {campaign.status === "archived" ? (
            <Button
              variant="outline"
              onClick={handleUnarchiveCampaign}
            >
              <Archive className="mr-2 h-4 w-4" />
              Unarchive
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleArchiveCampaign}
            >
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate("/collaborations")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Member Hub
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Campaign Header Info */}
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant={getCampaignStatusBadgeVariant(campaign.status) as "default" | "secondary" | "outline"}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{campaign.startDate} - {campaign.endDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{campaign.memberCount} Members</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            <span>{campaign.tasksCompleted}/{campaign.totalTasks} Tasks</span>
          </div>
        </div>

        {/* Campaign Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Campaign Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {campaign.brief && (
              <p className="text-sm text-muted-foreground">{campaign.brief}</p>
            )}
            {(campaign.budget || campaign.goal || campaign.product || campaign.affiliateOffer) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t">
                {campaign.budget && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Budget</p>
                    <p className="text-sm">{campaign.budget}</p>
                  </div>
                )}
                {campaign.goal && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Goal</p>
                    <p className="text-sm">{campaign.goal}</p>
                  </div>
                )}
                {campaign.product && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Product</p>
                    <p className="text-sm">{campaign.product}</p>
                  </div>
                )}
                {campaign.affiliateOffer && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Affiliate Offer</p>
                    <p className="text-sm">{campaign.affiliateOffer}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="members">
          <TabsList variant="line">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="mt-6 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="not_started">Not Started</SelectItem>
                    <SelectItem value="on_track">On Track</SelectItem>
                    <SelectItem value="behind">Behind</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedMembers.length > 0 && (
              <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
                <span className="text-sm text-muted-foreground">
                  {selectedMembers.length} member{selectedMembers.length > 1 ? "s" : ""} selected
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction("message")}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction("reminder")}>
                    <Bell className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSelectedMembers([])}>
                    Clear
                  </Button>
                </div>
              </div>
            )}

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all members"
                      />
                    </TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={(checked) => handleSelectMember(member.id, checked as boolean)}
                          aria-label={`Select ${member.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPlatformColor(member.platform)}>
                          {member.platform}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(member.tasksCompleted / member.totalTasks) * 100}
                            className="h-2 w-16"
                          />
                          <span className="text-sm text-muted-foreground">
                            {member.tasksCompleted}/{member.totalTasks}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{member.submissions}</TableCell>
                      <TableCell>{getMemberStatusBadge(member.status)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{member.lastActive}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast({
                              title: "Brief sent",
                              description: `Campaign brief sent to ${member.name}`,
                            });
                          }}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Send Brief
                        </Button>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleSendMessage(member)}>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendReminder(member)}>
                              <Bell className="mr-2 h-4 w-4" />
                              Send Reminder
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.location.href = `mailto:${member.email}`}>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleRemoveFromCampaign(member)}
                              className="text-destructive focus:text-destructive"
                            >
                              <UserMinus className="mr-2 h-4 w-4" />
                              Remove from Campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredMembers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                        No members found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="mt-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="pt-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 text-center">
                  <div className="text-2xl font-bold text-amber-500">{inProgressTasks}</div>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 text-center">
                  <div className="text-2xl font-bold text-muted-foreground">{pendingTasks}</div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Status</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{getTaskStatusIcon(task.status)}</TableCell>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assigneeAvatar} />
                            <AvatarFallback className="text-xs">
                              {task.assignee.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{task.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{task.type}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{task.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="mt-6 space-y-3">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        Impressions
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <MousePointerClick className="h-3.5 w-3.5" />
                        Clicks
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <BarChart3 className="h-3.5 w-3.5" />
                        CTR
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        Spend
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Target className="h-3.5 w-3.5" />
                        Conv.
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                          {getSubmissionIcon(submission.type)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{submission.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={submission.memberAvatar} />
                            <AvatarFallback className="text-xs">
                              {submission.memberName.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{submission.memberName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{submission.submittedAt}</TableCell>
                      <TableCell>{getSubmissionStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-right font-medium">
                        {submission.adsPerformance?.impressions || "—"}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {submission.adsPerformance?.clicks || "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {submission.adsPerformance ? (
                          <Badge variant="secondary" className="font-medium">
                            {submission.adsPerformance.ctr}
                          </Badge>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {submission.adsPerformance?.spend || "—"}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {submission.adsPerformance?.conversions ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Impressions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.impressions}</div>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +12.5% vs last campaign
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Engagements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.engagements}</div>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +8.3% vs last campaign
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Engagement Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.engagementRate}</div>
                  <p className="text-xs text-muted-foreground mt-1">Industry avg: 3.5%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Est. Media Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.estimatedValue}</div>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    2.5x ROI
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Campaign Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Task Completion</span>
                    <span className="font-medium">
                      {Math.round((campaign.tasksCompleted / campaign.totalTasks) * 100)}%
                    </span>
                  </div>
                  <Progress value={(campaign.tasksCompleted / campaign.totalTasks) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Content Submissions</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Approvals</span>
                    <span className="font-medium">50%</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Campaign Dialog */}
      {campaign && (
        <EditCampaignDialog
          campaign={campaign}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleUpdateCampaign}
        />
      )}
    </AppLayout>
  );
}
