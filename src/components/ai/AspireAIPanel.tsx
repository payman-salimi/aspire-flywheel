import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Maximize2,
  Send,
  BarChart3,
  Users,
  Image,
  CheckCircle2,
  MessageSquare,
  X,
} from "lucide-react";
import aspireLogo from "@/assets/aspire-logo.png";

interface AspireAIPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface RecentChat {
  id: string;
  title: string;
  timestamp: string;
}

const recentChats: RecentChat[] = [
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
];

const aiSuggestions = [
  {
    icon: BarChart3,
    label: "Create Campaign",
    description: "Set up a new creator campaign",
  },
  {
    icon: Users,
    label: "Find Top Performing Creators",
    description: "Discover high-engagement creators",
  },
  {
    icon: Image,
    label: "Create Ads from Top Performing Contents",
    description: "Turn successful content into ads",
  },
  {
    icon: CheckCircle2,
    label: "Automate Applicant Review",
    description: "Streamline creator applications",
  },
];

export function AspireAIPanel({ open, onOpenChange }: AspireAIPanelProps) {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");

  const handleExpand = () => {
    onOpenChange(false);
    navigate("/automation");
  };

  const handleSuggestionClick = (label: string) => {
    setQuestion(label);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      // Handle question submission
      console.log("Submitting question:", question);
      // You can add logic here to process the question
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[440px] sm:max-w-[440px] flex flex-col p-0" hideCloseButton>
        <SheetHeader className="px-6 py-4 border-b flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <img src={aspireLogo} alt="Aspire" className="h-6 w-6 rounded" />
            <SheetTitle className="text-base font-semibold">Aspire AI</SheetTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExpand}
              className="h-8 w-8"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="py-6 space-y-6">
            {/* Main Prompt Section */}
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <img src={aspireLogo} alt="Aspire" className="h-10 w-10 rounded" />
                </div>
              </div>
              <h2 className="text-lg font-semibold">
                How can I help you today?
              </h2>
              <p className="text-sm text-muted-foreground">
                Build something people want.
              </p>
            </div>

            {/* Question Input */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question / for commands"
                  className="pr-10 min-h-[100px] resize-none"
                  rows={4}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 bottom-1 h-8 w-8"
                  disabled={!question.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Aspire AI can make mistakes. Please double-check responses.
              </p>
            </form>

            <Separator />

            {/* Try Aspire AI for... */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-center">
                Try Aspire AI for...
              </h3>
              <TooltipProvider>
                <div className="grid grid-cols-2 gap-2">
                  {aiSuggestions.map((suggestion) => (
                    <Tooltip key={suggestion.label}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-auto py-3 px-3 flex items-start gap-2 text-left hover:bg-muted/50 justify-start"
                          onClick={() => handleSuggestionClick(suggestion.label)}
                        >
                          <suggestion.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span className="text-xs font-medium leading-tight truncate">
                            {suggestion.label}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-[200px]">
                        <p className="text-xs">{suggestion.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>

            <Separator />

            {/* Recent Chats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Recent chats</h3>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs"
                  onClick={() => {
                    onOpenChange(false);
                    navigate("/automation/history");
                  }}
                >
                  View all
                </Button>
              </div>
              <div className="space-y-2">
                {recentChats.map((chat) => (
                  <button
                    key={chat.id}
                    className="w-full flex items-start justify-between gap-3 p-3 rounded-lg hover:bg-muted/50 text-left transition-colors"
                  >
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <span className="text-sm leading-tight line-clamp-2">
                        {chat.title}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {chat.timestamp}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
