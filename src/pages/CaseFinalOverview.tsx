import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { FinalOverview } from "@/components/overview/FinalOverview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CaseFinalOverview = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const handleGenerateAjhahar = () => {
    toast({
      title: "আজহার তৈরি হচ্ছে",
      description: "অনুগ্রহ করে অপেক্ষা করুন..."
    });

    // Simulate PDF generation
    setTimeout(() => {
      const mockDocId = "ajhahar-" + Date.now();
      toast({
        title: "আজহার সফলভাবে তৈরি হয়েছে",
        description: "ডাউনলোড পৃষ্ঠায় যাচ্ছেন..."
      });
      
      setTimeout(() => {
        navigate(`/documents/ajhahar/${mockDocId}`);
      }, 1000);
    }, 3000);
  };

  const handleBack = () => {
    navigate(`/case/law-advice/${id}`);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex">
        <DashboardSidebar isOpen={isSidebarOpen} />
        
        <main className="flex-1 min-h-[calc(100vh-64px)] overflow-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded">১</span>
              <span>ক্লায়েন্ট তথ্য</span>
              <span className="text-success">✓</span>
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded">২</span>
              <span>কেস সারসংক্ষেপ</span>
              <span className="text-success">✓</span>
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded">৩</span>
              <span>আইনি পরামর্শ</span>
              <span className="text-success">✓</span>
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded">৪</span>
              <span>চূড়ান্ত প্রতিবেদন</span>
            </div>

            {/* Modified FinalOverview with custom generate button */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <div>
                    <h1 className="text-2xl font-bold">চূড়ান্ত সারসংক্ষেপ</h1>
                    <p className="text-muted-foreground">Final Overview & Ajhahar Generation</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-success">
                    <Check className="h-3 w-3 mr-1" />
                    ১০০% সম্পূর্ণ
                  </Badge>
                  <Button 
                    onClick={handleGenerateAjhahar}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    আজহার PDF তৈরি করুন
                  </Button>
                </div>
              </div>

              <FinalOverview />
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                পূর্ববর্তী ধাপ
              </Button>
              
              <div className="flex space-x-2">
                <Badge variant="outline">
                  কেস আইডি: {id}
                </Badge>
                <Button
                  variant="outline"
                  onClick={handleBackToDashboard}
                >
                  ড্যাশবোর্ডে ফিরুন
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CaseFinalOverview;