import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Smartphone,
  Monitor,
  DollarSign,
  Calendar,
  Target,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  FlaskConical,
  BarChart3,
  Shuffle,
} from "lucide-react";
import type { ContentAsset } from "./ContentCard";

interface CreateAdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: ContentAsset | null;
  onSubmit: (adConfig: AdConfig) => void;
  initialStep?: number;
  initialConfig?: Partial<AdConfig>;
}

interface Platform {
  id: string;
  name: string;
  icon: string;
  formats: string[];
}

interface AdVariant {
  id: string;
  name: string;
  headline: string;
  description: string;
  ctaText: string;
  budgetPercent: number;
}

export interface AdConfig {
  assetId: string;
  platforms: string[];
  budget: number;
  duration: number;
  objective: string;
  targetAudience: string;
  abTestEnabled: boolean;
  variants: AdVariant[];
}

const platforms: Platform[] = [
  { id: "meta", name: "Meta (FB/IG)", icon: "📘", formats: ["Feed", "Stories", "Reels"] },
  { id: "tiktok", name: "TikTok", icon: "🎵", formats: ["In-Feed", "TopView", "Spark Ads"] },
  { id: "youtube", name: "YouTube", icon: "▶️", formats: ["Pre-roll", "Shorts", "Display"] },
  { id: "google", name: "Google Ads", icon: "🔍", formats: ["Display", "Discovery", "Performance Max"] },
  { id: "pinterest", name: "Pinterest", icon: "📌", formats: ["Standard", "Video", "Carousel"] },
  { id: "snapchat", name: "Snapchat", icon: "👻", formats: ["Single Image", "Video", "Story"] },
];

const objectives = [
  { id: "awareness", name: "Brand Awareness", description: "Maximize reach and impressions" },
  { id: "traffic", name: "Website Traffic", description: "Drive clicks to your site" },
  { id: "engagement", name: "Engagement", description: "Get more likes, comments, shares" },
  { id: "conversions", name: "Conversions", description: "Drive sales and sign-ups" },
];

const audiences = [
  { id: "broad", name: "Broad Audience", description: "18-65, all interests" },
  { id: "lookalike", name: "Lookalike Audience", description: "Similar to existing customers" },
  { id: "retargeting", name: "Retargeting", description: "Website visitors & engagers" },
  { id: "custom", name: "Custom Audience", description: "Your uploaded list" },
];

const ctaOptions = [
  "Shop Now",
  "Learn More",
  "Sign Up",
  "Get Started",
  "Book Now",
  "Subscribe",
  "Download",
  "Contact Us",
];

const headlineTemplates = [
  "Discover the difference",
  "Limited time offer",
  "Don't miss out",
  "Transform your style",
  "Elevate your experience",
  "The wait is over",
];

const createDefaultVariant = (letter: string): AdVariant => ({
  id: crypto.randomUUID(),
  name: `Variant ${letter}`,
  headline: letter === "A" ? "Discover the difference" : letter === "B" ? "Limited time offer" : "Transform your style",
  description: letter === "A" ? "Experience quality like never before" : letter === "B" ? "Shop now and save big" : "See why customers love us",
  ctaText: letter === "A" ? "Shop Now" : letter === "B" ? "Learn More" : "Get Started",
  budgetPercent: 50,
});

