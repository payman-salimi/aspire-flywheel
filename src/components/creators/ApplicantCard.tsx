import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Instagram, Youtube, Users, MessageCircle, StickyNote, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type ApplicantStatus = "pending" | "yes" | "no" | "maybe";

interface ApplicantCardProps {
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
  status: ApplicantStatus;
  note?: string;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  onStatusChange: (status: ApplicantStatus) => void;
  onNoteChange: (note: string) => void;
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

export function ApplicantCard({ creator, status, note, selected, onSelect, onStatusChange, onNoteChange }: ApplicantCardProps) {
  const PlatformIcon = platformIcons[creator.platform];
  const [noteText, setNoteText] = useState(note || "");
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  
  const gridImages = creator.images || [
    `https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=200&fit=crop`,
    `https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=200&fit=crop`,
    `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop`,
    `https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=200&fit=crop`,
  ];

  const handleSaveNote = () => {
    onNoteChange(noteText);
    setIsNoteOpen(false);
  };

  const statusBorderColors: Record<ApplicantStatus, string> = {
    pending: "border-border",
    yes: "border-primary ring-2 ring-primary/20",
    no: "border-destructive ring-2 ring-destructive/20",
    maybe: "border-chart-2 ring-2 ring-chart-2/20",
  };

  return (
    <Card className={cn("group overflow-hidden transition-all hover:shadow-lg", statusBorderColors[status], selected && "ring-2 ring-foreground/50")}>
      <CardContent className="p-0">
        {/* Image Grid with Checkbox */}
        <div className="relative grid grid-cols-2 gap-0.5 bg-muted">
          {/* Selection Checkbox */}
          {onSelect && (
            <div className="absolute top-2 left-2 z-10">
              <Checkbox
                checked={selected}
                onCheckedChange={(checked) => onSelect(checked === true)}
                className="h-5 w-5 border-2 border-background bg-background/80 data-[state=checked]:bg-primary data-[state=checked]:border-primary shadow-sm"
              />
            </div>
          )}
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
            {/* Note Button */}
            <Popover open={isNoteOpen} onOpenChange={setIsNoteOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("h-8 w-8 shrink-0", note && "text-primary")}
                >
                  <StickyNote className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-popover border shadow-lg z-50" align="end">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">Add Note</h4>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsNoteOpen(false)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Add a note about this applicant..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="min-h-[80px] resize-none"
                    maxLength={500}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsNoteOpen(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveNote}>
                      Save
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Note Preview */}
          {note && (
            <div className="mt-2 p-2 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground line-clamp-2">{note}</p>
            </div>
          )}
          
          {/* Stats Row */}
          <div className="flex items-center gap-4 text-sm mt-3">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{formatFollowers(creator.followers)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{formatEngagement(Math.round(creator.followers * (creator.engagementRate / 100)))}</span>
            </div>
          </div>
          
          {/* Yes/No/Maybe Buttons */}
          <div className="flex items-center gap-2 mt-4">
            <Button 
              variant={status === "yes" ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex-1",
                status === "yes" && "bg-primary hover:bg-primary/90"
              )}
              onClick={() => onStatusChange("yes")}
            >
              Yes
            </Button>
            <Button 
              variant={status === "maybe" ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex-1",
                status === "maybe" && "bg-chart-2 hover:bg-chart-2/90 text-chart-2-foreground"
              )}
              onClick={() => onStatusChange("maybe")}
            >
              Maybe
            </Button>
            <Button 
              variant={status === "no" ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex-1",
                status === "no" && "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              )}
              onClick={() => onStatusChange("no")}
            >
              No
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
