import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LandingPageData } from "@/pages/LandingPageWizard";

interface LandingPageBasicInfoProps {
  data: LandingPageData;
  updateData: (updates: Partial<LandingPageData>) => void;
}

export function LandingPageBasicInfo({ data, updateData }: LandingPageBasicInfoProps) {
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Basic Information</h2>
        <p className="text-sm text-muted-foreground">
          Set up the basic details for your creator application page
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Page Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => {
              updateData({ 
                title: e.target.value,
                slug: generateSlug(e.target.value)
              });
            }}
            placeholder="e.g., Join Our Creator Program"
          />
          <p className="text-xs text-muted-foreground">
            This will be displayed as the main heading
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">URL Slug</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">/apply/</span>
            <Input
              id="slug"
              value={data.slug}
              onChange={(e) => updateData({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
              placeholder="your-campaign"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            The URL where creators will access this form
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="Describe your creator program and what you're looking for..."
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            A brief description shown below the title
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="headerText">Header Text</Label>
          <Input
            id="headerText"
            value={data.headerText}
            onChange={(e) => updateData({ headerText: e.target.value })}
            placeholder="e.g., Become a Brand Ambassador"
          />
          <p className="text-xs text-muted-foreground">
            The hero text displayed at the top of the page
          </p>
        </div>
      </div>
    </div>
  );
}
