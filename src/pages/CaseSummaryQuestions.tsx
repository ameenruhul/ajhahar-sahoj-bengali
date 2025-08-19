import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { CaseStoryForm } from "@/components/forms/CaseStoryForm";
import { GuidedQASession } from "@/components/qa/GuidedQASession";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Save, FileText, MessageSquare } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CaseSummaryQuestions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState<"summary" | "questions">("summary");
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const handleSaveAndContinue = () => {
    toast({
      title: "কেস তথ্য সংরক্ষিত",
      description: "আইনি পরামর্শের ধাপে এগিয়ে যাচ্ছেন..."
    });

    setTimeout(() => {
      navigate(`/case/law-advice/${id}`);
    }, 1500);
  };

  const handleBack = () => {
    navigate("/clients/new");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex">
        <DashboardSidebar isOpen={isSidebarOpen} />
        
        <main className="flex-1 min-h-[calc(100vh-64px)] overflow-auto">
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded">১</span>
              <span>ক্লায়েন্ট তথ্য</span>
              <ArrowRight className="h-4 w-4" />
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded">২</span>
              <span>কেস সারসংক্ষেপ</span>
              <ArrowRight className="h-4 w-4" />
              <span>আইনি পরামর্শ</span>
              <ArrowRight className="h-4 w-4" />
              <span>চূড়ান্ত প্রতিবেদন</span>
            </div>

            {/* Section Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>কেস সারসংক্ষেপ ও প্রশ্নোত্তর</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button
                    variant={currentSection === "summary" ? "default" : "outline"}
                    onClick={() => setCurrentSection("summary")}
                    className="flex items-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>মামলার বিবরণ</span>
                  </Button>
                  <Button
                    variant={currentSection === "questions" ? "default" : "outline"}
                    onClick={() => setCurrentSection("questions")}
                    className="flex items-center space-x-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>গাইডেড প্রশ্নোত্তর</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Content based on current section */}
            {currentSection === "summary" ? (
              <CaseStoryForm />
            ) : (
              <GuidedQASession />
            )}
            
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
                  onClick={handleSaveAndContinue}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="h-4 w-4 mr-2" />
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

export default CaseSummaryQuestions;