import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Users, MessageCircle, Plus, List } from "lucide-react";

interface CreatorGridCardProps {
  creator: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    platform: "instagram" | "youtube" | "tiktok";
    followers: number;
    engagementRate: number;
    bio?: string;
    images?: string[];
  };
  onAddToList?: () => void;
  onViewDetails?: () => void;
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

function formatFollowers(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return count.toString();
}

function formatEngagement(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return count.toString();
}

export function CreatorGridCard({ creator, onAddToList, onViewDetails }: CreatorGridCardProps) {
  const PlatformIcon = platformIcons[creator.platform];
  
  // Generate placeholder images for the grid
  const gridImages = creator.images || [
    `https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=200&fit=crop`,
    `https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=200&fit=crop`,
    `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop`,
    `https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=200&fit=crop`,
  ];

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-0.5 bg-muted">
          {gridImages.slice(0, 4).map((img, idx) => (
            <div key={idx} className="aspect-square overflow-hidden">
              <img 
                src={img} 
                alt={`Content ${idx + 1}`}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        
        {/* Creator Info */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
              <AvatarImage src={creator.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {creator.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-sm truncate">{creator.handle}</h3>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <PlatformIcon className="h-3.5 w-3.5" />
                <span className="text-xs truncate">{creator.bio || creator.name}</span>
              </div>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{formatFollowers(creator.followers)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{formatEngagement(Math.round(creator.followers * (creator.engagementRate / 100)))}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={onViewDetails}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={onAddToList}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
