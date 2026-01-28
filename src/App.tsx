import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CampaignsProvider } from "@/contexts/CampaignsContext";
import Dashboard from "./pages/Dashboard";
import Creators from "./pages/Creators";
import LandingPageWizard from "./pages/LandingPageWizard";
import Collaborations from "./pages/Collaborations";
import CampaignPlanner from "./pages/CampaignPlanner";
import CampaignDetail from "./pages/CampaignDetail";
import NewCollaboration from "./pages/NewCollaboration";
import NewCampaign from "./pages/NewCampaign";
import Assets from "./pages/Assets";
import Analytics from "./pages/Analytics";
import Templates from "./pages/Templates";
import Automation from "./pages/Automation";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PortalAuth from "./pages/portal/PortalAuth";
import PortalDashboard from "./pages/portal/PortalDashboard";
import PortalTasks from "./pages/portal/PortalTasks";
import PortalLinks from "./pages/portal/PortalLinks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CampaignsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/creators" element={<Creators />} />
              <Route path="/creators/landing-page/new" element={<LandingPageWizard />} />
              <Route path="/collaborations" element={<Collaborations />} />
              <Route path="/collaborations/:id" element={<CampaignDetail />} />
              <Route path="/collaborations/new" element={<NewCollaboration />} />
              <Route path="/collaborations/planner" element={<CampaignPlanner />} />
              <Route path="/campaigns/new" element={<NewCampaign />} />
              <Route path="/campaigns/create" element={<NewCollaboration />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/automation" element={<Automation />} />
              <Route path="/settings" element={<Settings />} />
              {/* Creator Portal Routes */}
              <Route path="/portal/auth" element={<PortalAuth />} />
              <Route path="/portal" element={<PortalDashboard />} />
              <Route path="/portal/tasks" element={<PortalTasks />} />
              <Route path="/portal/links" element={<PortalLinks />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CampaignsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
