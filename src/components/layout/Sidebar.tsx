import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  FileText, 
  MessageSquare, 
  BookOpen, 
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  currentStep?: string;
}

const steps = [
  {
    id: "client-info",
    title: "ক্লায়েন্ট তথ্য",
    subtitle: "Client Information",
    icon: User,
    status: "completed"
  },
  {
    id: "case-story",
    title: "মামলার বিবরণ",
    subtitle: "Case Story",
    icon: FileText,
    status: "current"
  },
  {
    id: "qa-session",
    title: "প্রশ্নোত্তর সেশন",
    subtitle: "Q&A Session",
    icon: MessageSquare,
    status: "pending"
  },
  {
    id: "law-references",
    title: "আইনি রেফারেন্স",
    subtitle: "Law References",
    icon: BookOpen,
    status: "pending"
  },
  {
    id: "overview",
    title: "চূড়ান্ত সারসংক্ষেপ",
    subtitle: "Final Overview",
    icon: Eye,
    status: "pending"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "current":
      return <Clock className="h-4 w-4 text-warning" />;
    default:
      return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
  }
};

export function Sidebar({ isOpen = true, currentStep = "case-story" }: SidebarProps) {
  return (
    <aside className={cn(
      "bg-card border-r transition-all duration-300 ease-in-out",
      isOpen ? "w-72" : "w-0 overflow-hidden"
    )}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">মামলার অগ্রগতি</h2>
        
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="space-y-2">
            {steps.map((step, index) => (
              <Button
                key={step.id}
                variant={currentStep === step.id ? "secondary" : "ghost"}
                className="w-full justify-start h-auto p-4 text-left"
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className="flex-shrink-0 mt-1">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{step.title}</p>
                      {getStatusIcon(step.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{step.subtitle}</p>
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