import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { CreatorGridCard } from "@/components/creators/CreatorGridCard";
import { CreatorCard } from "@/components/creators/CreatorCard";
import { ApplicantCard, ApplicantStatus } from "@/components/creators/ApplicantCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Grid, List, Share2, Sparkles, CheckCircle2, XCircle, HelpCircle, X, ChevronDown, Bookmark, Plus } from "lucide-react";
import { toast } from "sonner";

type Platform = "instagram" | "youtube" | "tiktok";
type CreatorStatus = "active" | "invited" | "inactive";

interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  platform: Platform;
  followers: number;
  engagementRate: number;
  bio: string;
  tags: string[];
  status: CreatorStatus;
  score: number;
  images: string[];
}

interface ApplicantData {
  creator: Creator;
  status: ApplicantStatus;
  note?: string;
}

const discoverCreators: Creator[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    handle: "@sarahjcreates",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    platform: "instagram",
    followers: 125000,
    engagementRate: 4.2,
    bio: "Lifestyle & Fashion Creator",
    tags: ["lifestyle", "fashion", "wellness"],
    status: "active",
    score: 92,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1485968579169-20211e9edee0?w=200&h=200&fit=crop",
    ],
  },
  {
    id: "2",
    name: "Mike Chen",
    handle: "@mikecheneats",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    platform: "youtube",
    followers: 890000,
    engagementRate: 6.8,
    bio: "Food & Travel Vlogger",
    tags: ["food", "travel", "vlog"],
    status: "active",
    score: 88,
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop",
    ],
  },
  {
    id: "3",
    name: "Emily Davis",
    handle: "@emilydstyle",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    platform: "tiktok",
    followers: 2100000,
    engagementRate: 8.1,
    bio: "Fashion & Beauty Hauls",
    tags: ["fashion", "beauty", "hauls"],
    status: "invited",
    score: 95,
    images: [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1583241475880-083f84372725?w=200&h=200&fit=crop",
    ],
  },
  {
    id: "4",
    name: "Alex Rivera",
    handle: "@alexfitness",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    platform: "instagram",
    followers: 450000,
    engagementRate: 5.3,
    bio: "Fitness & Health Coach",
    tags: ["fitness", "health", "motivation"],
    status: "active",
    score: 85,
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop",
    ],
  },
  {
    id: "5",
    name: "Jessica Kim",
    handle: "@jessibeauty",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    platform: "youtube",
    followers: 678000,
    engagementRate: 4.9,
    bio: "Beauty & Skincare Tutorials",
    tags: ["beauty", "skincare", "tutorials"],
    status: "active",
    score: 78,
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1522338242042-2d1c93f6c6c2?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=200&fit=crop",
    ],
  },
  {
    id: "6",
    name: "David Park",
    handle: "@davidtech",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    platform: "tiktok",
    followers: 1500000,
    engagementRate: 7.2,
    bio: "Tech & Gadget Reviews",
    tags: ["tech", "gadgets", "reviews"],
    status: "active",
    score: 90,
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&h=200&fit=crop",
    ],
  },
];

const shortlistCreators: Creator[] = [
  {
    id: "s1",
    name: "Olivia Martinez",
    handle: "@oliviabeauty",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    platform: "instagram",
    followers: 320000,
    engagementRate: 5.8,
    bio: "Clean Beauty Advocate",
    tags: ["beauty", "skincare", "sustainable"],
    status: "active",
    score: 91,
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1522338242042-2d1c93f6c6c2?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=200&fit=crop",
    ],
  },
  {
    id: "s2",
    name: "James Wilson",
    handle: "@jameswfitness",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    platform: "youtube",
    followers: 560000,
    engagementRate: 6.2,
    bio: "Wellness & Lifestyle",
    tags: ["fitness", "wellness", "lifestyle"],
    status: "active",
    score: 87,
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop",
    ],
  },
];

