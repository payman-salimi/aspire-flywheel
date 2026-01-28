import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { WizardProgress } from "@/components/wizard/WizardProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  ArrowLeft,
  ArrowRight,
  Video,
  ShoppingBag,
  Megaphone,
  Link2,
  CalendarIcon,
  X,
  FileText,
  ExternalLink,
  Percent,
  DollarSign,
  Package,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Details", description: "Name & brief" },
  { title: "Deliverables", description: "Content specs" },
  { title: "Affiliate", description: "Commission setup" },
  { title: "Products", description: "Select products" },
  { title: "Review", description: "Launch" },
];

const templates = [
  {
    id: "content_ads",
    name: "Creator Content for Ads",
    description: "Get high-quality content from creators for your paid media campaigns",
    icon: Video,
    popular: true,
  },
  {
    id: "product_launch",
    name: "Product Launch",
    description: "Coordinate creators for a synchronized product launch",
    icon: ShoppingBag,
    popular: false,
  },
  {
    id: "promotion",
    name: "Promotion",
    description: "Run a promotion campaign with discount codes and tracking",
    icon: Megaphone,
    popular: false,
  },
  {
    id: "affiliate",
    name: "Affiliate",
    description: "Set up ongoing affiliate relationships with performance tracking",
    icon: Link2,
    popular: false,
  },
];

const deliverableTypes = [
  { id: "video_short", label: "Short-form Video (15-60s)", description: "TikTok, Reels, Shorts" },
  { id: "video_long", label: "Long-form Video (1-10min)", description: "YouTube, IGTV" },
  { id: "static_image", label: "Static Image", description: "Feed post, carousel" },
  { id: "story", label: "Story Content", description: "24-hour stories" },
];

const mockLandingPages = [
  { id: "lp-1", name: "Summer Creator Application", url: "/apply/summer-2026", createdAt: "Jan 10, 2026" },
  { id: "lp-2", name: "Brand Ambassador Program", url: "/apply/ambassadors", createdAt: "Dec 5, 2025" },
  { id: "lp-3", name: "Product Launch Partners", url: "/apply/product-launch", createdAt: "Jan 18, 2026" },
];

