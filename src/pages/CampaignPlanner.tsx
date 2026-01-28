import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Users,
  DollarSign,
  Calendar,
  Target,
  TrendingUp,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  PieChart,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id: string;
  name: string;
  avatar?: string;
  platform: string;
  followers: string;
  engagementRate: string;
}

const mockMembers: Member[] = [
  { id: "1", name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", platform: "Instagram", followers: "125K", engagementRate: "4.2%" },
  { id: "2", name: "Mike Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", platform: "TikTok", followers: "89K", engagementRate: "6.8%" },
  { id: "3", name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", platform: "YouTube", followers: "250K", engagementRate: "3.5%" },
  { id: "4", name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", platform: "Instagram", followers: "45K", engagementRate: "5.1%" },
  { id: "5", name: "Jessica Kim", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", platform: "TikTok", followers: "320K", engagementRate: "7.2%" },
  { id: "6", name: "David Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", platform: "YouTube", followers: "180K", engagementRate: "4.8%" },
  { id: "7", name: "Lisa Wong", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", platform: "Instagram", followers: "95K", engagementRate: "5.5%" },
  { id: "8", name: "Tom Baker", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", platform: "TikTok", followers: "67K", engagementRate: "8.1%" },
];

interface CampaignPlan {
  campaignName: string;
  summary: string;
  recommendedMembers: {
    memberId?: string;
    memberName: string;
    role: string;
    rationale: string;
  }[];
  budgetSplit: {
    creatorFees: number;
    contentProduction: number;
    amplification: number;
    contingency: number;
  };
  timeline: {
    phase: string;
    duration: string;
    activities: string[];
  }[];
  contentAngles: {
    angle: string;
    description: string;
    platforms: string[];
  }[];
  kpis: {
    metric: string;
    target: string;
    rationale?: string;
  }[];
  estimatedReach?: string;
  estimatedEngagement?: string;
}

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "Instagram": return "bg-pink-500/10 text-pink-600 border-pink-200";
    case "TikTok": return "bg-purple-500/10 text-purple-600 border-purple-200";
    case "YouTube": return "bg-red-500/10 text-red-600 border-red-200";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function CampaignPlanner() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [campaignGoal, setCampaignGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<CampaignPlan | null>(null);

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === mockMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(mockMembers.map((m) => m.id));
    }
  };

  const handleGeneratePlan = async () => {
    if (selectedMembers.length === 0) {
      toast({
        title: "No members selected",
        description: "Please select at least one member to generate a plan.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setPlan(null);

    try {
      const membersData = mockMembers
        .filter((m) => selectedMembers.includes(m.id))
        .map((m) => ({
          id: m.id,
          name: m.name,
          platform: m.platform,
          followers: m.followers,
          engagementRate: m.engagementRate,
        }));

      const { data, error } = await supabase.functions.invoke("campaign-planner", {
        body: {
          members: membersData,
          campaignGoal: campaignGoal || undefined,
          budget: budget ? parseInt(budget) : undefined,
          duration: duration || undefined,
        },
      });

      if (error) throw error;

      if (data.plan) {
        setPlan(data.plan);
        toast({
          title: "Plan generated!",
          description: "Your AI campaign plan is ready.",
        });
      } else if (data.rawContent) {
        toast({
          title: "Plan generated",
          description: "Check the results below.",
        });
      }
    } catch (error) {
      console.error("Error generating plan:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate campaign plan",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateDraft = () => {
    if (!plan) return;

    // Navigate to new collaboration with prefilled data
    navigate("/collaborations/new", {
      state: {
        prefilled: true,
        campaignName: plan.campaignName,
        selectedMemberIds: selectedMembers,
        fromPlanner: true,
      },
    });

    toast({
      title: "Draft campaign created",
      description: "Your campaign has been created with the recommended settings.",
    });
  };

  return (
    <AppLayout
      title="Campaign Planner Agent"
      description="AI-powered campaign recommendations based on your member roster"
    >
      <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
        {/* Left Panel - Inputs */}
        <div className="space-y-6">
          {/* Member Selection */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Select Members
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                  {selectedMembers.length === mockMembers.length ? "Deselect All" : "Select All"}
                </Button>
              </div>
              <CardDescription>Choose members to include in the campaign plan</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[300px] overflow-y-auto space-y-2">
              {mockMembers.map((member) => (
                <div
                  key={member.id}
                  className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors ${
                    selectedMembers.includes(member.id)
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:bg-muted/50"
                  }`}
                  onClick={() => handleMemberToggle(member.id)}
                >
                  <Checkbox
                    checked={selectedMembers.includes(member.id)}
                    onCheckedChange={() => handleMemberToggle(member.id)}
                  />
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.followers} • {member.engagementRate}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs ${getPlatformColor(member.platform)}`}>
                    {member.platform}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Campaign Parameters */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4" />
                Campaign Parameters
              </CardTitle>
              <CardDescription>Optional details to refine recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal">Campaign Goal</Label>
                <Textarea
                  id="goal"
                  placeholder="e.g., Launch new product line, increase brand awareness..."
                  value={campaignGoal}
                  onChange={(e) => setCampaignGoal(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="budget"
                    type="number"
                    placeholder="10000"
                    className="pl-9"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="2-months">2 Months</SelectItem>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleGeneratePlan}
            disabled={isGenerating || selectedMembers.length === 0}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Campaign Plan
              </>
            )}
          </Button>
        </div>

        {/* Right Panel - Results */}
        <div className="space-y-6">
          {!plan && !isGenerating && (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center space-y-4 px-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">AI Campaign Planner</h3>
                <p className="text-muted-foreground max-w-sm">
                  Select members and optionally add campaign parameters, then generate an AI-powered campaign plan with recommendations for member mix, budget allocation, timeline, and content angles.
                </p>
              </div>
            </Card>
          )}

          {isGenerating && (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <h3 className="text-lg font-semibold">Generating Campaign Plan</h3>
                <p className="text-muted-foreground">Analyzing your members and creating recommendations...</p>
              </div>
            </Card>
          )}

          {plan && (
            <div className="space-y-6">
              {/* Header with 1-click action */}
              <Card className="border-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        {plan.campaignName}
                      </CardTitle>
                      <CardDescription className="mt-1">{plan.summary}</CardDescription>
                    </div>
                    <Button onClick={handleCreateDraft} className="shrink-0">
                      Create Draft Campaign
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                {(plan.estimatedReach || plan.estimatedEngagement) && (
                  <CardContent className="pt-0">
                    <div className="flex gap-4">
                      {plan.estimatedReach && (
                        <Badge variant="secondary" className="text-sm">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Est. Reach: {plan.estimatedReach}
                        </Badge>
                      )}
                      {plan.estimatedEngagement && (
                        <Badge variant="secondary" className="text-sm">
                          Est. Engagement: {plan.estimatedEngagement}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Recommended Members */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Recommended Member Mix
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.recommendedMembers.map((member, idx) => {
                    const memberData = mockMembers.find(m => m.name === member.memberName);
                    return (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        {memberData && (
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={memberData.avatar} />
                            <AvatarFallback>{member.memberName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{member.memberName}</span>
                            <Badge variant="outline" className="text-xs">{member.role}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{member.rationale}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Budget Split */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Budget Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Creator Fees</span>
                      <span className="font-medium">{plan.budgetSplit.creatorFees}%</span>
                    </div>
                    <Progress value={plan.budgetSplit.creatorFees} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Content Production</span>
                      <span className="font-medium">{plan.budgetSplit.contentProduction}%</span>
                    </div>
                    <Progress value={plan.budgetSplit.contentProduction} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Paid Amplification</span>
                      <span className="font-medium">{plan.budgetSplit.amplification}%</span>
                    </div>
                    <Progress value={plan.budgetSplit.amplification} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Contingency</span>
                      <span className="font-medium">{plan.budgetSplit.contingency}%</span>
                    </div>
                    <Progress value={plan.budgetSplit.contingency} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plan.timeline.map((phase, idx) => (
                      <div key={idx} className="relative pl-6 pb-4 last:pb-0">
                        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary" />
                        {idx < plan.timeline.length - 1 && (
                          <div className="absolute left-[5px] top-4 w-0.5 h-full bg-border" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{phase.phase}</span>
                            <Badge variant="outline" className="text-xs">{phase.duration}</Badge>
                          </div>
                          <ul className="mt-2 space-y-1">
                            {phase.activities.map((activity, aIdx) => (
                              <li key={aIdx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Content Angles */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Content Angles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.contentAngles.map((angle, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{angle.angle}</span>
                        <div className="flex gap-1">
                          {angle.platforms.map((platform) => (
                            <Badge key={platform} variant="outline" className={`text-xs ${getPlatformColor(platform)}`}>
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{angle.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* KPIs */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Key Performance Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {plan.kpis.map((kpi, idx) => (
                      <div key={idx} className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{kpi.metric}</span>
                          <Badge variant="secondary">{kpi.target}</Badge>
                        </div>
                        {kpi.rationale && (
                          <p className="text-xs text-muted-foreground mt-1">{kpi.rationale}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
