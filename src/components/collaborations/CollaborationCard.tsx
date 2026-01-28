import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Collaboration {
  id: string;
  name: string;
  template: string;
  status: "draft" | "launched" | "in_progress" | "completed" | "archived";
  creatorCount: number;
  completedTasks: number;
  totalTasks: number;
  startDate: string;
  endDate: string;
  creators: { name: string; avatar?: string }[];
}

interface CollaborationCardProps {
  collaboration: Collaboration;
  onView?: () => void;
  onDuplicate?: () => void;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground border-border" },
  launched: { label: "Launched", className: "bg-chart-2/10 text-chart-2 border-chart-2/20" },
  in_progress: { label: "In Progress", className: "bg-chart-3/20 text-foreground border-chart-3/30" },
  completed: { label: "Completed", className: "bg-primary/10 text-primary border-primary/20" },
  archived: { label: "Archived", className: "bg-muted text-muted-foreground border-border" },
};

export function CollaborationCard({
  collaboration,
  onView,
  onDuplicate,
}: CollaborationCardProps) {
  const progress = (collaboration.completedTasks / collaboration.totalTasks) * 100;
  const status = statusConfig[collaboration.status];

  return (
    <Card className="group transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold leading-none">{collaboration.name}</h3>
            <p className="text-sm text-muted-foreground">{collaboration.template}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={status.className}>
              {status.label}
            </Badge>
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
                <DropdownMenuItem onClick={onView}>View Details</DropdownMenuItem>
                <DropdownMenuItem onClick={onDuplicate}>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{collaboration.creatorCount} creators</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{collaboration.startDate}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Task Progress</span>
            <span className="font-medium">
              {collaboration.completedTasks}/{collaboration.totalTasks}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {collaboration.creators.slice(0, 4).map((creator, i) => (
              <Avatar key={i} className="h-7 w-7 border-2 border-card">
                <AvatarImage src={creator.avatar} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {creator.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            ))}
            {collaboration.creatorCount > 4 && (
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-medium">
                +{collaboration.creatorCount - 4}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onView}>
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
