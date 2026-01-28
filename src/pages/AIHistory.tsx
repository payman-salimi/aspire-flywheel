import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
}

const chatHistory: ChatHistoryItem[] = [
  {
    id: "1",
    title: "Identify top creators by ROI in last 90 days",
    timestamp: "2d",
  },
  {
    id: "2",
    title: "Create a Campaign for TikTok Shop project with $10K budget",
    timestamp: "5d",
  },
  {
    id: "3",
    title: "Request for Ads permission from TikTok Content with CPE less than $0.50",
    timestamp: "7d",
  },
  {
    id: "4",
    title: "Analyze creator engagement rates for fashion niche campaigns",
    timestamp: "12d",
  },
  {
    id: "5",
    title: "Generate performance report for Q4 creator collaborations",
    timestamp: "15d",
  },
  {
    id: "6",
    title: "Find creators with 100K+ followers in beauty and wellness categories",
    timestamp: "18d",
  },
  {
    id: "7",
    title: "Compare conversion rates across Instagram and TikTok campaigns",
    timestamp: "21d",
  },
  {
    id: "8",
    title: "Draft outreach message for micro-influencer partnership program",
    timestamp: "24d",
  },
  {
    id: "9",
    title: "Identify underperforming campaigns and suggest optimization strategies",
    timestamp: "27d",
  },
  {
    id: "10",
    title: "Calculate average content approval time by collaboration type",
    timestamp: "30d",
  },
  {
    id: "11",
    title: "Review creator applicants with engagement rate above 5%",
    timestamp: "33d",
  },
  {
    id: "12",
    title: "Generate content calendar for summer product launch campaign",
    timestamp: "36d",
  },
  {
    id: "13",
    title: "Analyze attribution data for creator-driven sales in last quarter",
    timestamp: "39d",
  },
  {
    id: "14",
    title: "Create brief for UGC content creators for new product line",
    timestamp: "42d",
  },
  {
    id: "15",
    title: "Compare CPM rates across different creator tier segments",
    timestamp: "45d",
  },
  {
    id: "16",
    title: "Find similar creators to top performers in fitness category",
    timestamp: "48d",
  },
  {
    id: "17",
    title: "Generate monthly performance summary for all active campaigns",
    timestamp: "51d",
  },
  {
    id: "18",
    title: "Identify creators with highest audience overlap with target demographic",
    timestamp: "54d",
  },
  {
    id: "19",
    title: "Optimize budget allocation across creator partnerships",
    timestamp: "57d",
  },
  {
    id: "20",
    title: "Track content submission deadlines and send reminders",
    timestamp: "60d",
  },
  {
    id: "21",
    title: "Analyze brand mention sentiment from creator content",
    timestamp: "63d",
  },
  {
    id: "22",
    title: "Generate A/B test variations for creator ad copy",
    timestamp: "66d",
  },
  {
    id: "23",
    title: "Review collaboration contracts expiring in next 30 days",
    timestamp: "69d",
  },
  {
    id: "24",
    title: "Calculate lifetime value of creator partnerships",
    timestamp: "72d",
  },
  {
    id: "25",
    title: "Identify best posting times based on creator audience analytics",
    timestamp: "75d",
  },
];

export default function AIHistory() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold">Recent chats</h1>
        </div>

        <div className="space-y-3">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              className="w-full flex items-center justify-between gap-4 p-4 rounded-lg bg-card border border-border hover:bg-muted/50 text-left transition-colors"
              onClick={() => {
                // Handle chat click - could navigate to the specific chat or load it
                console.log("Opening chat:", chat.id);
              }}
            >
              <span className="text-sm font-medium text-primary flex-1">
                {chat.title}
              </span>
              <span className="text-sm text-muted-foreground flex-shrink-0">
                {chat.timestamp}
              </span>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
