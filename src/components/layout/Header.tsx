import { Scale, FileText, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center px-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="md:hidden mr-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Scale className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">কানুনি সহায়ক</h1>
            <p className="text-sm text-muted-foreground">Legal Case Assistant</p>
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            আজহার PDF
          </Button>
        </div>
      </div>
    </header>
  );
}