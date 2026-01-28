import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ArrowLeft, Sparkles, LayoutTemplate } from "lucide-react";

const templates = [
  {
    id: "seasonal",
    name: "Seasonal Promotion",
    description: "Perfect for holiday or seasonal campaigns",
    icon: "🎉",
  },
  {
    id: "product-launch",
    name: "Product Launch",
    description: "Launch new products with creator content",
    icon: "🚀",
  },
  {
    id: "brand-awareness",
    name: "Brand Awareness",
    description: "Build brand presence and reach new audiences",
    icon: "📢",
  },
  {
    id: "user-generated",
    name: "User Generated Content",
    description: "Collect authentic content from creators",
    icon: "📸",
  },
];

const aspireRecommendation = {
  budget: "$15,000",
  startDate: "Feb 15, 2026",
  endDate: "Mar 15, 2026",
  landingPage: "Spring Collection 2026",
  existingMembers: 12,
  newRecruits: 25,
  totalMembers: 37,
  deliverables: [
    { type: "Instagram Reels", quantity: 3 },
    { type: "TikTok Videos", quantity: 2 },
    { type: "Instagram Stories", quantity: 5 },
  ],
  productCatalog: "Up to 3 products per creator",
  affiliateCode: "SPRING2026",
  discount: "20% off for customers",
  commission: "15% commission for creators",
  projectedROI: "3.5x",
  estimatedReach: "2.5M impressions",
};

export default function NewCampaign() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<"recommendation" | "template" | null>(null);

  const handleAcceptRecommendation = () => {
    // Navigate to campaign creation form with recommendation pre-filled
    navigate("/campaigns/create", { state: { useRecommendation: true, data: aspireRecommendation } });
  };

  const handleSelectTemplate = (templateId: string) => {
    // Navigate to campaign creation form with selected template
    navigate("/campaigns/create", { state: { template: templateId } });
  };

  return (
    <AppLayout
      title="Create New Campaign"
      description="Let Aspire's AI help you create the perfect campaign"
      actions={
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      }
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Aspire's Recommendation */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <AutoAwesomeIcon sx={{ fontSize: 24 }} className="text-primary" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Aspire's AI Recommendation
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your performance data and market trends
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-background/80 p-4 space-y-4">
              {/* Budget & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <AttachMoneyIcon sx={{ fontSize: 20 }} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Budget</p>
                    <p className="text-lg font-semibold">{aspireRecommendation.budget}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <CalendarTodayIcon sx={{ fontSize: 20 }} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Start Date</p>
                    <p className="text-sm font-semibold">{aspireRecommendation.startDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <CalendarTodayIcon sx={{ fontSize: 20 }} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">End Date</p>
                    <p className="text-sm font-semibold">{aspireRecommendation.endDate}</p>
                  </div>
                </div>
              </div>

              {/* Landing Page */}
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Landing Page</p>
                <Badge variant="secondary" className="text-sm">
                  {aspireRecommendation.landingPage}
                </Badge>
              </div>

              {/* Members */}
              <div className="border-t pt-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                    <PeopleIcon sx={{ fontSize: 20 }} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Members Strategy</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total: {aspireRecommendation.totalMembers} creators
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 ml-13">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Existing Members</p>
                    <p className="text-2xl font-bold">{aspireRecommendation.existingMembers}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">New to Recruit</p>
                    <p className="text-2xl font-bold">{aspireRecommendation.newRecruits}</p>
                  </div>
                </div>
              </div>

              {/* Deliverables */}
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-3">Deliverable Types & Quantity</p>
                <div className="space-y-2">
                  {aspireRecommendation.deliverables.map((deliverable, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                    >
                      <span className="text-sm font-medium">{deliverable.type}</span>
                      <Badge variant="secondary">{deliverable.quantity} per creator</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Catalog */}
              <div className="border-t pt-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <InventoryIcon sx={{ fontSize: 20 }} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Product Catalog</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {aspireRecommendation.productCatalog}
                    </p>
                  </div>
                </div>
              </div>

              {/* Affiliate Offer */}
              <div className="border-t pt-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                    <LocalOfferIcon sx={{ fontSize: 20 }} className="text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Affiliate Offer</p>
                  </div>
                </div>
                <div className="space-y-2 ml-13">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon sx={{ fontSize: 16 }} className="text-green-600" />
                    <span className="text-sm">Code: <strong>{aspireRecommendation.affiliateCode}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon sx={{ fontSize: 16 }} className="text-green-600" />
                    <span className="text-sm">{aspireRecommendation.discount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon sx={{ fontSize: 16 }} className="text-green-600" />
                    <span className="text-sm">{aspireRecommendation.commission}</span>
                  </div>
                </div>
              </div>

              {/* Projections */}
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-3">Projected Performance</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 p-3">
                    <p className="text-xs text-muted-foreground">Projected ROI</p>
                    <p className="text-2xl font-bold text-green-600">{aspireRecommendation.projectedROI}</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 p-3">
                    <p className="text-xs text-muted-foreground">Estimated Reach</p>
                    <p className="text-2xl font-bold text-blue-600">{aspireRecommendation.estimatedReach}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                This recommendation is based on your historical performance and current market trends
              </p>
              <Button size="lg" onClick={handleAcceptRecommendation}>
                <Sparkles className="mr-2 h-4 w-4" />
                Accept & Proceed
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4 text-muted-foreground">or choose a template</span>
          </div>
        </div>

        {/* Templates */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LayoutTemplate className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Campaign Templates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
                onClick={() => handleSelectTemplate(template.id)}
              >
                <CardHeader className="pb-3">
                  <div className="text-4xl mb-2">{template.icon}</div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
