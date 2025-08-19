import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { ClientInfoForm } from "@/components/forms/ClientInfoForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ClientNew = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSaveAndContinue = () => {
    // Here we would normally save the client data and get an ID
    const mockCaseId = "new-case-" + Date.now();
    
    toast({
      title: "ক্লায়েন্ট তথ্য সংরক্ষিত",
      description: "পরবর্তী ধাপে এগিয়ে যাচ্ছেন..."
    });

    // Navigate to case summary questions with the new case ID
    setTimeout(() => {
      navigate(`/case/summary-questions/${mockCaseId}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex">
        <DashboardSidebar 
          isOpen={isSidebarOpen} 
          currentRoute="/clients/new"
        />
        
        <main className="flex-1 min-h-[calc(100vh-64px)] overflow-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded">১</span>
              <span>ক্লায়েন্ট তথ্য</span>
              <ArrowRight className="h-4 w-4" />
              <span>কেস সারসংক্ষেপ</span>
              <ArrowRight className="h-4 w-4" />
              <span>আইনি পরামর্শ</span>
              <ArrowRight className="h-4 w-4" />
              <span>চূড়ান্ত প্রতিবেদন</span>
            </div>

            <ClientInfoForm />
            
            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                ড্যাশবোর্ডে ফিরুন
              </Button>
              
              <Button
                onClick={handleSaveAndContinue}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="h-4 w-4 mr-2" />
                সংরক্ষণ করে পরবর্তী ধাপ
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientNew;