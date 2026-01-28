import { createContext, useContext, useState, ReactNode } from "react";

export interface Campaign {
  id: string;
  name: string;
  status: "active" | "draft" | "completed" | "archived";
  startDate: string;
  endDate: string;
  memberCount: number;
  members: { id: string; name: string; avatar?: string }[];
  tasksCompleted: number;
  totalTasks: number;
  template: string;
  brief?: string;
  budget?: string;
  goal?: string;
  product?: string;
  affiliateOffer?: string;
}

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Collection Launch",
    status: "active",
    startDate: "Jan 15, 2026",
    endDate: "Feb 15, 2026",
    memberCount: 5,
    members: [
      { id: "1", name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
      { id: "2", name: "Mike Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      { id: "3", name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
      { id: "5", name: "Jessica Kim", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
      { id: "8", name: "Tom Baker", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
    ],
    tasksCompleted: 12,
    totalTasks: 20,
    template: "Creator Content for Ads",
    brief: "Create engaging content showcasing our new summer collection. Focus on lifestyle imagery and authentic reviews.",
    budget: "$15,000",
    goal: "Achieve 500K impressions and 50K engagements",
    product: "Summer Collection 2026",
    affiliateOffer: "15% commission + free product samples",
  },
  {
    id: "2",
    name: "Product Review Campaign",
    status: "active",
    startDate: "Jan 20, 2026",
    endDate: "Feb 20, 2026",
    memberCount: 3,
    members: [
      { id: "6", name: "David Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
      { id: "7", name: "Lisa Wong", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
      { id: "2", name: "Mike Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    ],
    tasksCompleted: 5,
    totalTasks: 12,
    template: "Product Launch",
    brief: "Honest product reviews highlighting key features and benefits.",
    budget: "$8,000",
    goal: "Generate 100 authentic product reviews across social platforms",
    product: "New Product Line",
    affiliateOffer: "20% commission on sales + exclusive early access",
  },
  {
    id: "3",
    name: "Holiday Promo 2025",
    status: "completed",
    startDate: "Dec 1, 2025",
    endDate: "Dec 31, 2025",
    memberCount: 4,
    members: [
      { id: "1", name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
      { id: "3", name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
      { id: "5", name: "Jessica Kim", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
      { id: "4", name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    ],
    tasksCompleted: 16,
    totalTasks: 16,
    template: "Promotion",
    brief: "Holiday promotional content with festive themes.",
    budget: "$12,000",
    goal: "Drive $50,000 in holiday sales",
    product: "Holiday Gift Collection",
    affiliateOffer: "25% holiday bonus commission + gift bundle",
  },
];

interface CampaignsContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  getCampaignById: (id: string) => Campaign | undefined;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  archiveCampaign: (id: string) => void;
  unarchiveCampaign: (id: string) => void;
}

const CampaignsContext = createContext<CampaignsContextType | undefined>(undefined);

export function CampaignsProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const addCampaign = (campaign: Campaign) => {
    setCampaigns((prev) => [campaign, ...prev]);
  };

  const getCampaignById = (id: string) => {
    return campaigns.find((c) => c.id === id);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === id ? { ...campaign, ...updates } : campaign
      )
    );
  };

  const archiveCampaign = (id: string) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === id ? { ...campaign, status: "archived" as const } : campaign
      )
    );
  };

  const unarchiveCampaign = (id: string) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === id ? { ...campaign, status: "active" as const } : campaign
      )
    );
  };

  return (
    <CampaignsContext.Provider value={{ campaigns, addCampaign, getCampaignById, updateCampaign, archiveCampaign, unarchiveCampaign }}>
      {children}
    </CampaignsContext.Provider>
  );
}

export function useCampaigns() {
  const context = useContext(CampaignsContext);
  if (context === undefined) {
    throw new Error("useCampaigns must be used within a CampaignsProvider");
  }
  return context;
}
