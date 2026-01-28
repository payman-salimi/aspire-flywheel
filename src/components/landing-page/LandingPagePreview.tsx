import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Smartphone, Monitor } from "lucide-react";
import { useState } from "react";
import type { LandingPageData } from "@/pages/LandingPageWizard";

interface LandingPagePreviewProps {
  data: LandingPageData;
}

export function LandingPagePreview({ data }: LandingPagePreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Preview & Publish</h2>
          <p className="text-sm text-muted-foreground">
            Review your landing page before publishing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border p-1">
            <Button
              variant={viewMode === "desktop" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "mobile" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* URL Preview */}
      <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
        <code className="text-sm">
          yourdomain.com/apply/<span className="text-primary font-medium">{data.slug || "..."}</span>
        </code>
      </div>

      {/* Preview Frame */}
      <div
        className={`mx-auto rounded-lg border bg-background shadow-lg overflow-hidden transition-all ${
          viewMode === "mobile" ? "max-w-sm" : "max-w-2xl"
        }`}
      >
        {/* Header */}
        <div
          className="p-6 text-center"
          style={{ backgroundColor: data.primaryColor }}
        >
          {data.logoUrl && (
            <img
              src={data.logoUrl}
              alt="Logo"
              className="mx-auto mb-4 h-12 object-contain"
            />
          )}
          <h1 className="text-2xl font-bold text-primary-foreground">
            {data.headerText || "Your Header Text"}
          </h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p className="mt-2 text-muted-foreground">{data.description}</p>
          </div>

          {/* Form Preview */}
          <div className="space-y-4">
            {data.formFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label>
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea placeholder={field.placeholder} disabled />
                ) : field.type === "select" ? (
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder || "Select an option"} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    disabled
                  />
                )}
              </div>
            ))}

            {data.formFields.length === 0 && (
              <div className="rounded-lg border-2 border-dashed p-8 text-center">
                <p className="text-muted-foreground">No form fields configured</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            className="w-full text-primary-foreground"
            style={{ backgroundColor: data.primaryColor }}
            disabled
          >
            {data.ctaButtonText || "Submit"}
          </Button>

          {/* Thank You Preview */}
          <div className="rounded-lg border bg-accent/50 p-4 text-center">
            <Badge variant="secondary" className="mb-2">After Submission</Badge>
            <p className="text-sm text-muted-foreground">{data.thankYouMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
