import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const advocateData = {
  impression: [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahjcreates",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      value: "2.4M",
      subValue: "impressions",
      progress: 92,
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@mikechen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      value: "1.8M",
      subValue: "impressions",
      progress: 78,
    },
    {
      id: 3,
      name: "Emily Davis",
      handle: "@emilyd",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      value: "1.2M",
      subValue: "impressions",
      progress: 65,
    },
    {
      id: 4,
      name: "Alex Rivera",
      handle: "@alexr",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      value: "890K",
      subValue: "impressions",
      progress: 48,
    },
  ],
  engagement: [
    {
      id: 1,
      name: "Emily Davis",
      handle: "@emilyd",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      value: "186K",
      subValue: "engagements",
      progress: 95,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      handle: "@sarahjcreates",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      value: "142K",
      subValue: "engagements",
      progress: 82,
    },
    {
      id: 3,
      name: "Alex Rivera",
      handle: "@alexr",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      value: "98K",
      subValue: "engagements",
      progress: 68,
    },
    {
      id: 4,
      name: "Mike Chen",
      handle: "@mikechen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      value: "76K",
      subValue: "engagements",
      progress: 52,
    },
  ],
};

const sellerData = {
  overall: [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahjcreates",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      value: "$12,450",
      subValue: "156 sales",
      progress: 92,
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@mikechen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      value: "$9,800",
      subValue: "124 sales",
      progress: 78,
    },
    {
      id: 3,
      name: "Emily Davis",
      handle: "@emilyd",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      value: "$7,650",
      subValue: "98 sales",
      progress: 65,
    },
    {
      id: 4,
      name: "Alex Rivera",
      handle: "@alexr",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      value: "$5,200",
      subValue: "67 sales",
      progress: 48,
    },
  ],
  affiliate: [
    {
      id: 1,
      name: "Mike Chen",
      handle: "@mikechen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      value: "$8,200",
      subValue: "102 conversions",
      progress: 88,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      handle: "@sarahjcreates",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      value: "$6,450",
      subValue: "86 conversions",
      progress: 72,
    },
    {
      id: 3,
      name: "Alex Rivera",
      handle: "@alexr",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      value: "$4,800",
      subValue: "58 conversions",
      progress: 58,
    },
    {
      id: 4,
      name: "Emily Davis",
      handle: "@emilyd",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      value: "$3,200",
      subValue: "42 conversions",
      progress: 42,
    },
  ],
  ads: [
    {
      id: 1,
      name: "Emily Davis",
      handle: "@emilyd",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      value: "$15,600",
      subValue: "4.2x ROAS",
      progress: 95,
    },
    {
      id: 2,
      name: "Alex Rivera",
      handle: "@alexr",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      value: "$11,200",
      subValue: "3.8x ROAS",
      progress: 78,
    },
    {
      id: 3,
      name: "Sarah Johnson",
      handle: "@sarahjcreates",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      value: "$8,900",
      subValue: "3.2x ROAS",
      progress: 62,
    },
    {
      id: 4,
      name: "Mike Chen",
      handle: "@mikechen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      value: "$6,400",
      subValue: "2.8x ROAS",
      progress: 48,
    },
  ],
};

interface CreatorItem {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  value: string;
  subValue: string;
  progress: number;
}

function CreatorList({ creators }: { creators: CreatorItem[] }) {
  return (
    <div className="space-y-4">
      {creators.map((creator, index) => (
        <div key={creator.id} className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground w-4">
            {index + 1}
          </span>
          <Avatar className="h-9 w-9">
            <AvatarImage src={creator.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {creator.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{creator.name}</p>
              <span className="text-sm font-semibold">{creator.value}</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={creator.progress} className="h-1.5 flex-1" />
              <span className="text-xs text-muted-foreground w-24 text-right">
                {creator.subValue}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TopCreators() {
  const [advocateMetric, setAdvocateMetric] = useState<"impression" | "engagement">("impression");
  const [sellerMetric, setSellerMetric] = useState<"overall" | "affiliate" | "ads">("overall");

  return (
    <Card>
      <Tabs defaultValue="advocate" className="w-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <TabsList variant="line" className="h-9">
              <TabsTrigger value="advocate" className="text-sm">Top Advocate</TabsTrigger>
              <TabsTrigger value="seller" className="text-sm">Top Seller</TabsTrigger>
            </TabsList>
            <Button variant="link" size="sm" asChild className="text-primary">
              <Link to="/creators">View More</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="advocate" className="mt-0 space-y-4">
            <Select
              value={advocateMetric}
              onValueChange={(value) => setAdvocateMetric(value as "impression" | "engagement")}
            >
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="impression">Impression</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
              </SelectContent>
            </Select>
            <CreatorList creators={advocateData[advocateMetric]} />
          </TabsContent>
          <TabsContent value="seller" className="mt-0 space-y-4">
            <Select
              value={sellerMetric}
              onValueChange={(value) => setSellerMetric(value as "overall" | "affiliate" | "ads")}
            >
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">Overall</SelectItem>
                <SelectItem value="affiliate">Top Affiliate</SelectItem>
                <SelectItem value="ads">Top Ads</SelectItem>
              </SelectContent>
            </Select>
            <CreatorList creators={sellerData[sellerMetric]} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
