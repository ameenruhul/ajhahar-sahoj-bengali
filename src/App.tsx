import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ClientNew from "./pages/ClientNew";
import CaseSummaryQuestions from "./pages/CaseSummaryQuestions";
import CaseLawAdvice from "./pages/CaseLawAdvice";
import CaseFinalOverview from "./pages/CaseFinalOverview";
import AjhaharDocument from "./pages/AjhaharDocument";
import Applications from "./pages/Applications";
import CaseApplications from "./pages/CaseApplications";
import NewApplication from "./pages/NewApplication";
import ApplicationPreview from "./pages/ApplicationPreview";
import ApplicationExport from "./pages/ApplicationExport";
import ApplicationTemplates from "./pages/ApplicationTemplates";
import TemplateBuilder from "./pages/TemplateBuilder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients/new" element={<ClientNew />} />
          <Route path="/case/summary-questions/:id" element={<CaseSummaryQuestions />} />
          <Route path="/case/law-advice/:id" element={<CaseLawAdvice />} />
          <Route path="/case/final-overview/:id" element={<CaseFinalOverview />} />
          <Route path="/documents/ajhahar/:docId" element={<AjhaharDocument />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/case/:caseId/applications" element={<CaseApplications />} />
          <Route path="/case/:caseId/applications/new" element={<NewApplication />} />
          <Route path="/applications/:appId/preview" element={<ApplicationPreview />} />
          <Route path="/applications/:appId/export" element={<ApplicationExport />} />
          <Route path="/applications/templates" element={<ApplicationTemplates />} />
          <Route path="/applications/templates/new" element={<TemplateBuilder />} />
          <Route path="/applications/templates/:tplId/edit" element={<TemplateBuilder />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
