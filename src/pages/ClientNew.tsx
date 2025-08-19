import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { EnhancedClientForm } from "@/components/forms/EnhancedClientForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Save, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ClientNew = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAutoSaved, setIsAutoSaved] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Warn user about unsaved changes when leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSaveAndContinue = () => {
    // Here we would normally save the client data and get an ID
    const mockCaseId = "new-case-" + Date.now();
    
    toast({
      title: "ক্লায়েন্ট তথ্য সংরক্ষিত",
      description: "পরবর্তী ধাপে এগিয়ে যাচ্ছেন..."
    });

    setHasUnsavedChanges(false);
    // Navigate to case summary questions with the new case ID
    setTimeout(() => {
      navigate(`/case/summary-questions/${mockCaseId}`);
    }, 1500);
  };

  const handleBackToDashboard = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm("আপনার অসংরক্ষিত পরিবর্তন হারিয়ে যাবে। আপনি কি নিশ্চিত?");
      if (!confirmed) return;
    }
    navigate("/dashboard");
  };

  const handleAutoSave = () => {
    setIsAutoSaved(true);
    setHasUnsavedChanges(false);
    setTimeout(() => setIsAutoSaved(false), 3000);
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
            {/* Progress Stepper */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">নতুন মামলা - ক্লায়েন্ট তথ্য</h1>
                <div className="flex items-center space-x-2">
                  {isAutoSaved && (
                    <Badge variant="outline" className="text-success animate-pulse">
                      এখনই সংরক্ষিত
                    </Badge>
                  )}
                  {hasUnsavedChanges && (
                    <Badge variant="outline" className="text-warning">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      অসংরক্ষিত পরিবর্তন
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>ধাপ ১/ৄ - ক্লায়েন্ট তথ্য</span>
                  <span>২৫% সম্পূর্ণ</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-medium">১</span>
                <span className="font-medium">ক্লায়েন্ট তথ্য</span>
                <ArrowRight className="h-4 w-4" />
                <span className="px-3 py-1 rounded-full bg-muted">২</span>
                <span>সারসংক্ষেপ ও প্রশ্ন</span>
                <ArrowRight className="h-4 w-4" />
                <span className="px-3 py-1 rounded-full bg-muted">৩</span>
                <span>আইনি পরামর্শ</span>
                <ArrowRight className="h-4 w-4" />
                <span className="px-3 py-1 rounded-full bg-muted">৪</span>
                <span>ফাইনাল ওভারভিউ</span>
              </div>
            </div>

            <EnhancedClientForm 
              onFormChange={() => setHasUnsavedChanges(true)}
              onAutoSave={handleAutoSave}
            />
            
            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBackToDashboard}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                ড্যাশবোর্ডে ফিরুন
              </Button>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handleAutoSave}
                >
                  <Save className="h-4 w-4 mr-2" />
                  সংরক্ষণ করুন
                </Button>
                <Button
                  onClick={handleSaveAndContinue}
                  className="bg-primary hover:bg-primary/90"
                >
                  সংরক্ষণ করে পরবর্তী ধাপ
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientNew;