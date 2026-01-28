import { useState } from "react";
import { Campaign } from "@/contexts/CampaignsContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditCampaignDialogProps {
  campaign: Campaign;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: Partial<Campaign>) => void;
}

export function EditCampaignDialog({
  campaign,
  open,
  onOpenChange,
  onSave,
}: EditCampaignDialogProps) {
  const [formData, setFormData] = useState({
    name: campaign.name,
    budget: campaign.budget || "",
    goal: campaign.goal || "",
    brief: campaign.brief || "",
    product: campaign.product || "",
    affiliateOffer: campaign.affiliateOffer || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Campaign</DialogTitle>
          <DialogDescription>
            Update campaign details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter campaign name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                placeholder="e.g., $10,000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Goal</Label>
              <Input
                id="goal"
                value={formData.goal}
                onChange={(e) =>
                  setFormData({ ...formData, goal: e.target.value })
                }
                placeholder="e.g., Increase brand awareness by 30%"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brief">Campaign Summary</Label>
              <Textarea
                id="brief"
                value={formData.brief}
                onChange={(e) =>
                  setFormData({ ...formData, brief: e.target.value })
                }
                placeholder="Enter campaign summary"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) =>
                  setFormData({ ...formData, product: e.target.value })
                }
                placeholder="Product name or description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="affiliateOffer">Affiliate Offer</Label>
              <Textarea
                id="affiliateOffer"
                value={formData.affiliateOffer}
                onChange={(e) =>
                  setFormData({ ...formData, affiliateOffer: e.target.value })
                }
                placeholder="Affiliate offer details"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