const initialApplicants: ApplicantData[] = [
  {
    creator: {
      id: "a1",
      name: "Sophie Chen",
      handle: "@sophiestyle",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      platform: "tiktok",
      followers: 89000,
      engagementRate: 9.2,
      bio: "Emerging Fashion Creator",
      tags: ["fashion", "style", "ootd"],
      status: "invited",
      score: 82,
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1485968579169-20211e9edee0?w=200&h=200&fit=crop",
      ],
    },
    status: "pending",
  },
  {
    creator: {
      id: "a2",
      name: "Marcus Brown",
      handle: "@marcusfood",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face",
      platform: "instagram",
      followers: 45000,
      engagementRate: 7.8,
      bio: "Home Chef & Food Blogger",
      tags: ["food", "cooking", "recipes"],
      status: "invited",
      score: 76,
      images: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop",
      ],
    },
    status: "yes",
    note: "Great engagement rate, perfect fit for our food campaign",
  },
  {
    creator: {
      id: "a3",
      name: "Luna Park",
      handle: "@lunalifestyle",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
      platform: "youtube",
      followers: 125000,
      engagementRate: 6.5,
      bio: "Lifestyle & Wellness",
      tags: ["lifestyle", "wellness", "vlog"],
      status: "invited",
      score: 84,
      images: [
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop",
      ],
    },
    status: "maybe",
    note: "Good content quality, need to discuss rates",
  },
  {
    creator: {
      id: "a4",
      name: "Tyler Adams",
      handle: "@tyleradams",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
      platform: "tiktok",
      followers: 230000,
      engagementRate: 8.5,
      bio: "Comedy & Lifestyle",
      tags: ["comedy", "lifestyle", "entertainment"],
      status: "invited",
      score: 88,
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      ],
    },
    status: "no",
    note: "Content style doesn't match our brand guidelines",
  },
];

