import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  ChevronDown,
  Bookmark,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { useCampaigns, Campaign } from "@/contexts/CampaignsContext";

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

export default function Campaigns() {
  const navigate = useNavigate();
  const { campaigns } = useCampaigns();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter states
  const [savedView, setSavedView] = useState("all");

  const handleCampaignClick = (campaign: Campaign) => {
    navigate(`/collaborations/${campaign.id}`);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout
      title="Campaigns"
      description="Manage and track all your creator campaigns"
      actions={
        <Button asChild>
          <Link to="/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
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
                  All Campaigns
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSavedView("active")}>
                  Active Campaigns
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSavedView("completed")}>
                  Completed Campaigns
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSavedView("draft")}>
                  Draft Campaigns
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                  <ChevronDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("draft")}>
                  Draft
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                  Completed
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

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
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
                    {campaign.members.slice(0, 5).map((member) => (
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

        {filteredCampaigns.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">
              No campaigns found. Create your first campaign to get started.
            </p>
            <Button asChild>
              <Link to="/campaigns/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Link>
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
