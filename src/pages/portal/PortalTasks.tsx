import { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreatorData } from '@/hooks/useCreatorData';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { Loader2, Upload, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PortalTasks() {
  const { user, loading: authLoading } = useAuth();
  const { creator, tasks, submissions, loading, createSubmission, updateTaskStatus, fetchComments, addComment } = useCreatorData();
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionDesc, setSubmissionDesc] = useState('');
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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
    return <Navigate to="/portal" replace />;
  }

  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress');
  const completedTasks = tasks.filter(t => t.status === 'completed' || t.status === 'approved');
  const needsRevision = tasks.filter(t => t.status === 'revision_requested');

  const handleOpenTask = async (taskId: string) => {
    setSelectedTask(taskId);
    setSubmissionTitle('');
    setSubmissionDesc('');
    setSubmissionUrl('');
    setNewComment('');
    setLoadingComments(true);

    try {
      const taskSubmissions = submissions.filter(s => s.task_id === taskId);
      if (taskSubmissions.length > 0) {
        const latestSubmission = taskSubmissions[taskSubmissions.length - 1];
        const fetchedComments = await fetchComments('submission', latestSubmission.id);
        setComments(fetchedComments);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }

    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!selectedTask) return;

    try {
      setSubmitting(true);
      await createSubmission(
        selectedTask,
        submissionTitle,
        submissionDesc,
        submissionUrl || undefined
      );
      await updateTaskStatus(selectedTask, 'submitted');
      toast({ title: 'Content submitted!', description: 'Your submission is now under review.' });
      setDialogOpen(false);
    } catch (err: any) {
      toast({ title: 'Submission failed', description: err.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddComment = async () => {
    if (!selectedTask || !newComment.trim()) return;

    const taskSubmissions = submissions.filter(s => s.task_id === selectedTask);
    if (taskSubmissions.length === 0) return;

    try {
      const latestSubmission = taskSubmissions[taskSubmissions.length - 1];
      const comment = await addComment('submission', latestSubmission.id, newComment);
      setComments(prev => [...prev, comment]);
      setNewComment('');
      toast({ title: 'Comment added' });
    } catch (err: any) {
      toast({ title: 'Failed to add comment', description: err.message, variant: 'destructive' });
    }
  };

  const getSelectedTask = () => tasks.find(t => t.id === selectedTask);
  const getTaskSubmissions = (taskId: string) => submissions.filter(s => s.task_id === taskId);

  const TaskCard = ({ task }: { task: typeof tasks[0] }) => {
    const taskSubmissions = getTaskSubmissions(task.id);
    const hasSubmission = taskSubmissions.length > 0;

    return (
      <div
        className="p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors cursor-pointer"
        onClick={() => handleOpenTask(task.id)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-medium">{task.title}</p>
            {task.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-2">
              {task.due_at && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(task.due_at).toLocaleDateString()}
                </span>
              )}
              {hasSubmission && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Upload className="h-3 w-3" />
                  {taskSubmissions.length} submission{taskSubmissions.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
          <Badge
            variant={
              task.status === 'approved' ? 'default' :
              task.status === 'completed' || task.status === 'submitted' ? 'secondary' :
              task.status === 'revision_requested' ? 'destructive' :
              'outline'
            }
          >
            {task.status.replace('_', ' ')}
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">View and complete your assigned tasks</p>
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingTasks.length})
            </TabsTrigger>
            <TabsTrigger value="revision" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Needs Revision ({needsRevision.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Completed ({completedTasks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            {pendingTasks.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No pending tasks</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {pendingTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="revision" className="mt-6">
            {needsRevision.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No tasks need revision</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {needsRevision.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {completedTasks.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No completed tasks yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {completedTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Task detail dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedTask && getSelectedTask() && (
              <>
                <DialogHeader>
                  <DialogTitle>{getSelectedTask()?.title}</DialogTitle>
                  <DialogDescription>
                    {getSelectedTask()?.description || 'No description provided'}
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="submit" className="mt-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="submit" className="flex-1">Submit Content</TabsTrigger>
                    <TabsTrigger value="feedback" className="flex-1">
                      Feedback ({comments.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="submit" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="submission-title">Title</Label>
                      <Input
                        id="submission-title"
                        placeholder="Give your submission a title"
                        value={submissionTitle}
                        onChange={e => setSubmissionTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="submission-desc">Description</Label>
                      <Textarea
                        id="submission-desc"
                        placeholder="Describe your content..."
                        value={submissionDesc}
                        onChange={e => setSubmissionDesc(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="submission-url">Content URL (optional)</Label>
                      <Input
                        id="submission-url"
                        placeholder="https://drive.google.com/..."
                        value={submissionUrl}
                        onChange={e => setSubmissionUrl(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Link to your content on Google Drive, Dropbox, or similar
                      </p>
                    </div>

                    <DialogFooter>
                      <Button 
                        onClick={handleSubmit} 
                        disabled={submitting || !submissionTitle.trim()}
                      >
                        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Content
                      </Button>
                    </DialogFooter>
                  </TabsContent>

                  <TabsContent value="feedback" className="mt-4">
                    {loadingComments ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : comments.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No feedback yet. Comments will appear here after review.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {comments.map(comment => (
                          <div key={comment.id} className="p-3 rounded-lg bg-muted">
                            <p className="text-sm">{comment.body}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(comment.created_at).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Textarea
                        placeholder="Add a reply..."
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        rows={2}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        size="sm"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PortalLayout>
  );
}
