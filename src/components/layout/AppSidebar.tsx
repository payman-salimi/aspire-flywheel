import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CampaignIcon from "@mui/icons-material/Campaign";
import FolderIcon from "@mui/icons-material/Folder";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import aspireLogo from "@/assets/aspire-logo.png";

const mainNavItems = [
  { title: "Home", icon: HomeIcon, path: "/" },
  { title: "Recruit", icon: PeopleIcon, path: "/creators" },
  { title: "Members", icon: HandshakeIcon, path: "/collaborations" },
  { title: "Campaigns", icon: CampaignIcon, path: "/campaigns" },
  { title: "Content", icon: FolderIcon, path: "/assets" },
  { title: "Reports", icon: BarChartIcon, path: "/analytics" },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-20 bg-background border-r border-border flex flex-col items-center py-6">
      {/* Logo */}
      <Link to="/" className="mb-8">
        <img src={aspireLogo} alt="Aspire" className="h-8 w-8 rounded-lg" />
      </Link>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-6 w-full">
        {mainNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center gap-1 w-full py-2 transition-colors ${
              isActive(item.path)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon sx={{ fontSize: 24 }} />
            <span className="text-[10px] font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="flex flex-col items-center gap-3 w-full border-t border-border pt-6">
        <button className="flex flex-col items-center justify-center w-full py-2 text-muted-foreground hover:text-foreground transition-colors">
          <SearchIcon sx={{ fontSize: 24 }} />
        </button>

        <button className="flex flex-col items-center justify-center w-full py-2 text-muted-foreground hover:text-foreground transition-colors">
          <MailOutlineIcon sx={{ fontSize: 24 }} />
        </button>

        <Link
          to="/settings"
          className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${
            isActive("/settings")
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <SettingsIcon sx={{ fontSize: 24 }} />
        </Link>

        {/* User Avatar */}
        <div className="mt-4">
          <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            PS
          </div>
        </div>
      </div>
    </aside>
  );
}