export function CreateAdDialog({ open, onOpenChange, asset, onSubmit, initialStep = 1, initialConfig }: CreateAdDialogProps) {
  const [step, setStep] = useState(initialStep);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(initialConfig?.platforms || []);
  const [budget, setBudget] = useState(initialConfig?.budget || 500);
  const [duration, setDuration] = useState(initialConfig?.duration || 7);
  const [objective, setObjective] = useState(initialConfig?.objective || "awareness");
  const [targetAudience, setTargetAudience] = useState(initialConfig?.targetAudience || "broad");
  const [abTestEnabled, setAbTestEnabled] = useState(initialConfig?.abTestEnabled || false);
  const [variants, setVariants] = useState<AdVariant[]>(
    initialConfig?.variants || [createDefaultVariant("A"), createDefaultVariant("B")]
  );
  const [previewVariant, setPreviewVariant] = useState(0);

  // Update state when dialog opens with initial configuration
  useEffect(() => {
    if (open && initialStep) {
      setStep(initialStep);
    }
    if (open && initialConfig) {
      if (initialConfig.platforms) setSelectedPlatforms(initialConfig.platforms);
      if (initialConfig.budget) setBudget(initialConfig.budget);
      if (initialConfig.duration) setDuration(initialConfig.duration);
      if (initialConfig.objective) setObjective(initialConfig.objective);
      if (initialConfig.targetAudience) setTargetAudience(initialConfig.targetAudience);
      if (initialConfig.abTestEnabled !== undefined) setAbTestEnabled(initialConfig.abTestEnabled);
      if (initialConfig.variants) setVariants(initialConfig.variants);
    }
  }, [open, initialStep, initialConfig]);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = () => {
    if (!asset) return;
    onSubmit({
      assetId: asset.id,
      platforms: selectedPlatforms,
      budget,
      duration,
      objective,
      targetAudience,
      abTestEnabled,
      variants: abTestEnabled ? variants : [variants[0]],
    });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setSelectedPlatforms([]);
    setBudget(500);
    setDuration(7);
    setObjective("awareness");
    setTargetAudience("broad");
    setAbTestEnabled(false);
    setVariants([createDefaultVariant("A"), createDefaultVariant("B")]);
    setPreviewVariant(0);
  };

  const addVariant = () => {
    if (variants.length >= 4) return;
    const letters = ["A", "B", "C", "D"];
    const newLetter = letters[variants.length];
    const newBudgetPercent = Math.floor(100 / (variants.length + 1));
    
    setVariants((prev) => {
      const updated = prev.map((v) => ({ ...v, budgetPercent: newBudgetPercent }));
      return [...updated, { ...createDefaultVariant(newLetter), budgetPercent: 100 - newBudgetPercent * variants.length }];
    });
  };

  const removeVariant = (id: string) => {
    if (variants.length <= 2) return;
    setVariants((prev) => {
      const filtered = prev.filter((v) => v.id !== id);
      const perVariant = Math.floor(100 / filtered.length);
      return filtered.map((v, i) => ({
        ...v,
        budgetPercent: i === filtered.length - 1 ? 100 - perVariant * (filtered.length - 1) : perVariant,
      }));
    });
  };

  const updateVariant = (id: string, updates: Partial<AdVariant>) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
  };

  const redistributeBudget = () => {
    const perVariant = Math.floor(100 / variants.length);
    setVariants((prev) =>
      prev.map((v, i) => ({
        ...v,
        budgetPercent: i === prev.length - 1 ? 100 - perVariant * (prev.length - 1) : perVariant,
      }))
    );
  };

  const dailyBudget = (budget / duration).toFixed(2);
  const estimatedReach = Math.round(budget * 150 + selectedPlatforms.length * 5000);
  const totalSteps = abTestEnabled ? 4 : 3;
  const stepLabels = abTestEnabled 
    ? ["Platforms", "Budget & Targeting", "A/B Testing", "Preview"]
    : ["Platforms", "Budget & Targeting", "Preview"];

  const currentVariant = variants[previewVariant] || variants[0];

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) resetForm(); }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Create Ad Campaign
          </DialogTitle>
          <DialogDescription>
            Turn "{asset?.name}" into a paid ad across multiple platforms
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
              </div>
              <span className={`ml-2 text-sm hidden sm:inline ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                {stepLabels[s - 1]}
              </span>
              {s < totalSteps && <div className={`flex-1 h-0.5 mx-4 ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Platform Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label className="text-base font-medium">Select Platforms</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Choose where you want to run your ad campaign
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`relative flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                      selectedPlatforms.includes(platform.id)
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <Checkbox
                      checked={selectedPlatforms.includes(platform.id)}
                      className="absolute top-3 right-3"
                    />
                    <span className="text-2xl">{platform.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{platform.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {platform.formats.length} formats
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedPlatforms.length > 0 && (
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm font-medium mb-2">Available Ad Formats</p>
                <div className="flex flex-wrap gap-2">
                  {platforms
                    .filter((p) => selectedPlatforms.includes(p.id))
                    .flatMap((p) => p.formats.map((f) => `${p.icon} ${f}`))
                    .map((format, i) => (
                      <Badge key={i} variant="secondary">
                        {format}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Budget & Targeting */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Total Budget
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set your campaign spend limit
                  </p>
                  <div className="space-y-4">
                    <Slider
                      value={[budget]}
                      onValueChange={(v) => setBudget(v[0])}
                      min={100}
                      max={10000}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-32"
                      />
                      <span className="text-sm text-muted-foreground">
                        (${dailyBudget}/day)
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Campaign Duration
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    How long should the campaign run?
                  </p>
                  <Select value={String(duration)} onValueChange={(v) => setDuration(Number(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* A/B Testing Toggle */}
                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FlaskConical className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Enable A/B Testing</p>
                        <p className="text-xs text-muted-foreground">
                          Test multiple ad variations to find the best performer
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={abTestEnabled}
                      onCheckedChange={setAbTestEnabled}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Campaign Objective
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    What's your primary goal?
                  </p>
                  <div className="space-y-2">
                    {objectives.map((obj) => (
                      <div
                        key={obj.id}
                        onClick={() => setObjective(obj.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          objective === obj.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium text-sm">{obj.name}</p>
                        <p className="text-xs text-muted-foreground">{obj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Target Audience</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Who should see your ads?
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {audiences.map((aud) => (
                  <div
                    key={aud.id}
                    onClick={() => setTargetAudience(aud.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${
                      targetAudience === aud.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-medium text-sm">{aud.name}</p>
                    <p className="text-xs text-muted-foreground">{aud.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: A/B Testing (only if enabled) */}
        {step === 3 && abTestEnabled && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium flex items-center gap-2">
                  <FlaskConical className="h-4 w-4" />
                  Ad Variations
                </Label>
                <p className="text-sm text-muted-foreground">
                  Create different versions to test headlines, copy, and CTAs
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={redistributeBudget}
                  className="gap-1"
                >
                  <Shuffle className="h-3 w-3" />
                  Split Evenly
                </Button>
                {variants.length < 4 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addVariant}
                    className="gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add Variant
                  </Button>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              {variants.map((variant, index) => {
                const variantLetter = String.fromCharCode(65 + index);
                const variantBudget = ((variant.budgetPercent / 100) * budget).toFixed(0);
                
                return (
                  <div
                    key={variant.id}
                    className="p-4 rounded-lg border bg-card space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {variantLetter}
                        </div>
                        <div>
                          <p className="font-medium text-sm">Variant {variantLetter}</p>
                          <p className="text-xs text-muted-foreground">
                            ${variantBudget} ({variant.budgetPercent}% of budget)
                          </p>
                        </div>
                      </div>
                      {variants.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeVariant(variant.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Headline</Label>
                        <div className="flex gap-2">
                          <Input
                            value={variant.headline}
                            onChange={(e) => updateVariant(variant.id, { headline: e.target.value })}
                            placeholder="Enter headline..."
                          />
                          <Select
                            value=""
                            onValueChange={(v) => updateVariant(variant.id, { headline: v })}
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Ideas" />
                            </SelectTrigger>
                            <SelectContent>
                              {headlineTemplates.map((h) => (
                                <SelectItem key={h} value={h}>{h}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Call-to-Action</Label>
                        <Select
                          value={variant.ctaText}
                          onValueChange={(v) => updateVariant(variant.id, { ctaText: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ctaOptions.map((cta) => (
                              <SelectItem key={cta} value={cta}>{cta}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Description</Label>
                      <Textarea
                        value={variant.description}
                        onChange={(e) => updateVariant(variant.id, { description: e.target.value })}
                        placeholder="Enter ad description..."
                        className="min-h-[60px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Budget Allocation</Label>
                        <span className="text-xs text-muted-foreground">{variant.budgetPercent}%</span>
                      </div>
                      <Slider
                        value={[variant.budgetPercent]}
                        onValueChange={(v) => {
                          const newPercent = v[0];
                          const diff = newPercent - variant.budgetPercent;
                          const otherVariants = variants.filter((ov) => ov.id !== variant.id);
                          const perOther = Math.floor(diff / otherVariants.length);
                          
                          setVariants((prev) =>
                            prev.map((pv) => {
                              if (pv.id === variant.id) return { ...pv, budgetPercent: newPercent };
                              return { ...pv, budgetPercent: Math.max(10, pv.budgetPercent - perOther) };
                            })
                          );
                        }}
                        min={10}
                        max={90}
                        step={5}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Performance Prediction */}
            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <p className="font-medium text-sm">Test Configuration</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Variants</p>
                  <p className="font-medium">{variants.length} versions</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Min. Test Duration</p>
                  <p className="font-medium">{Math.max(3, Math.ceil(duration / 2))} days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Statistical Confidence</p>
                  <p className="font-medium">95% target</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                The winning variant will automatically receive more budget after the test period completes.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Preview (or Step 3 if A/B testing disabled) */}
        {((step === 3 && !abTestEnabled) || (step === 4 && abTestEnabled)) && (
          <div className="space-y-6 animate-fade-in">
            <Tabs defaultValue="mobile" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-base font-medium">Ad Preview</Label>
                <div className="flex items-center gap-3">
                  {abTestEnabled && variants.length > 1 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Variant:</span>
                      <div className="flex gap-1">
                        {variants.map((v, i) => (
                          <Button
                            key={v.id}
                            variant={previewVariant === i ? "default" : "outline"}
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => setPreviewVariant(i)}
                          >
                            {String.fromCharCode(65 + i)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  <TabsList variant="line">
                    <TabsTrigger value="mobile" className="gap-2">
                      <Smartphone className="h-4 w-4" />
                      Mobile
                    </TabsTrigger>
                    <TabsTrigger value="desktop" className="gap-2">
                      <Monitor className="h-4 w-4" />
                      Desktop
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="mobile" className="mt-0">
                <div className="flex justify-center">
                  <div className="w-[280px] rounded-[2rem] border-4 border-foreground/20 p-2 bg-background shadow-xl">
                    <div className="rounded-[1.5rem] overflow-hidden bg-muted">
                      <div className="h-6 bg-foreground/10 flex items-center justify-center">
                        <div className="w-20 h-4 bg-foreground/20 rounded-full" />
                      </div>
                      <div className="p-3 space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20" />
                          <div>
                            <p className="text-xs font-medium">Sponsored</p>
                            <p className="text-[10px] text-muted-foreground">Your Brand</p>
                          </div>
                        </div>
                        <div className="aspect-square rounded-lg overflow-hidden relative">
                          <img
                            src={asset?.thumbnail}
                            alt={asset?.name}
                            className="w-full h-full object-cover"
                          />
                          {asset?.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                              <div className="rounded-full bg-secondary/80 p-2">
                                <Play className="h-4 w-4 text-secondary-foreground" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold line-clamp-1">{currentVariant.headline}</p>
                          <p className="text-[10px] text-muted-foreground line-clamp-2">{currentVariant.description}</p>
                          <Button size="sm" className="w-full h-7 text-xs">
                            {currentVariant.ctaText}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="desktop" className="mt-0">
                <div className="flex justify-center">
                  <div className="w-full max-w-md rounded-lg border bg-card overflow-hidden shadow-lg">
                    <div className="flex items-center gap-2 p-3 border-b">
                      <div className="w-10 h-10 rounded-full bg-primary/20" />
                      <div>
                        <p className="text-sm font-medium">Your Brand</p>
                        <p className="text-xs text-muted-foreground">Sponsored · 🌐</p>
                      </div>
                    </div>
                    <div className="aspect-video relative">
                      <img
                        src={asset?.thumbnail}
                        alt={asset?.name}
                        className="w-full h-full object-cover"
                      />
                      {asset?.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                          <div className="rounded-full bg-secondary/80 p-3">
                            <Play className="h-6 w-6 text-secondary-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="font-medium">{currentVariant.headline}</p>
                      <p className="text-sm text-muted-foreground">{currentVariant.description}</p>
                      <Button className="w-full">{currentVariant.ctaText}</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Campaign Summary */}
            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <p className="font-medium">Campaign Summary</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Platforms</p>
                  <p className="font-medium">{selectedPlatforms.length} selected</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Budget</p>
                  <p className="font-medium">${budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">{duration} days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Est. Reach</p>
                  <p className="font-medium">{estimatedReach.toLocaleString()}+</p>
                </div>
                <div>
                  <p className="text-muted-foreground">A/B Test</p>
                  <p className="font-medium flex items-center gap-1">
                    {abTestEnabled ? (
                      <>
                        <FlaskConical className="h-3 w-3 text-primary" />
                        {variants.length} variants
                      </>
                    ) : (
                      "Disabled"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {platforms
                  .filter((p) => selectedPlatforms.includes(p.id))
                  .map((p) => (
                    <Badge key={p.id} variant="outline">
                      {p.icon} {p.name}
                    </Badge>
                  ))}
              </div>
              {abTestEnabled && (
                <div className="pt-2 border-t mt-2">
                  <p className="text-xs text-muted-foreground mb-2">Variants Budget Split:</p>
                  <div className="flex gap-2">
                    {variants.map((v, i) => (
                      <Badge key={v.id} variant="secondary" className="gap-1">
                        <span className="font-bold">{String.fromCharCode(65 + i)}</span>
                        <span>{v.budgetPercent}%</span>
                        <span className="text-muted-foreground">(${((v.budgetPercent / 100) * budget).toFixed(0)})</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onOpenChange(false)}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            onClick={() => step < totalSteps ? setStep(step + 1) : handleSubmit()}
            disabled={step === 1 && selectedPlatforms.length === 0}
          >
            {step === totalSteps ? "Launch Campaign" : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
