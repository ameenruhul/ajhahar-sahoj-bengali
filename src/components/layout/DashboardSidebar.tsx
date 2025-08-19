import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  UserPlus, 
  FileText, 
  Scale,
  BookOpen,
  Eye
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardSidebarProps {
  isOpen?: boolean;
  currentRoute?: string;
}

const menuItems = [
  {
    id: "dashboard",
    title: "ড্যাশবোর্ড",
    subtitle: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard"
  },
  {
    id: "add-client",
    title: "নতুন ক্লায়েন্ট",
    subtitle: "Add Client",
    icon: UserPlus,
    path: "/clients/new"
  },
  {
    id: "applications",
    title: "আবেদনসমূহ",
    subtitle: "Applications",
    icon: FileText,
    path: "/applications"
  }
];

export function DashboardSidebar({ isOpen = true, currentRoute }: DashboardSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeRoute = currentRoute || location.pathname;

  return (
    <aside className={cn(
      "bg-card border-r transition-all duration-300 ease-in-out",
      isOpen ? "w-72" : "w-0 overflow-hidden"
    )}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">মেনু</h2>
        
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeRoute === item.path ? "secondary" : "ghost"}
                className="w-full justify-start h-auto p-4 text-left"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className="flex-shrink-0 mt-1">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.subtitle}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}