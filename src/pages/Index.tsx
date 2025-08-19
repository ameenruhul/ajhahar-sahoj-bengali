import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ClientInfoForm } from "@/components/forms/ClientInfoForm";
import { CaseStoryForm } from "@/components/forms/CaseStoryForm";
import { GuidedQASession } from "@/components/qa/GuidedQASession";
import { LawReferences } from "@/components/references/LawReferences";
import { FinalOverview } from "@/components/overview/FinalOverview";

const Index = () => {
  const [currentStep, setCurrentStep] = useState("case-story");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "client-info":
        return <ClientInfoForm />;
      case "case-story":
        return <CaseStoryForm />;
      case "qa-session":
        return <GuidedQASession />;
      case "law-references":
        return <LawReferences />;
      case "overview":
        return <FinalOverview />;
      default:
        return <CaseStoryForm />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          currentStep={currentStep}
        />
        
        <main className="flex-1 min-h-[calc(100vh-64px)] overflow-auto">
          {renderCurrentStep()}
        </main>
      </div>
    </div>
  );
};

export default Index;
