import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, DollarSign } from "lucide-react";

interface AdRecommendationBoxProps {
  readyContentCount: number;
  recommendedBudget: number;
  predictedROAS: number;
  onCreateAds: () => void;
}

export function AdRecommendationBox({
  readyContentCount,
  recommendedBudget,
  predictedROAS,
  onCreateAds,
}: AdRecommendationBoxProps) {
  const predictedReturn = recommendedBudget * predictedROAS;
  const profit = predictedReturn - recommendedBudget;

  return (
    <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-6">
          {/* Left Section - AI Insights */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">AI Recommendation</h3>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Based on analysis of your content performance data, you have{" "}
                <span className="font-semibold text-foreground">{readyContentCount} pieces of content</span>{" "}
                that are ready to create ads from.
              </p>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-background/60 border border-primary/10">
                <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Predicted Performance</p>
                  <p className="text-sm text-muted-foreground">
                    Invest{" "}
                    <span className="font-semibold text-foreground">
                      ${recommendedBudget.toLocaleString()}
                    </span>{" "}
                    behind this content and get an estimated{" "}
                    <span className="font-semibold text-primary">{predictedROAS}x ROAS</span>{" "}
                    in return.
                  </p>
                </div>
              </div>

              {/* ROI Breakdown */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Investment</p>
                  <p className="text-lg font-semibold">${recommendedBudget.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Est. Return</p>
                  <p className="text-lg font-semibold text-primary">${predictedReturn.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Est. Profit</p>
                  <p className="text-lg font-semibold text-green-600">+${profit.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - CTA */}
          <div className="flex flex-col items-end gap-3">
            <Button
              size="lg"
              className="gap-2"
              onClick={onCreateAds}
            >
              <DollarSign className="h-4 w-4" />
              Create Ad Campaign
            </Button>
            <p className="text-xs text-muted-foreground text-right max-w-[180px]">
              Launch ready in one click
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
