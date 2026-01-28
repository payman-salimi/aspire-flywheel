import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Play,
  CheckCircle2,
  Clock,
  Shield,
  StickyNote,
  Megaphone,
  Eye,
  Folder,
  Users,
  Calendar,
  Lock,
  MoreHorizontal,
} from "lucide-react";

export interface ContentAsset {
  id: string;
  name: string;
  type: "video" | "image";
  creator: string;
  creatorUsername?: string;
  creatorAvatar?: string;
  collaboration: string;
  status: "approved" | "pending";
  readyForAds: boolean;
  rights: { scope: string; duration: string } | null;
  thumbnail: string;
  isMyContent?: boolean;
  note?: string;
  views?: number;
  project?: string;
  group?: string;
  date?: string;
}

interface ContentCardProps {
  asset: ContentAsset;
  variant?: "all" | "ready" | "pending";
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onNoteChange?: (id: string, note: string) => void;
  onCreateAd?: (id: string) => void;
}

const statusConfig = {
  approved: { label: "Approved", className: "bg-primary/10 text-primary border-primary/20", icon: CheckCircle2 },
  pending: { label: "Pending", className: "bg-chart-3/20 text-foreground border-chart-3/30", icon: Clock },
};

export function ContentCard({
  asset,
  variant = "all",
  onApprove,
  onReject,
  onNoteChange,
  onCreateAd,
}: ContentCardProps) {
  const [note, setNote] = useState(asset.note || "");
  const [noteOpen, setNoteOpen] = useState(false);
  const status = statusConfig[asset.status];
  const StatusIcon = status.icon;

  const handleSaveNote = () => {
    onNoteChange?.(asset.id, note);
    setNoteOpen(false);
  };

  return (
    <Card className="group overflow-hidden rounded-2xl">
      {/* Profile Header */}
      <div className="relative">
        {/* Content Image/Video */}
        <div className="relative aspect-[3/4] bg-muted overflow-hidden">
          <img
            src={asset.thumbnail}
            alt={asset.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Header Overlay */}
          <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={asset.creatorAvatar} />
                    <AvatarFallback className="text-xs">
                      {asset.creator.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-white text-sm font-medium">
                  {asset.creatorUsername || asset.creator.toLowerCase().replace(' ', '_')}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Video Play Button */}
          {asset.type === "video" && (
            <div className="absolute bottom-3 left-3">
              <div className="rounded-full bg-black/60 backdrop-blur-sm p-2">
                <Play className="h-4 w-4 text-white fill-white" />
              </div>
            </div>
          )}

          {/* Bottom Metadata Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
            <div className="space-y-1.5 text-white text-xs">
              {/* Views */}
              <div className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                <span>{asset.views || 0}</span>
              </div>

              {/* Project */}
              <div className="flex items-center gap-1.5">
                <Folder className="h-3.5 w-3.5" />
                <span className="truncate">{asset.project || "No project assigned"}</span>
              </div>

              {/* Group */}
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span className="truncate">{asset.group || "No group"}</span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{asset.date || "No date"}</span>
              </div>

              {/* Rights */}
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                <span>{asset.rights ? `${asset.rights.scope} · ${asset.rights.duration}` : "None"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons for Pending/Ready variants */}
      {variant === "pending" && (
        <CardContent className="p-3">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1"
                onClick={() => onApprove?.(asset.id)}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => onReject?.(asset.id)}
              >
                Reject
              </Button>
            </div>
            <Popover open={noteOpen} onOpenChange={setNoteOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full ${note ? "text-primary" : ""}`}
                >
                  <StickyNote className="mr-1 h-3 w-3" />
                  {note ? "View Note" : "Add Note"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-popover" align="start">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Review Note</h4>
                  <Textarea
                    placeholder="Add a note about this content..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setNoteOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveNote}>
                      Save Note
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      )}

      {variant === "ready" && (
        <CardContent className="p-3">
          <Button
            size="sm"
            className="w-full"
            onClick={() => onCreateAd?.(asset.id)}
          >
            <Megaphone className="mr-1 h-3 w-3" />
            Create Ad
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
