import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  description?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  description,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(change || description) && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            {change && (
              <>
                {changeType === "positive" && (
                  <TrendingUpIcon sx={{ fontSize: 14 }} className="text-green-600" />
                )}
                {changeType === "negative" && (
                  <TrendingDownIcon sx={{ fontSize: 14 }} className="text-red-600" />
                )}
                <span
                  className={cn(
                    "font-medium",
                    changeType === "positive" && "text-green-600",
                    changeType === "negative" && "text-red-600"
                  )}
                >
                  {change}
                </span>
              </>
            )}
            {change && description && " "}
            <span>{description}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
