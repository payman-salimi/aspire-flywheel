import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCampaigns } from "@/contexts/CampaignsContext";

type AgentStep = "initial" | "action_plan" | "thinking" | "success";

export function AspireAgent() {
  const [query, setQuery] = useState("");
  const [step, setStep] = useState<AgentStep>("initial");
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const { addCampaign } = useCampaigns();

  useEffect(() => {
    if (step === "thinking") {
      const timer = setTimeout(() => {
        // Create the Mother's Day campaign
        const newCampaignId = `mothers-day-${Date.now()}`;
        const newCampaign = {
          id: newCampaignId,
          name: "Mother's Day Campaign",
          status: "draft" as const,
          startDate: "Apr 15, 2026",
          endDate: "May 15, 2026",
          memberCount: 0,
          members: [],
          tasksCompleted: 0,
          totalTasks: 25,
          template: "Seasonal Promotion",
          brief: "Mother's Day campaign with $11,500 total budget featuring a 10% customer promo code and a $50 product credit for participating creators. Targeting 50 female creators (US & Canada-based) in the parenting/family niche.",
          budget: "$11,500",
          goal: "Generate $40,000 in total sales with 15% increase in Paid Partnership spend",
          product: "Mother's Day Collection",
          affiliateOffer: "10% customer promo code + $50 product credit for creators",
        };
        addCampaign(newCampaign);
        setCampaignId(newCampaignId);
        setStep("success");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step, addCampaign]);

  const handleStartClick = () => {
    setStep("action_plan");
  };

  const handleConfirm = () => {
    setStep("thinking");
  };

  const handleCancel = () => {
    setStep("initial");
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AutoAwesomeIcon sx={{ fontSize: 20 }} className="text-primary" />
          <CardTitle>Aspire's Agent</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        {/* AI Search Input */}
        <div className="relative">
          <SearchIcon
            sx={{ fontSize: 18 }}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Ask me anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        {/* Step: Initial Recommendation */}
        {step === "initial" && (
          <div className="flex-1 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <AutoAwesomeIcon sx={{ fontSize: 16 }} className="text-primary" />
              </div>
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-foreground">
                  It's time to launch your Mother's Day campaign. Based on our estimates, a $10,000 budget could generate $25,000 in organic sales. Furthermore, by increasing your Paid Partnership spend by just 15%, we project total sales could reach $40,000. Shall I begin the recruitment process for you?
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="h-8" onClick={handleStartClick}>
                    Yes, let's start
                  </Button>
                  <Button size="sm" variant="outline" className="h-8">
                    Tell me more
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step: Action Plan */}
        {step === "action_plan" && (
          <div className="flex-1 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-4 overflow-auto">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <AutoAwesomeIcon sx={{ fontSize: 16 }} className="text-primary" />
              </div>
              <div className="space-y-3 flex-1">
                <p className="text-sm leading-relaxed text-foreground font-medium">
                  To hit our target goals, here is my proposed 5-step action plan:
                </p>
                <ol className="text-sm leading-relaxed text-foreground space-y-2 list-decimal list-inside">
                  <li>Create the Mother's Day campaign, $11,500 total budget featuring a 10% customer promo code and a $50 product credit for participating creators.</li>
                  <li>Invite your top 20 performing members to ensure high-quality baseline engagement.</li>
                  <li>Design a dedicated landing page detailing campaign perks and the exclusive Mother's Day offer.</li>
                  <li>Recruit 50 female creators (US & Canada-based) in the parenting/family niche to share the landing page and drive sign-ups.</li>
                  <li>Set up formal guidelines covering product fulfillment, Paid Partnership Ad rights, and a content review process for a total of 3 Reels and 2 TikToks per creator.</li>
                </ol>
                <p className="text-sm text-muted-foreground">
                  Do you want me to proceed? You can edit all settings anytime after creation.
                </p>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="h-8" onClick={handleConfirm}>
                    Confirm
                  </Button>
                  <Button size="sm" variant="outline" className="h-8" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step: Thinking */}
        {step === "thinking" && (
          <div className="flex-1 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-4 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                  <AutoAwesomeIcon sx={{ fontSize: 24 }} className="text-primary" />
                </div>
                <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Creating your campaign...</p>
                <p className="text-xs text-muted-foreground mt-1">Setting up campaign structure, landing page, and guidelines</p>
              </div>
            </div>
          </div>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="flex-1 rounded-lg bg-gradient-to-br from-green-500/5 to-green-500/10 border border-green-500/20 p-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <CheckCircleIcon sx={{ fontSize: 16 }} className="text-green-600" />
              </div>
              <div className="space-y-3 flex-1">
                <p className="text-sm font-medium text-green-700">
                  Campaign created successfully!
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  Your Mother's Day campaign has been set up with all the recommended settings. You can now review and customize the campaign details, invite creators, and launch when ready.
                </p>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="h-8" asChild>
                    <Link to={`/collaborations/${campaignId}`}>
                      Review Campaign
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8"
                    onClick={() => setStep("initial")}
                  >
                    Ask another question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