export default function Creators() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("discover");
  const [applicants, setApplicants] = useState<ApplicantData[]>(initialApplicants);
  const [applicantFilter, setApplicantFilter] = useState<"all" | ApplicantStatus>("all");
  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(new Set());

  // Discover tab filter states
  const [savedFilter, setSavedFilter] = useState("all");
  const [networkFilter, setNetworkFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // Applicants tab filter states
  const [applicantSavedFilter, setApplicantSavedFilter] = useState("all");
  const [applicantNetworkFilter, setApplicantNetworkFilter] = useState("all");
  const [decisionFilter, setDecisionFilter] = useState("all");
  const [applicantLocationFilter, setApplicantLocationFilter] = useState("all");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!", {
      description: "Share this link to let others view your applicants",
    });
  };

  const handleCreateLandingPage = () => {
    navigate("/creators/landing-page/new");
  };

  const handleApplicantStatusChange = (applicantId: string, newStatus: ApplicantStatus) => {
    setApplicants(prev => 
      prev.map(a => 
        a.creator.id === applicantId ? { ...a, status: newStatus } : a
      )
    );
    const statusLabels = { yes: "Yes", no: "No", maybe: "Maybe", pending: "Pending" };
    toast.success(`Marked as ${statusLabels[newStatus]}`);
  };

  const handleApplicantNoteChange = (applicantId: string, note: string) => {
    setApplicants(prev => 
      prev.map(a => 
        a.creator.id === applicantId ? { ...a, note } : a
      )
    );
    toast.success("Note saved");
  };

  const handleSelectApplicant = (applicantId: string, selected: boolean) => {
    setSelectedApplicants(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(applicantId);
      } else {
        newSet.delete(applicantId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedApplicants(new Set(filteredApplicants.map(a => a.creator.id)));
    } else {
      setSelectedApplicants(new Set());
    }
  };

  const handleBulkStatusChange = (newStatus: ApplicantStatus) => {
    if (selectedApplicants.size === 0) return;
    
    setApplicants(prev => 
      prev.map(a => 
        selectedApplicants.has(a.creator.id) ? { ...a, status: newStatus } : a
      )
    );
    const statusLabels = { yes: "Yes", no: "No", maybe: "Maybe", pending: "Pending" };
    toast.success(`${selectedApplicants.size} applicant${selectedApplicants.size > 1 ? "s" : ""} marked as ${statusLabels[newStatus]}`);
    setSelectedApplicants(new Set());
  };

  const clearSelection = () => {
    setSelectedApplicants(new Set());
  };

  const filterCreators = (creators: Creator[]) => {
    if (!searchQuery) return creators;
    return creators.filter(
      (creator) =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filteredApplicants = applicants.filter(a => {
    if (decisionFilter === "all") return true;
    return a.status === decisionFilter;
  });

  const applicantCounts = {
    all: applicants.length,
    yes: applicants.filter(a => a.status === "yes").length,
    no: applicants.filter(a => a.status === "no").length,
    maybe: applicants.filter(a => a.status === "maybe").length,
    pending: applicants.filter(a => a.status === "pending").length,
  };

  const renderCreatorGrid = (creators: Creator[]) => {
    const filtered = filterCreators(creators);
    
    if (filtered.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No creators found</p>
          <Button variant="link" className="mt-2" onClick={() => setSearchQuery("")}>
            Clear search
          </Button>
        </div>
      );
    }

    if (view === "grid") {
      return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((creator) => (
            <CreatorGridCard 
              key={creator.id} 
              creator={creator}
              onAddToList={() => toast.success(`Added ${creator.name} to shortlist`)}
              onViewDetails={() => toast.info(`View details for ${creator.name}`)}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <AppLayout
        title="Recruit"
        description="Discover and manage your creator relationships"
        tabs={
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger
              value="discover"
              className="data-[state=active]:bg-white data-[state=active]:text-primary text-white/80 hover:text-white"
            >
              Discover
            </TabsTrigger>
            <TabsTrigger
              value="applicant"
              className="data-[state=active]:bg-white data-[state=active]:text-primary text-white/80 hover:text-white"
            >
              Applicants
            </TabsTrigger>
          </TabsList>
        }
      >
        <div className="space-y-6">
          <TabsContent value="discover" className="mt-6">
            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b mb-6">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <Bookmark className="mr-2 h-3.5 w-3.5" />
                      Saved Filter
                      <ChevronDown className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setSavedFilter("all")}>
                      All Creators
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSavedFilter("beauty-creators")}>
                      Beauty Creators
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSavedFilter("mention-listening")}>
                      Mention Listening
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSavedFilter("customers")}>
                      Customers
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      Network
                      <ChevronDown className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setNetworkFilter("all")}>
                      All Networks
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setNetworkFilter("instagram")}>
                      Instagram
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setNetworkFilter("youtube")}>
                      YouTube
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setNetworkFilter("tiktok")}>
                      TikTok
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      Industry
                      <ChevronDown className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setIndustryFilter("all")}>
                      All Industries
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIndustryFilter("fashion")}>
                      Fashion
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIndustryFilter("beauty")}>
                      Beauty
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIndustryFilter("lifestyle")}>
                      Lifestyle
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIndustryFilter("fitness")}>
                      Fitness
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      Locations
                      <ChevronDown className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setLocationFilter("all")}>
                      All Locations
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLocationFilter("north-america")}>
                      North America
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLocationFilter("europe")}>
                      Europe
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLocationFilter("asia")}>
                      Asia
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLocationFilter("other")}>
                      Other
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" size="sm" className="h-8">
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Add Filter
                </Button>
              </div>

              <Button variant="outline" size="sm" className="h-8">
                Save Filter
              </Button>
            </div>

            {/* View Toggle */}
            <div className="flex justify-end mb-6">
              <div className="flex border rounded-md">
                <Button
                  variant={view === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setView("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {renderCreatorGrid(discoverCreators)}
          </TabsContent>

          <TabsContent value="applicant" className="mt-6">
            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b mb-6">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <Bookmark className="mr-2 h-3.5 w-3.5" />
                      Saved Filter
                      <ChevronDown className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setApplicantSavedFilter("all")}>
                      All Applicants
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setApplicantSavedFilter("approved")}>
                      Approved
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setApplicantSavedFilter("under-review")}>
                      Under Review
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setApplicantSavedFilter("rejected")}>
                      Rejected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      Network
                      <ChevronDown className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setApplicantNetworkFilter("all")}>
                      All Networks
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setApplicantNetworkFilter("instagram")}>
                      Instagram
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setApplicantNetworkFilter("youtube")}>
                      YouTube
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setApplicantNetworkFilter("tiktok")}>
                      TikTok
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      Decision
                      <ChevronDown className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setDecisionFilter("all")}>
                      All Decisions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDecisionFilter("yes")}>
                      Yes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDecisionFilter("no")}>
                      No
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDecisionFilter("pending")}>
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDecisionFilter("maybe")}>
                      Maybe
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      Locations
                      <ChevronDown className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setApplicantLocationFilter("all")}>
                      All Locations
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setApplicantLocationFilter("north-america")}>
                      North America
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setApplicantLocationFilter("europe")}>
                      Europe
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setApplicantLocationFilter("asia")}>
                      Asia
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setApplicantLocationFilter("other")}>
                      Other
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" size="sm" className="h-8">
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Add Filter
                </Button>
              </div>

              <Button variant="outline" size="sm" className="h-8">
                Save Filter
              </Button>
            </div>

            {/* Bulk Actions Bar */}
            {selectedApplicants.size > 0 && (
              <div className="mb-4 flex items-center justify-between rounded-lg border bg-muted/50 p-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    {selectedApplicants.size} selected
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearSelection}>
                    <X className="mr-1 h-4 w-4" />
                    Clear
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleBulkStatusChange("yes")}
                  >
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Yes
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-chart-2 text-chart-2 hover:bg-chart-2 hover:text-chart-2-foreground"
                    onClick={() => handleBulkStatusChange("maybe")}
                  >
                    <HelpCircle className="mr-1 h-4 w-4" />
                    Maybe
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleBulkStatusChange("no")}
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    No
                  </Button>
                </div>
              </div>
            )}

            {/* Applicant Header with Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {filteredApplicants.length > 0 && (
                  <Checkbox
                    checked={selectedApplicants.size === filteredApplicants.length && filteredApplicants.length > 0}
                    onCheckedChange={(checked) => handleSelectAll(checked === true)}
                    className="h-5 w-5"
                  />
                )}
                <p className="text-sm text-muted-foreground">
                  {filteredApplicants.length} applicant{filteredApplicants.length !== 1 ? "s" : ""} 
                  {applicantFilter !== "all" && ` (filtered by ${applicantFilter})`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button size="sm" onClick={handleCreateLandingPage}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create Landing Page
                </Button>
              </div>
            </div>
            
            {filteredApplicants.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No applicants found</p>
                {applicantFilter !== "all" && (
                  <Button variant="link" className="mt-2" onClick={() => setApplicantFilter("all")}>
                    Clear filter
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredApplicants.map((applicant) => (
                  <ApplicantCard
                    key={applicant.creator.id}
                    creator={applicant.creator}
                    status={applicant.status}
                    note={applicant.note}
                    selected={selectedApplicants.has(applicant.creator.id)}
                    onSelect={(selected) => handleSelectApplicant(applicant.creator.id, selected)}
                    onStatusChange={(status) => handleApplicantStatusChange(applicant.creator.id, status)}
                    onNoteChange={(note) => handleApplicantNoteChange(applicant.creator.id, note)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </div>
      </AppLayout>
    </Tabs>
  );
}
