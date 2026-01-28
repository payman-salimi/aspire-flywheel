import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Search,
  Users,
  Handshake,
  MoreHorizontal,
  MessageSquare,
  Star,
  ExternalLink,
  UserPlus,
  Mail,
  Calendar,
  CheckCircle2,
  Plus,
  ChevronDown,
  Bookmark,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MemberDetailSheet } from "@/components/members/MemberDetailSheet";
import { MetricsWidget } from "@/components/collaborations/MetricsWidget";
import { Link, useNavigate } from "react-router-dom";
import { useCampaigns, Campaign } from "@/contexts/CampaignsContext";

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

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    platform: "Instagram",
    followers: "125K",
    engagementRate: "4.2%",
    status: "active",
    joinedDate: "Jan 5, 2026",
    campaigns: 3,
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    platform: "TikTok",
    followers: "89K",
    engagementRate: "6.8%",
    status: "active",
    joinedDate: "Jan 10, 2026",
    campaigns: 2,
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    platform: "YouTube",
    followers: "250K",
    engagementRate: "3.5%",
    status: "active",
    joinedDate: "Dec 15, 2025",
    campaigns: 5,
  },
  {
    id: "4",
    name: "Alex Rivera",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    platform: "Instagram",
    followers: "45K",
    engagementRate: "5.1%",
    status: "pending",
    joinedDate: "Jan 20, 2026",
    campaigns: 0,
  },
  {
    id: "5",
    name: "Jessica Kim",
    email: "jessica@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    platform: "TikTok",
    followers: "320K",
    engagementRate: "7.2%",
    status: "active",
    joinedDate: "Nov 28, 2025",
    campaigns: 4,
  },
  {
    id: "6",
    name: "David Park",
    email: "david@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    platform: "YouTube",
    followers: "180K",
    engagementRate: "4.8%",
    status: "inactive",
    joinedDate: "Oct 10, 2025",
    campaigns: 2,
  },
  {
    id: "7",
    name: "Lisa Wong",
    email: "lisa@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    platform: "Instagram",
    followers: "95K",
    engagementRate: "5.5%",
    status: "active",
    joinedDate: "Jan 8, 2026",
    campaigns: 1,
  },
  {
    id: "8",
    name: "Tom Baker",
    email: "tom@example.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    platform: "TikTok",
    followers: "67K",
    engagementRate: "8.1%",
    status: "active",
    joinedDate: "Dec 20, 2025",
    campaigns: 3,
  },
];


const getCampaignStatusBadgeVariant = (status: Campaign["status"]) => {
  switch (status) {
    case "active":
      return "default";
    case "draft":
      return "secondary";
    case "completed":
      return "outline";
    default:
      return "default";
  }
};

