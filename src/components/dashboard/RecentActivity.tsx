import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    creator: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    action: "submitted content",
    collaboration: "Summer Collection Launch",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    creator: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    action: "accepted invitation",
    collaboration: "Product Review Campaign",
    time: "4 hours ago",
    status: "accepted",
  },
  {
    id: 3,
    creator: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    action: "content approved",
    collaboration: "Holiday Promo",
    time: "6 hours ago",
    status: "approved",
  },
  {
    id: 4,
    creator: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    action: "generated 12 sales",
    collaboration: "New Year Campaign",
    time: "8 hours ago",
    status: "performing",
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-chart-3/20 text-foreground border-chart-3/30",
  accepted: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  approved: "bg-primary/10 text-primary border-primary/20",
  performing: "bg-chart-5/10 text-chart-5 border-chart-5/20",
};

export function RecentActivity() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your collaborations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {activity.creator.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.creator}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.collaboration}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="outline" className={statusColors[activity.status]}>
                  {activity.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
