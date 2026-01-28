import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  ChevronDown,
  Bookmark,
  Plus,
} from "lucide-react";
import { ContentCard, type ContentAsset } from "@/components/content-hub/ContentCard";
import { CreateAdDialog, type AdConfig } from "@/components/content-hub/CreateAdDialog";
import { AdRecommendationBox } from "@/components/content-hub/AdRecommendationBox";
import { toast } from "sonner";

const initialAssets: ContentAsset[] = [
  {
    id: "1",
    name: "Summer Collection Reel",
    type: "video",
    creator: "Sarah Johnson",
    creatorUsername: "sarah_beautystyle",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    collaboration: "Summer Collection Launch",
    status: "approved",
    readyForAds: true,
    rights: { scope: "paid", duration: "12 months" },
    thumbnail: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=225&fit=crop",
    isMyContent: true,
    views: 1250,
    project: "Summer Collection Launch",
    group: "Beauty Influencers Group",
    date: "Jan 15, 2026",
  },
  {
    id: "2",
    name: "Product Unboxing",
    type: "video",
    creator: "Mike Chen",
    creatorUsername: "mike_techreview",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    collaboration: "Product Review Campaign",
    status: "pending",
    readyForAds: false,
    rights: null,
    thumbnail: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=225&fit=crop",
    isMyContent: false,
    views: 8,
    project: "Product Review Campaign",
    group: "Gabby's CeraVe Group (do not delete)",
    date: "Jan 26, 2026",
  },
  {
    id: "3",
    name: "Lifestyle Shot",
    type: "image",
    creator: "Emily Davis",
    creatorUsername: "emily_lifestyle",
    creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    collaboration: "Summer Collection Launch",
    status: "approved",
    readyForAds: true,
    rights: { scope: "organic", duration: "perpetual" },
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=225&fit=crop",
    isMyContent: true,
    views: 892,
    project: "Summer Collection Launch",
    group: "Lifestyle Content Creators",
    date: "Jan 18, 2026",
  },
  {
    id: "4",
    name: "Tutorial Video",
    type: "video",
    creator: "Alex Rivera",
    creatorUsername: "alex_tutorials",
    creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    collaboration: "Holiday Promo",
    status: "approved",
    readyForAds: true,
    rights: { scope: "paid", duration: "6 months" },
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=225&fit=crop",
    isMyContent: false,
    views: 2340,
    project: "Holiday Promo 2025",
    group: "Tutorial Creators",
    date: "Dec 28, 2025",
  },
  {
    id: "5",
    name: "Brand Story Video",
    type: "video",
    creator: "Jordan Lee",
    creatorUsername: "jordan_stories",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    collaboration: "Brand Awareness",
    status: "approved",
    readyForAds: true,
    rights: { scope: "paid", duration: "24 months" },
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=225&fit=crop",
    isMyContent: true,
    views: 5670,
    project: "Brand Awareness Campaign",
    group: "Brand Ambassadors",
    date: "Jan 10, 2026",
  },
  {
    id: "6",
    name: "Product Showcase",
    type: "image",
    creator: "Taylor Swift",
    creatorUsername: "taylor_showcase",
    creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    collaboration: "New Product Launch",
    status: "approved",
    readyForAds: true,
    rights: { scope: "organic", duration: "6 months" },
    thumbnail: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=225&fit=crop",
    isMyContent: false,
    views: 1850,
    project: "New Product Launch",
    group: "Product Photographers",
    date: "Jan 22, 2026",
  },
  {
    id: "7",
    name: "Behind the Scenes",
    type: "video",
    creator: "Chris Martin",
    creatorUsername: "chris_bts",
    creatorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    collaboration: "Summer Collection Launch",
    status: "pending",
    readyForAds: false,
    rights: null,
    thumbnail: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=225&fit=crop",
    isMyContent: true,
    views: 450,
    project: "Summer Collection Launch",
    group: "BTS Content Creators",
    date: "Jan 24, 2026",
  },
  {
    id: "8",
    name: "Testimonial Clip",
    type: "video",
    creator: "Lisa Park",
    creatorUsername: "lisa_reviews",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    collaboration: "Customer Stories",
    status: "pending",
    readyForAds: false,
    rights: null,
    thumbnail: "https://images.unsplash.com/photo-1557425493-6f90ae4659fc?w=400&h=225&fit=crop",
    isMyContent: false,
    views: 320,
    project: "Customer Stories Campaign",
    group: "Testimonial Creators",
    date: "Jan 25, 2026",
  },
  {
    id: "9",
    name: "Outfit of the Day",
    type: "image",
    creator: "Nina Gonzales",
    creatorUsername: "nina_fashion",
    creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    collaboration: "Fashion Week",
    status: "pending",
    readyForAds: false,
    rights: null,
    thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=225&fit=crop",
    isMyContent: true,
    views: 680,
    project: "Fashion Week 2026",
    group: "Fashion Influencers",
    date: "Jan 20, 2026",
  },
  {
    id: "10",
    name: "Morning Routine",
    type: "video",
    creator: "David Kim",
    creatorUsername: "david_wellness",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    collaboration: "Lifestyle Campaign",
    status: "pending",
    readyForAds: false,
    rights: null,
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=225&fit=crop",
    isMyContent: false,
    views: 540,
    project: "Lifestyle Campaign Q1",
    group: "Lifestyle Content Group",
    date: "Jan 23, 2026",
  },
  {
    id: "11",
    name: "Fitness Challenge",
    type: "video",
    creator: "Amanda Brooks",
    creatorUsername: "amanda_fitness",
    creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    collaboration: "Health & Wellness",
    status: "pending",
    readyForAds: false,
    rights: null,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    isMyContent: true,
    views: 1120,
    project: "Health & Wellness 2026",
    group: "Fitness Influencers",
    date: "Jan 21, 2026",
  },
  {
    id: "12",
    name: "Recipe Tutorial",
    type: "video",
    creator: "Marco Rossi",
    creatorUsername: "marco_cooking",
    creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    collaboration: "Food & Cooking",
    status: "approved",
    readyForAds: true,
    rights: { scope: "paid", duration: "12 months" },
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop",
    isMyContent: false,
    views: 3450,
    project: "Food Content Series",
    group: "Food Creators",
    date: "Jan 12, 2026",
  },
];

