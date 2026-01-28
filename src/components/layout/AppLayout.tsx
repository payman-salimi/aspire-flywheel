import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { X } from "lucide-react";
import { AspireAIPanel } from "@/components/ai/AspireAIPanel";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function AppLayout({ children, title, description, actions }: AppLayoutProps) {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAIPage = location.pathname === "/automation";

  const handleAIButtonClick = () => {
    if (isAIPage) {
      navigate(-1); // Go back to previous page
    } else {
      setIsAIPanelOpen(true);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border bg-card px-6">
          <div className="flex items-center gap-2">
            {title && (
              <div>
                <h1 className="text-lg font-semibold">{title}</h1>
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleAIButtonClick}
                    className="relative"
                  >
                    {isAIPage ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <AutoAwesomeIcon sx={{ fontSize: 20 }} />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isAIPage ? "Close AI Agent" : "Let Aspire AI handle the heavy lifting."}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
      <AspireAIPanel open={isAIPanelOpen} onOpenChange={setIsAIPanelOpen} />
    </div>
  );
}
