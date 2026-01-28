import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { List, Share2, Bookmark, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Creator {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  followers: string;
  thumbnails: string[];
}

const creators: Creator[] = [
  {
    id: 1,
    name: "Sophia Martinez",
    handle: "sophiastyle",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    followers: "245K",
    thumbnails: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop",
    ],
  },
  {
    id: 2,
    name: "James Wilson",
    handle: "jameswcooks",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    followers: "1.2M",
    thumbnails: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=400&fit=crop",
    ],
  },
  {
    id: 3,
    name: "Mia Thompson",
    handle: "miafitness",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    followers: "890K",
    thumbnails: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=400&fit=crop",
    ],
  },
  {
    id: 4,
    name: "Lucas Brown",
    handle: "lucastech",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    followers: "567K",
    thumbnails: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=400&fit=crop",
    ],
  },
  {
    id: 5,
    name: "Emma Garcia",
    handle: "emmabeauty",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    followers: "1.5M",
    thumbnails: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=400&fit=crop",
    ],
  },
];

export function DiscoverCreators() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Discover Creators</CardTitle>
            <CardDescription>Recommended creators for your brand</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/creators" className="gap-1">
              More Creators
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            {creators.map((creator) => (
              <div
                key={creator.id}
                className="flex-shrink-0 w-[200px] rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
              >
                {/* 2x2 Thumbnail Grid */}
                <div className="grid grid-cols-2 gap-0.5 bg-muted">
                  {creator.thumbnails.map((thumbnail, idx) => (
                    <div key={idx} className="aspect-square overflow-hidden">
                      <img
                        src={thumbnail}
                        alt={`${creator.name} content ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Creator Info */}
                <div className="p-3 bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={creator.avatar} />
                      <AvatarFallback className="text-xs">
                        {creator.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{creator.name}</p>
                      <p className="text-xs text-muted-foreground truncate">@{creator.handle}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">{creator.followers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <List className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Share2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Bookmark className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
