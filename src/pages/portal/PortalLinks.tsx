import { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCreatorData } from '@/hooks/useCreatorData';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { Loader2, Copy, ExternalLink, Link2, Tag, MousePointerClick, CheckCircle2 } from 'lucide-react';

export default function PortalLinks() {
  const { user, loading: authLoading } = useAuth();
  const { creator, salesLinks, promoCodes, loading } = useCreatorData();
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  const copyToClipboard = async (text: string, id: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast({ title: `${label} copied!` });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({ title: 'Failed to copy', variant: 'destructive' });
    }
  };

  const baseUrl = window.location.origin;

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Links & Promo Codes</h1>
          <p className="text-muted-foreground">Your tracking links and discount codes to share</p>
        </div>

        {/* Sales Links */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Your Links</CardTitle>
            </div>
            <CardDescription>
              Share these links with your audience to track clicks and sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            {salesLinks.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No tracking links yet. Links will appear here when assigned to your collaborations.
              </p>
            ) : (
              <div className="space-y-4">
                {salesLinks.map(link => {
                  const fullUrl = `${baseUrl}/go/${link.slug}`;
                  const isCopied = copiedId === `link-${link.id}`;
                  
                  return (
                    <div
                      key={link.id}
                      className="p-4 rounded-lg border bg-card"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <code className="text-sm bg-muted px-2 py-1 rounded truncate max-w-full">
                              {fullUrl}
                            </code>
                            {!link.is_active && (
                              <Badge variant="secondary">Inactive</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MousePointerClick className="h-3 w-3" />
                              {link.clicks} clicks
                            </span>
                            <a
                              href={link.destination_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-foreground transition-colors"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View destination
                            </a>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(fullUrl, `link-${link.id}`, 'Link')}
                          className="shrink-0"
                        >
                          {isCopied ? (
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 mr-2" />
                          )}
                          {isCopied ? 'Copied!' : 'Copy Link'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Promo Codes */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Promo Codes</CardTitle>
            </div>
            <CardDescription>
              Discount codes for your audience to use at checkout
            </CardDescription>
          </CardHeader>
          <CardContent>
            {promoCodes.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No promo codes yet. Codes will appear here when assigned to your collaborations.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {promoCodes.map(code => {
                  const isCopied = copiedId === `code-${code.id}`;
                  
                  return (
                    <div
                      key={code.id}
                      className="p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <code className="text-lg font-bold bg-primary/10 text-primary px-3 py-1 rounded">
                              {code.code}
                            </code>
                            <Badge
                              variant={code.status === 'active' ? 'default' : 'secondary'}
                            >
                              {code.status}
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <p>
                              {code.discount_type === 'percentage'
                                ? `${code.discount_value}% off`
                                : `$${code.discount_value} off`}
                            </p>
                            <p>{code.uses} uses</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(code.code, `code-${code.id}`, 'Code')}
                        >
                          {isCopied ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">Tips for sharing</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Include your tracking link in your bio or swipe-up stories</li>
              <li>Mention your promo code verbally in videos for better recall</li>
              <li>Share both link and code in your captions for maximum coverage</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
