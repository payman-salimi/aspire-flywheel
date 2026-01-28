import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Zap, Clock, Mail, Bell, ArrowRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const automationRules = [
  {
    id: "1",
    name: "Task Due Reminder",
    description: "Send reminder to creators 24 hours before task deadline",
    trigger: "Time-based",
    triggerIcon: Clock,
    action: "Send notification",
    enabled: true,
    executionCount: 156,
  },
  {
    id: "2",
    name: "Submission Review Assignment",
    description: "Automatically assign submissions to reviewers based on collaboration type",
    trigger: "Submission received",
    triggerIcon: Mail,
    action: "Assign reviewer",
    enabled: true,
    executionCount: 89,
  },
  {
    id: "3",
    name: "Approval Notification",
    description: "Notify creator when their content is approved",
    trigger: "Content approved",
    triggerIcon: Bell,
    action: "Send email",
    enabled: true,
    executionCount: 234,
  },
  {
    id: "4",
    name: "Overdue Task Escalation",
    description: "Escalate overdue tasks to team lead after 48 hours",
    trigger: "Task overdue",
    triggerIcon: Clock,
    action: "Escalate",
    enabled: false,
    executionCount: 12,
  },
];

export default function Automation() {
  return (
    <AppLayout
      title="Automation"
      description="Manage automation rules and workflows"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Rule
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {automationRules.filter((r) => r.enabled).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Executions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {automationRules.reduce((sum, r) => sum + r.executionCount, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Time Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47h</div>
            </CardContent>
          </Card>
        </div>

        {/* Rules List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Automation Rules</h2>
          <div className="space-y-4">
            {automationRules.map((rule) => (
              <Card key={rule.id} className="group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{rule.name}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {rule.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={rule.enabled} />
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
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View History</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2 text-sm">
                          <rule.triggerIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{rule.trigger}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="secondary">{rule.action}</Badge>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {rule.executionCount} executions
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Create New Rule CTA */}
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">Create a new automation rule</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Automate repetitive tasks like reminders, assignments, and notifications
            </p>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create Rule
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