const statusConfig: Record<string, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  approved: { label: "Approved", className: "bg-primary/10 text-primary border-primary/20", icon: CheckCircle2 },
  pending: { label: "Pending", className: "bg-chart-3/20 text-foreground border-chart-3/30", icon: Clock },
};

export default function Assets() {
  const [assets, setAssets] = useState<ContentAsset[]>(initialAssets);
  const [pendingFilter, setPendingFilter] = useState<"all" | "my">("all");
  const [adDialogOpen, setAdDialogOpen] = useState(false);
  const [selectedAssetForAd, setSelectedAssetForAd] = useState<ContentAsset | null>(null);
  const [isRecommendationFlow, setIsRecommendationFlow] = useState(false);

  // Filter states
  const [savedView, setSavedView] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");

  const handleApprove = (id: string) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === id
          ? { ...asset, status: "approved" as const, readyForAds: true, rights: { scope: "paid", duration: "12 months" } }
          : asset
      )
    );
    toast.success("Content approved successfully");
  };

  const handleReject = (id: string) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
    toast.success("Content rejected");
  };

  const handleNoteChange = (id: string, note: string) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === id ? { ...asset, note } : asset
      )
    );
    toast.success("Note saved");
  };

  const handleCreateAd = (id: string) => {
    const asset = assets.find((a) => a.id === id);
    if (asset) {
      setSelectedAssetForAd(asset);
      setIsRecommendationFlow(false);
      setAdDialogOpen(true);
    }
  };

  const handleAdSubmit = (adConfig: AdConfig) => {
    const asset = assets.find((a) => a.id === adConfig.assetId);
    const variantText = adConfig.abTestEnabled
      ? ` with ${adConfig.variants.length} A/B test variants`
      : "";
    toast.success(`Campaign launched for "${asset?.name}" on ${adConfig.platforms.length} platforms${variantText}!`);
    setIsRecommendationFlow(false);
  };

  const handleDialogClose = (open: boolean) => {
    setAdDialogOpen(open);
    if (!open) {
      setIsRecommendationFlow(false);
    }
  };

  const pendingAssets = assets.filter((a) => a.status === "pending");
  const filteredPendingAssets =
    pendingFilter === "my"
      ? pendingAssets.filter((a) => a.isMyContent)
      : pendingAssets;

  const readyAssets = assets.filter((a) => a.readyForAds);

  // AI Recommendation calculations
  const readyContentCount = readyAssets.length;
  const recommendedBudget = readyContentCount * 200; // $200 per content piece
  const predictedROAS = 3; // 3x ROAS

  const handleRecommendationClick = () => {
    // Use the first ready asset as the selected asset
    if (readyAssets.length > 0) {
      setSelectedAssetForAd(readyAssets[0]);
      setIsRecommendationFlow(true);
      setAdDialogOpen(true);
    } else {
      toast.error("No content ready for ads");
    }
  };

  return (
    <AppLayout
      title="Content Hub"
      description="Manage approved content from creators"
    >
      <div className="space-y-6">
        {/* AI Recommendation Box */}
        {readyContentCount > 0 && (
          <AdRecommendationBox
            readyContentCount={readyContentCount}
            recommendedBudget={recommendedBudget}
            predictedROAS={predictedROAS}
            onCreateAds={handleRecommendationClick}
          />
        )}

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
                  All Content
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSavedView("ready-for-ads")}>
                  Ready for Ads
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSavedView("high-performing")}>
                  High Performing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSavedView("recent")}>
                  Recently Added
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
                <DropdownMenuItem onClick={() => setGroupFilter("video")}>
                  Video Content
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupFilter("image")}>
                  Image Content
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupFilter("ugc")}>
                  UGC Content
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupFilter("branded")}>
                  Branded Content
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

        <Tabs defaultValue="all">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="all">All Assets</TabsTrigger>
              <TabsTrigger value="ready">Ready for Ads ({readyAssets.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending Review ({pendingAssets.length})</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search assets..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {assets.map((asset) => (
                <ContentCard
                  key={asset.id}
                  asset={asset}
                  variant="all"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ready" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {readyAssets.map((asset) => (
                <ContentCard
                  key={asset.id}
                  asset={asset}
                  variant="ready"
                  onCreateAd={handleCreateAd}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter:</span>
                <Select
                  value={pendingFilter}
                  onValueChange={(v) => setPendingFilter(v as "all" | "my")}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Content ({pendingAssets.length})</SelectItem>
                    <SelectItem value="my">
                      My Content ({pendingAssets.filter((a) => a.isMyContent).length})
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className="text-sm text-muted-foreground">
                Showing {filteredPendingAssets.length} of {pendingAssets.length} items
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {filteredPendingAssets.map((asset) => (
                <ContentCard
                  key={asset.id}
                  asset={asset}
                  variant="pending"
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onNoteChange={handleNoteChange}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CreateAdDialog
        open={adDialogOpen}
        onOpenChange={handleDialogClose}
        asset={selectedAssetForAd}
        onSubmit={handleAdSubmit}
        initialStep={isRecommendationFlow ? 3 : 1}
        initialConfig={
          isRecommendationFlow
            ? {
                platforms: ["instagram", "facebook", "tiktok"],
                budget: recommendedBudget,
                duration: 14,
                objective: "conversions",
                targetAudience: "lookalike",
                abTestEnabled: false,
              }
            : undefined
        }
      />
    </AppLayout>
  );
}
