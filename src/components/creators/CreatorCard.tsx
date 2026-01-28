import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Star, Instagram, Youtube } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  platform: "instagram" | "youtube" | "tiktok";
  followers: number;
  engagementRate: number;
  tags: string[];
  status: "active" | "invited" | "inactive";
  score?: number;
}

interface CreatorCardProps {
  creator: Creator;
  onShortlist?: () => void;
  onInvite?: () => void;
}

const platformIcons = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
};

const statusColors: Record<string, string> = {
  active: "bg-primary/10 text-primary border-primary/20",
  invited: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  inactive: "bg-muted text-muted-foreground border-border",
};

function formatFollowers(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export function CreatorCard({ creator, onShortlist, onInvite }: CreatorCardProps) {
  const PlatformIcon = platformIcons[creator.platform];

  return (
    <Card className="group transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={creator.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {creator.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium truncate">{creator.name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <PlatformIcon className="h-3.5 w-3.5" />
                  <span>{creator.handle}</span>
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
                  <DropdownMenuItem onClick={onShortlist}>
                    <Star className="mr-2 h-4 w-4" />
                    Add to Shortlist
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onInvite}>
                    Invite to Collaborate
                  </DropdownMenuItem>
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Add Note</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-3 mt-3 text-sm">
              <div>
                <span className="font-semibold">{formatFollowers(creator.followers)}</span>
                <span className="text-muted-foreground ml-1">followers</span>
              </div>
              <div>
                <span className="font-semibold">{creator.engagementRate}%</span>
                <span className="text-muted-foreground ml-1">ER</span>
              </div>
              {creator.score && (
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-chart-1 text-chart-1" />
                  <span className="font-semibold">{creator.score}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="outline" className={statusColors[creator.status]}>
                {creator.status}
              </Badge>
              {creator.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {creator.tags.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{creator.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
