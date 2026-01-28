import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Palette } from "lucide-react";
import type { LandingPageData } from "@/pages/LandingPageWizard";

interface LandingPageBrandingProps {
  data: LandingPageData;
  updateData: (updates: Partial<LandingPageData>) => void;
}

const colorPresets = [
  { name: "Teal", value: "#14b8a6" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Orange", value: "#f97316" },
  { name: "Green", value: "#22c55e" },
];

export function LandingPageBranding({ data, updateData }: LandingPageBrandingProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Branding & Customization</h2>
        <p className="text-sm text-muted-foreground">
          Customize the look and feel of your landing page
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Logo Upload */}
        <div className="space-y-2">
          <Label>Logo</Label>
          <div className="flex items-center gap-4">
            {data.logoUrl ? (
              <div className="relative h-16 w-16 rounded-lg border overflow-hidden">
                <img
                  src={data.logoUrl}
                  alt="Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <Input
                value={data.logoUrl}
                onChange={(e) => updateData({ logoUrl: e.target.value })}
                placeholder="Enter logo URL"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Paste a URL to your logo image
              </p>
            </div>
          </div>
        </div>

        {/* Primary Color */}
        <div className="space-y-2">
          <Label>Primary Color</Label>
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-lg border shadow-sm"
              style={{ backgroundColor: data.primaryColor }}
            />
            <Input
              type="color"
              value={data.primaryColor}
              onChange={(e) => updateData({ primaryColor: e.target.value })}
              className="h-10 w-20 p-1"
            />
            <Input
              value={data.primaryColor}
              onChange={(e) => updateData({ primaryColor: e.target.value })}
              placeholder="#14b8a6"
              className="flex-1"
            />
          </div>
          <div className="flex gap-2 mt-2">
            {colorPresets.map((color) => (
              <button
                key={color.value}
                onClick={() => updateData({ primaryColor: color.value })}
                className="h-6 w-6 rounded-full border shadow-sm transition-transform hover:scale-110"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* CTA Button Text */}
        <div className="space-y-2">
          <Label htmlFor="ctaButtonText">Submit Button Text</Label>
          <Input
            id="ctaButtonText"
            value={data.ctaButtonText}
            onChange={(e) => updateData({ ctaButtonText: e.target.value })}
            placeholder="e.g., Submit Application"
          />
        </div>

        {/* Thank You Message */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="thankYouMessage">Thank You Message</Label>
          <Textarea
            id="thankYouMessage"
            value={data.thankYouMessage}
            onChange={(e) => updateData({ thankYouMessage: e.target.value })}
            placeholder="Message shown after successful submission..."
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            This message will be displayed after a creator submits their application
          </p>
        </div>
      </div>

      {/* Preview Card */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Button Preview</span>
        </div>
        <Button
          style={{ backgroundColor: data.primaryColor }}
          className="text-primary-foreground"
        >
          {data.ctaButtonText || "Submit"}
        </Button>
      </div>
    </div>
  );
}