const mockProducts = [
  { id: "prod-1", name: "Summer Dress Collection", sku: "SDC-2026", price: "$89.00", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=80&h=80&fit=crop" },
  { id: "prod-2", name: "Beach Tote Bag", sku: "BTB-001", price: "$45.00", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop" },
  { id: "prod-3", name: "Sunglasses Set", sku: "SG-SET", price: "$120.00", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80&h=80&fit=crop" },
  { id: "prod-4", name: "Straw Hat", sku: "SH-001", price: "$35.00", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=80&h=80&fit=crop" },
  { id: "prod-5", name: "Sandals", sku: "SND-002", price: "$65.00", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=80&h=80&fit=crop" },
];

export default function NewCollaboration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("content_ads"); // Default template since it's pre-selected
  const [campaignName, setCampaignName] = useState("");
  const [brief, setBrief] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>([]);
  const [requestAdRights, setRequestAdRights] = useState(true);
  const [selectedLandingPage, setSelectedLandingPage] = useState<string>("");
  
  // Affiliate settings
  const [enableAffiliate, setEnableAffiliate] = useState(true);
  const [commissionType, setCommissionType] = useState<"percentage" | "fixed">("percentage");
  const [commissionValue, setCommissionValue] = useState("15");
  const [enablePromoCode, setEnablePromoCode] = useState(true);
  const [promoCodeDiscount, setPromoCodeDiscount] = useState("10");
  
  // Product selection
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLaunch = () => {
    // In a real app, this would save to the database
    navigate("/collaborations");
  };

  const toggleDeliverable = (id: string) => {
    setSelectedDeliverables((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!campaignName.trim();
      case 2:
        return selectedDeliverables.length > 0;
      case 3:
        return true; // Affiliate settings are optional
      case 4:
        return selectedProducts.length > 0;
      default:
        return true;
    }
  };

  return (
    <AppLayout
      title="New Campaign"
      description="Create a new creator campaign"
      actions={
        <Button variant="ghost" asChild>
          <Link to="/collaborations">
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-4xl space-y-8">
        <WizardProgress steps={steps} currentStep={currentStep} />

        <Card>
          <CardContent className="pt-6">
            {/* Step 1: Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Campaign Details</h2>
                  <p className="text-sm text-muted-foreground">
                    Give your campaign a name and write the brief
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Summer Collection Launch"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brief">Brief</Label>
                    <Textarea
                      id="brief"
                      placeholder="Describe what you want creators to do, key messages, and any requirements..."
                      rows={6}
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Landing Page Link */}
                  <div className="space-y-2 border-t pt-4">
                    <Label htmlFor="landing-page">Link to Landing Page (Optional)</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Connect an existing creator application page to this collaboration
                    </p>
                    <Select
                      value={selectedLandingPage}
                      onValueChange={setSelectedLandingPage}
                    >
                      <SelectTrigger id="landing-page">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select a landing page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No landing page</SelectItem>
                        {mockLandingPages.map((page) => (
                          <SelectItem key={page.id} value={page.id}>
                            {page.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedLandingPage && selectedLandingPage !== "none" && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>
                          {mockLandingPages.find((p) => p.id === selectedLandingPage)?.url}
                        </span>
                      </div>
                    )}
                    <div className="mt-2">
                      <Button variant="link" size="sm" className="h-auto p-0" asChild>
                        <Link to="/creators/landing-page/new">
                          + Create new landing page
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Deliverables */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Content Deliverables</h2>
                  <p className="text-sm text-muted-foreground">
                    Select the types of content you want creators to produce
                  </p>
                </div>
                <div className="space-y-3">
                  {deliverableTypes.map((type) => (
                    <Label
                      key={type.id}
                      htmlFor={type.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all hover:border-primary/50",
                        selectedDeliverables.includes(type.id) &&
                          "border-primary bg-primary/5"
                      )}
                    >
                      <Checkbox
                        id={type.id}
                        checked={selectedDeliverables.includes(type.id)}
                        onCheckedChange={() => toggleDeliverable(type.id)}
                      />
                      <div className="flex-1">
                        <span className="font-medium">{type.label}</span>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                    </Label>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <Label className="flex items-center gap-3">
                    <Checkbox
                      checked={requestAdRights}
                      onCheckedChange={(checked) =>
                        setRequestAdRights(checked as boolean)
                      }
                    />
                    <div>
                      <span className="font-medium">Request Ad Usage Rights</span>
                      <p className="text-sm text-muted-foreground">
                        Request permission to use content in paid advertising
                      </p>
                    </div>
                  </Label>
                </div>
              </div>
            )}

            {/* Step 3: Affiliate Settings */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Affiliate Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure commission and promo code settings for creators
                  </p>
                </div>

                {/* Enable Affiliate */}
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-affiliate" className="text-base font-medium">
                      Enable Affiliate Program
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow creators to earn commission on sales
                    </p>
                  </div>
                  <Switch
                    id="enable-affiliate"
                    checked={enableAffiliate}
                    onCheckedChange={setEnableAffiliate}
                  />
                </div>

                {enableAffiliate && (
                  <div className="space-y-4 rounded-lg border p-4">
                    <div className="space-y-3">
                      <Label>Commission Type</Label>
                      <RadioGroup
                        value={commissionType}
                        onValueChange={(v) => setCommissionType(v as "percentage" | "fixed")}
                        className="flex gap-4"
                      >
                        <Label
                          htmlFor="commission-percentage"
                          className={cn(
                            "flex flex-1 cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all hover:border-primary/50",
                            commissionType === "percentage" && "border-primary bg-primary/5"
                          )}
                        >
                          <RadioGroupItem value="percentage" id="commission-percentage" />
                          <Percent className="h-5 w-5 text-muted-foreground" />
                          <span>Percentage</span>
                        </Label>
                        <Label
                          htmlFor="commission-fixed"
                          className={cn(
                            "flex flex-1 cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all hover:border-primary/50",
                            commissionType === "fixed" && "border-primary bg-primary/5"
                          )}
                        >
                          <RadioGroupItem value="fixed" id="commission-fixed" />
                          <DollarSign className="h-5 w-5 text-muted-foreground" />
                          <span>Fixed Amount</span>
                        </Label>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="commission-value">
                        Commission {commissionType === "percentage" ? "Rate (%)" : "Amount ($)"}
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {commissionType === "percentage" ? "%" : "$"}
                        </span>
                        <Input
                          id="commission-value"
                          type="number"
                          value={commissionValue}
                          onChange={(e) => setCommissionValue(e.target.value)}
                          className="pl-8"
                          placeholder={commissionType === "percentage" ? "15" : "10"}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Promo Code Settings */}
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-promo" className="text-base font-medium">
                      Enable Promo Codes
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Generate unique discount codes for each creator
                    </p>
                  </div>
                  <Switch
                    id="enable-promo"
                    checked={enablePromoCode}
                    onCheckedChange={setEnablePromoCode}
                  />
                </div>

                {enablePromoCode && (
                  <div className="space-y-2 rounded-lg border p-4">
                    <Label htmlFor="promo-discount">Promo Code Discount (%)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      <Input
                        id="promo-discount"
                        type="number"
                        value={promoCodeDiscount}
                        onChange={(e) => setPromoCodeDiscount(e.target.value)}
                        className="pl-8"
                        placeholder="10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Creators will receive a unique code like SARAH10 for their audience
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Product Selection */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Select Products</h2>
                  <p className="text-sm text-muted-foreground">
                    Choose which products creators will promote in this campaign
                  </p>
                </div>
                <div className="space-y-3">
                  {mockProducts.map((product) => (
                    <Label
                      key={product.id}
                      htmlFor={`product-${product.id}`}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all hover:border-primary/50",
                        selectedProducts.includes(product.id) &&
                          "border-primary bg-primary/5"
                      )}
                    >
                      <Checkbox
                        id={`product-${product.id}`}
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleProduct(product.id)}
                      />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <span className="font-medium">{product.name}</span>
                        <p className="text-sm text-muted-foreground">
                          SKU: {product.sku} · {product.price}
                        </p>
                      </div>
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </Label>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedProducts.length} product
                  {selectedProducts.length !== 1 ? "s" : ""} selected
                </p>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Review & Launch</h2>
                  <p className="text-sm text-muted-foreground">
                    Review your campaign details before launching
                  </p>
                </div>
                <div className="space-y-4 rounded-lg border p-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Template</span>
                      <p className="font-medium">
                        {templates.find((t) => t.id === selectedTemplate)?.name}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Name</span>
                      <p className="font-medium">{campaignName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Deliverables</span>
                      <p className="font-medium">
                        {selectedDeliverables.length} type
                        {selectedDeliverables.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Products</span>
                      <p className="font-medium">
                        {selectedProducts.length} product
                        {selectedProducts.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Commission</span>
                      <p className="font-medium">
                        {enableAffiliate
                          ? `${commissionValue}${commissionType === "percentage" ? "%" : " USD"} per sale`
                          : "Disabled"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Promo Codes</span>
                      <p className="font-medium">
                        {enablePromoCode ? `${promoCodeDiscount}% discount` : "Disabled"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Ad Rights</span>
                      <p className="font-medium">
                        {requestAdRights ? "Requested" : "Not requested"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Timeline</span>
                      <p className="font-medium">
                        {startDate && endDate
                          ? `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`
                          : "Not set"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Landing Page</span>
                      <p className="font-medium">
                        {selectedLandingPage && selectedLandingPage !== "none"
                          ? mockLandingPages.find((p) => p.id === selectedLandingPage)?.name
                          : "Not linked"}
                      </p>
                    </div>
                  </div>
                  {brief && (
                    <div>
                      <span className="text-sm text-muted-foreground">Brief</span>
                      <p className="mt-1 text-sm">{brief}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleLaunch}>Launch Collaboration</Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
