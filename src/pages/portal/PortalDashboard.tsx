import { PortalLayout } from '@/components/portal/PortalLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCreatorData } from '@/hooks/useCreatorData';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { Loader2, ListTodo, CheckCircle2, Clock, Link2 } from 'lucide-react';

export default function PortalDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { creator, tasks, collaborations, salesLinks, promoCodes, loading } = useCreatorData();

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/portal/auth" replace />;
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle>No Creator Profile Found</CardTitle>
            <CardDescription>
              Your account isn't linked to a creator profile yet. Please contact the brand team to get started.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completedTasks = tasks.filter(t => t.status === 'completed' || t.status === 'approved').length;
  const activeCollabs = collaborations.filter(c => c.status === 'in_progress' || c.status === 'launched').length;

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {creator.display_name}!</h1>
          <p className="text-muted-foreground">Here's an overview of your collaborations</p>
        </div>

        {/* Stats grid */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <ListTodo className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingTasks}</p>
                  <p className="text-sm text-muted-foreground">Pending Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent">
                  <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedTasks}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Clock className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeCollabs}</p>
                  <p className="text-sm text-muted-foreground">Active Collabs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Link2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{salesLinks.length + promoCodes.length}</p>
                  <p className="text-sm text-muted-foreground">Links & Codes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Your Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/portal/tasks">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No tasks yet. You'll see your assignments here when you're added to a collaboration.
              </p>
            ) : (
              <div className="space-y-3">
                {tasks.slice(0, 5).map(task => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{task.title}</p>
                      {task.due_at && (
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(task.due_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={
                        task.status === 'completed' || task.status === 'approved'
                          ? 'default'
                          : task.status === 'in_progress'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active collaborations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Collaborations</CardTitle>
            <CardDescription>Your current brand partnerships</CardDescription>
          </CardHeader>
          <CardContent>
            {collaborations.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No active collaborations yet.
              </p>
            ) : (
              <div className="space-y-3">
                {collaborations.map(collab => (
                  <div
                    key={collab.id}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{collab.name}</p>
                        {collab.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {collab.description}
                          </p>
                        )}
                      </div>
                      <Badge>{collab.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