const getStatusBadgeVariant = (status: Member["status"]) => {
  switch (status) {
    case "active":
      return "default";
    case "pending":
      return "secondary";
    case "inactive":
      return "outline";
    default:
      return "default";
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

export default function Collaborations() {
  const navigate = useNavigate();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const { toast } = useToast();
  const { campaigns } = useCampaigns();

  // Filter states
  const [savedView, setSavedView] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");

  const handleCampaignClick = (campaign: Campaign) => {
    navigate(`/collaborations/${campaign.id}`);
  };

  const handleRowClick = (member: Member) => {
    setSelectedMember(member);
    setDetailSheetOpen(true);
  };

  const handleQuickMessage = (member: Member) => {
    toast({
      title: "Message sent",
      description: `Opening conversation with ${member.name}`,
    });
  };

  const handleAddToShortlist = (member: Member) => {
    if (shortlist.includes(member.id)) {
      setShortlist(shortlist.filter((id) => id !== member.id));
      toast({
        title: "Removed from shortlist",
        description: `${member.name} has been removed from your shortlist`,
      });
    } else {
      setShortlist([...shortlist, member.id]);
      toast({
        title: "Added to shortlist",
        description: `${member.name} has been added to your shortlist`,
      });
    }
  };

  const handleViewSocial = (member: Member) => {
    const platformUrls: Record<string, string> = {
      Instagram: "https://instagram.com/",
      TikTok: "https://tiktok.com/@",
      YouTube: "https://youtube.com/@",
    };
    const baseUrl = platformUrls[member.platform] || "https://";
    window.open(baseUrl + member.name.toLowerCase().replace(" ", ""), "_blank");
  };

  const handleInviteToCollab = (member: Member) => {
    toast({
      title: "Invitation sent",
      description: `${member.name} has been invited to collaborate`,
    });
  };

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;
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

  return (
    <AppLayout
      title="Member Hub"
      description="Manage your recruited creators and launch campaigns"
      actions={
        selectedMembers.length > 0 ? (
          <Button asChild>
            <Link
              to="/collaborations/new"
              state={{ selectedMemberIds: selectedMembers }}
            >
              <Handshake className="mr-2 h-4 w-4" />
              Collaborate ({selectedMembers.length})
            </Link>
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Select members to collaborate</span>
          </div>
        )
      }
    >
      <div className="space-y-6">
        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Bookmark className="mr-2 h-3.5 w-3.5" />
                  Saved views
                  <ChevronDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setSavedView("all")}>
                  All Members
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSavedView("active")}>
                  Active Members
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSavedView("top-performers")}>
                  Top Performers
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSavedView("new-recruits")}>
                  New Recruits
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Projects
                  <ChevronDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setProjectFilter("all")}>
                  All Projects
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProjectFilter("summer-collection")}>
                  Summer Collection
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProjectFilter("product-review")}>
                  Product Review
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProjectFilter("holiday-promo")}>
                  Holiday Promo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Tags
                  <ChevronDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setTagFilter("all")}>
                  All Tags
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTagFilter("fashion")}>
                  Fashion
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTagFilter("beauty")}>
                  Beauty
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTagFilter("lifestyle")}>
                  Lifestyle
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTagFilter("fitness")}>
                  Fitness
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Groups
                  <ChevronDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setGroupFilter("all")}>
                  All Groups
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupFilter("tier-1")}>
                  Tier 1 - Mega
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupFilter("tier-2")}>
                  Tier 2 - Macro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupFilter("tier-3")}>
                  Tier 3 - Micro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupFilter("tier-4")}>
                  Tier 4 - Nano
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" className="h-8">
              <Plus className="mr-2 h-3.5 w-3.5" />
              Add Filter
            </Button>
          </div>

          <Button variant="outline" size="sm" className="h-8">
            Save View
          </Button>
        </div>

        {/* Metrics Widget */}
        <MetricsWidget />

        <Tabs defaultValue="members">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="members">All Members</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            </TabsList>
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="members" className="mt-6">
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
                    <TableHead>Followers</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Campaigns</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow
                      key={member.id}
                      className="cursor-pointer"
                      onClick={() => handleRowClick(member)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={(checked) =>
                            handleSelectMember(member.id, checked as boolean)
                          }
                          aria-label={`Select ${member.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getPlatformColor(member.platform)}
                        >
                          {member.platform}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {member.followers}
                      </TableCell>
                      <TableCell>{member.engagementRate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(member.status)}>
                          {member.status.charAt(0).toUpperCase() +
                            member.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.campaigns}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.joinedDate}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleQuickMessage(member)}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Quick Message
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleAddToShortlist(member)}
                            >
                              <Star
                                className={`mr-2 h-4 w-4 ${shortlist.includes(member.id) ? "fill-yellow-400 text-yellow-400" : ""}`}
                              />
                              {shortlist.includes(member.id)
                                ? "Remove from Shortlist"
                                : "Add to Shortlist"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleViewSocial(member)}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View {member.platform} Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleInviteToCollab(member)}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Invite to Collaborate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                window.location.href = `mailto:${member.email}`;
                              }}
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredMembers.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No members found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {selectedMembers.length > 0 && (
              <div className="mt-4 flex items-center justify-between rounded-lg border bg-muted/50 p-4">
                <span className="text-sm text-muted-foreground">
                  {selectedMembers.length} member
                  {selectedMembers.length > 1 ? "s" : ""} selected
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMembers([])}
                  >
                    Clear Selection
                  </Button>
                  <Button size="sm" asChild>
                    <Link
                      to="/collaborations/new"
                      state={{ selectedMemberIds: selectedMembers }}
                    >
                      <Handshake className="mr-2 h-4 w-4" />
                      Start Collaboration
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="campaigns" className="mt-6">
            <div className="flex justify-end mb-4">
              <Button asChild>
                <Link to="/campaigns/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Campaign
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <Card 
                  key={campaign.id} 
                  className="overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => handleCampaignClick(campaign)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">
                          {campaign.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          {campaign.template}
                        </p>
                      </div>
                      <Badge
                        variant={getCampaignStatusBadgeVariant(campaign.status)}
                      >
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {campaign.startDate} - {campaign.endDate}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                          Tasks
                        </span>
                        <span className="text-sm font-medium">
                          {campaign.tasksCompleted}/{campaign.totalTasks}
                        </span>
                      </div>
                      <Progress
                        value={
                          (campaign.tasksCompleted / campaign.totalTasks) * 100
                        }
                        className="h-2"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {campaign.memberCount} Members
                      </p>
                      <div className="flex -space-x-2">
                        {campaign.members.slice(0, 5).map((member, idx) => (
                          <Avatar
                            key={member.id}
                            className="h-8 w-8 border-2 border-background"
                          >
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {campaign.memberCount > 5 && (
                          <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                            +{campaign.memberCount - 5}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <MemberDetailSheet
        member={selectedMember}
        open={detailSheetOpen}
        onOpenChange={setDetailSheetOpen}
      />
    </AppLayout>
  );
}
