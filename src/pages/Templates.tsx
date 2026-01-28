import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Video, ShoppingBag, Megaphone, Link2, MoreHorizontal, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const templates = [
  {
    id: "content_ads",
    name: "Creator Content for Ads",
    description: "Get high-quality content from creators for your paid media campaigns. Includes deliverables, ad rights, and review workflow.",
    icon: Video,
    usageCount: 24,
    type: "system",
  },
  {
    id: "product_launch",
    name: "Product Launch",
    description: "Coordinate creators for a synchronized product launch with seeding, content creation, and timed publishing.",
    icon: ShoppingBag,
    usageCount: 12,
    type: "system",
  },
  {
    id: "promotion",
    name: "Promotion",
    description: "Run a promotion campaign with unique discount codes, link tracking, and performance measurement.",
    icon: Megaphone,
    usageCount: 18,
    type: "system",
  },
  {
    id: "affiliate",
    name: "Affiliate",
    description: "Set up ongoing affiliate relationships with commission tracking, sales attribution, and automated payouts.",
    icon: Link2,
    usageCount: 8,
    type: "system",
  },
];

export default function Templates() {
  return (
    <AppLayout
      title="Templates"
      description="Manage collaboration templates"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      }
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">System Templates</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.id} className="group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <template.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            System
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Used {template.usageCount} times
                          </span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
                    {template.description}
                  </CardDescription>
                  <div className="mt-4">
                    <Button asChild className="w-full">
                      <Link to="/collaborations/new">Use Template</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Custom Templates</h2>
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">No custom templates yet</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Create custom templates based on your workflow to speed up collaboration creation
              </p>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Custom Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
