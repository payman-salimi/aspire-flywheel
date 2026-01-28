import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";

type TaskCategory = "applicant" | "content" | "product" | "brief";
type TimeFilter = "all" | "today" | "this_week" | "this_month";
type AssigneeFilter = "all" | "me";

interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  creator: string;
  avatar: string;
  collaboration: string;
  dueDate: string;
  assignedTo: string;
  priority: "high" | "medium" | "low";
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Review application",
    category: "applicant",
    creator: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    collaboration: "Summer Collection Launch",
    dueDate: "Today",
    assignedTo: "me",
    priority: "high",
  },
  {
    id: "2",
    title: "Approve video content",
    category: "content",
    creator: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    collaboration: "Product Review Campaign",
    dueDate: "Today",
    assignedTo: "me",
    priority: "high",
  },
  {
    id: "3",
    title: "Confirm product shipment",
    category: "product",
    creator: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    collaboration: "Holiday Promo",
    dueDate: "Tomorrow",
    assignedTo: "team",
    priority: "medium",
  },
  {
    id: "4",
    title: "Review creative brief",
    category: "brief",
    creator: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    collaboration: "New Year Campaign",
    dueDate: "This week",
    assignedTo: "me",
    priority: "medium",
  },
  {
    id: "5",
    title: "Review new applicant",
    category: "applicant",
    creator: "Jessica Kim",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    collaboration: "Spring Collection",
    dueDate: "This week",
    assignedTo: "team",
    priority: "low",
  },
  {
    id: "6",
    title: "Approve reel submission",
    category: "content",
    creator: "David Park",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    collaboration: "Summer Collection Launch",
    dueDate: "Today",
    assignedTo: "me",
    priority: "high",
  },
];

const categoryConfig: Record<TaskCategory, { label: string; icon: typeof PersonAddIcon; className: string }> = {
  applicant: { label: "Applicant Review", icon: PersonAddIcon, className: "bg-blue-100 text-blue-700 border-blue-200" },
  content: { label: "Content Review", icon: RateReviewIcon, className: "bg-purple-100 text-purple-700 border-purple-200" },
  product: { label: "Product Review", icon: InventoryIcon, className: "bg-amber-100 text-amber-700 border-amber-200" },
  brief: { label: "Brief Activities", icon: DescriptionIcon, className: "bg-green-100 text-green-700 border-green-200" },
};

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-gray-100 text-gray-700 border-gray-200",
};

export function TodoList() {
  const [category, setCategory] = useState<TaskCategory | "all">("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<AssigneeFilter>("all");

  const filteredTasks = tasks.filter((task) => {
    if (category !== "all" && task.category !== category) return false;
    if (assigneeFilter === "me" && task.assignedTo !== "me") return false;
    if (timeFilter === "today" && task.dueDate !== "Today") return false;
    if (timeFilter === "this_week" && !["Today", "Tomorrow", "This week"].includes(task.dueDate)) return false;
    return true;
  });

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {} as Record<TaskCategory, Task[]>);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My To-Do List</CardTitle>
            <CardDescription>Tasks requiring your attention</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={assigneeFilter} onValueChange={(v) => setAssigneeFilter(v as AssigneeFilter)}>
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="me">Assigned to Me</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as TimeFilter)}>
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={category} onValueChange={(v) => setCategory(v as TaskCategory | "all")}>
          <TabsList variant="line" className="mb-4 h-auto flex-wrap">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="applicant" className="text-xs">Applicants</TabsTrigger>
            <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
            <TabsTrigger value="product" className="text-xs">Product</TabsTrigger>
            <TabsTrigger value="brief" className="text-xs">Briefs</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[320px] pr-4">
            <div className="space-y-4">
              {category === "all" ? (
                Object.entries(groupedTasks).map(([cat, catTasks]) => {
                  const config = categoryConfig[cat as TaskCategory];
                  const CategoryIcon = config.icon;
                  return (
                    <div key={cat} className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <CategoryIcon sx={{ fontSize: 16 }} />
                        <span>{config.label}</span>
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {catTasks.length}
                        </Badge>
                      </div>
                      {catTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </div>
                  );
                })
              ) : (
                filteredTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))
              )}
              {filteredTasks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground">No tasks found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function TaskItem({ task }: { task: Task }) {
  const config = categoryConfig[task.category];
  const CategoryIcon = config.icon;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50">
      <Avatar className="h-9 w-9">
        <AvatarImage src={task.avatar} />
        <AvatarFallback className="bg-primary/10 text-primary text-xs">
          {task.creator.split(" ").map((n) => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{task.title}</p>
          <Badge variant="outline" className={`text-xs shrink-0 ${priorityColors[task.priority]}`}>
            {task.priority}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {task.creator} · {task.collaboration}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge variant="outline" className={`text-xs ${config.className}`}>
          <CategoryIcon sx={{ fontSize: 12 }} className="mr-1" />
          {task.dueDate}
        </Badge>
        <Button variant="ghost" size="sm" className="h-6 text-xs">
          Review
        </Button>
      </div>
    </div>
  );
}
