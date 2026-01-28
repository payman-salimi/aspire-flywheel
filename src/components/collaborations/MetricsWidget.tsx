import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, TrendingUp, DollarSign } from "lucide-react";

interface MetricBreakdown {
  label: string;
  value: string;
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  breakdown?: MetricBreakdown[];
}

function MetricCard({ title, value, icon, breakdown }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {breakdown && breakdown.length > 0 && (
          <div className="mt-3 space-y-1">
            {breakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MetricsWidget() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <MetricCard
        title="Total Members"
        value="128"
        icon={<Users className="h-4 w-4 text-primary" />}
      />

      <MetricCard
        title="Awareness"
        value="2.6M"
        icon={<Eye className="h-4 w-4 text-primary" />}
        breakdown={[
          { label: "Impressions", value: "2.4M" },
          { label: "Engagements", value: "186K" },
        ]}
      />

      <MetricCard
        title="TMV"
        value="$245K"
        icon={<TrendingUp className="h-4 w-4 text-primary" />}
        breakdown={[
          { label: "Organic", value: "$178K" },
          { label: "Paid", value: "$67K" },
        ]}
      />

      <MetricCard
        title="Avg ROI"
        value="3.2x"
        icon={<DollarSign className="h-4 w-4 text-primary" />}
        breakdown={[
          { label: "Ads", value: "4.1x" },
          { label: "Affiliate", value: "2.8x" },
        ]}
      />
    </div>
  );
}
