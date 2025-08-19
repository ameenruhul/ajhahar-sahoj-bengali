import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  FileText, 
  MessageSquare, 
  Scale, 
  Download, 
  Printer, 
  Copy, 
  Save,
  Edit,
  CheckCircle,
  AlertCircle,
  Languages,
  Building,
  Calendar,
  Loader2
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app, this would come from Supabase
const mockCaseData = {
  clientInfo: {
    name: "মোহাম্মদ রহিম উদ্দিন",
    address: "বাড়ি নং ১২, রোড নং ৫, ধানমন্ডি, ঢাকা-১২০৫",
    phone: "+৮৮০১৭১২৩৪৫৬৭৮",
    caseNumber: "CASE-2024-001",
    nid: "১৯৮৫১২৩৪৫৬৭৮৯০",
    caseStory: "২০২৪ সালের ১৫ জানুয়ারি সকাল ১০টার দিকে আমার দোকানে চুরির ঘটনা ঘটে। অজ্ঞাত চোরেরা দোকানের তালা ভেঙে প্রায় ৫০,০০০ টাকার পণ্যসামগ্রী চুরি করে নিয়ে যায়। স্থানীয় থানায় জিডি করা হয়েছে।"
  },
  caseSummary: "দোকানে চুরির ঘটনায় প্রায় ৫০ হাজার টাকার ক্ষতি। অজ্ঞাত চোরদের বিরুদ্ধে মামলা দায়ের করতে হবে।",
  questions: [
    { question: "ঘটনার সময় কোনো সাক্ষী ছিল কি?", answer: "হ্যাঁ, পাশের দোকানদার দেখেছেন।" },
    { question: "চুরি যাওয়া পণ্যের তালিকা আছে কি?", answer: "হ্যাঁ, বিস্তারিত তালিকা আছে।" },
    { question: "থানায় জিডি নম্বর কত?", answer: "জিডি নং ১২৩/২০২৪" }
  ],
  lawAdvice: "দণ্ডবিধির ৩৭৮ ধারা অনুযায়ী চুরির মামলা দায়ের করতে হবে। প্রমাণাদি সংগ্রহ করে থানায় প্রাথমিক তথ্য রিপোর্ট (FIR) দাখিল করুন।",
  lawReference: "দণ্ডবিধি ১৮৬০, ধারা ৩৭৮ - চুরি; ফৌজদারি কার্যবিধি ১৮৯৮, ধারা ১৫৪ - প্রাথমিক তথ্য রিপোর্ট",
  positiveSide: "• সাক্ষীর উপস্থিতি\n• পণ্যের বিস্তারিত তালিকা\n• থানায় জিডি করা হয়েছে",
  negativeSide: "• চোরদের পরিচয় অজানা\n• CCTV ফুটেজ নেই\n• আঙুলের ছাপ পাওয়া যায়নি",
  overviewComment: "চুরির মামলা দায়ের করার জন্য প্রমাণাদি যথেষ্ট আছে। সাক্ষীর সাক্ষ্য ও পণ্যের তালিকা মামলাকে শক্তিশালী করবে।",
  attachments: [
    { name: "জিডি কপি.pdf", size: "2.3 MB", type: "pdf" },
    { name: "পণ্যের তালিকা.jpg", size: "1.8 MB", type: "image" }
  ]
};

interface ComprehensiveFinalOverviewProps {
  caseId: string;
}

export const ComprehensiveFinalOverview = ({ caseId }: ComprehensiveFinalOverviewProps) => {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [generateOptions, setGenerateOptions] = useState({
    template: "standard",
    language: "bengali",
    officeName: "",
    logoUrl: "",
    date: new Date().toISOString().split('T')[0]
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEdit = (section: string) => {
    switch(section) {
      case 'client':
        navigate(`/clients/new`);
        break;
      case 'summary':
        navigate(`/case/summary-questions/${caseId}`);
        break;
      case 'advice':
        navigate(`/case/law-advice/${caseId}`);
        break;
    }
  };

  const handleGenerateAjhahar = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call for document generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockDocId = "ajhahar-" + Date.now();
      setIsGenerateModalOpen(false);
      
      toast({
        title: "অজাহার সফলভাবে তৈরি হয়েছে",
        description: "ডকুমেন্ট পৃষ্ঠায় যাচ্ছেন..."
      });
      
      setTimeout(() => {
        navigate(`/documents/ajhahar/${mockDocId}`);
      }, 1500);
      
    } catch (error) {
      toast({
        title: "ত্রুটি ঘটেছে",
        description: "অজাহার তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const SectionCard = ({ 
    title, 
    icon: Icon, 
    content, 
    editSection, 
    isEmpty = false 
  }: { 
    title: string; 
    icon: any; 
    content: React.ReactNode; 
    editSection: string;
    isEmpty?: boolean;
  }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleEdit(editSection)}
            className="text-primary hover:text-primary/80"
          >
            <Edit className="h-4 w-4 mr-1" />
            সম্পাদনা
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            এখনও কিছু যোগ করা হয়নি
          </div>
        ) : (
          content
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Main Generate Button */}
      <div className="flex justify-center">
        <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              <FileText className="h-6 w-6 mr-3" />
              অজাহার জেনারেট করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                অজাহার জেনারেট করুন
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Template Selection */}
              <div className="space-y-2">
                <Label>টেমপ্লেট</Label>
                <Select 
                  value={generateOptions.template} 
                  onValueChange={(value) => setGenerateOptions(prev => ({...prev, template: value}))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">স্ট্যান্ডার্ড অজাহার</SelectItem>
                    <SelectItem value="detailed">বিস্তারিত অজাহার</SelectItem>
                    <SelectItem value="simple">সরল অজাহার</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Language Selection */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  ভাষা
                </Label>
                <Select 
                  value={generateOptions.language} 
                  onValueChange={(value) => setGenerateOptions(prev => ({...prev, language: value}))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bengali">বাংলা</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Header Options */}
              <Separator />
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  হেডার/লেটারহেড অপশন
                </Label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="office-name">অফিসের নাম</Label>
                    <Input
                      id="office-name"
                      placeholder="আইন অফিসের নাম"
                      value={generateOptions.officeName}
                      onChange={(e) => setGenerateOptions(prev => ({...prev, officeName: e.target.value}))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      তারিখ
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={generateOptions.date}
                      onChange={(e) => setGenerateOptions(prev => ({...prev, date: e.target.value}))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo-url">লোগো URL (ঐচ্ছিক)</Label>
                  <Input
                    id="logo-url"
                    type="url"
                    placeholder="https://example.com/logo.png"
                    value={generateOptions.logoUrl}
                    onChange={(e) => setGenerateOptions(prev => ({...prev, logoUrl: e.target.value}))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsGenerateModalOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleGenerateAjhahar} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      তৈরি হচ্ছে...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      জেনারেট করুন
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Overview */}
      <div className="space-y-6">
        {/* Client Information */}
        <SectionCard
          title="ক্লায়েন্ট তথ্য"
          icon={User}
          editSection="client"
          content={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="space-y-2">
                  <div><strong>নাম:</strong> {mockCaseData.clientInfo.name}</div>
                  <div><strong>ফোন:</strong> {mockCaseData.clientInfo.phone}</div>
                  <div><strong>এনআইডি:</strong> {mockCaseData.clientInfo.nid}</div>
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <div><strong>কেস নম্বর:</strong> {mockCaseData.clientInfo.caseNumber}</div>
                  <div><strong>ঠিকানা:</strong> {mockCaseData.clientInfo.address}</div>
                </div>
              </div>
            </div>
          }
        />

        {/* Case Story */}
        <SectionCard
          title="কেসের বর্ণনা"
          icon={FileText}
          editSection="client"
          content={
            <div className="prose max-w-none">
              <p>{mockCaseData.clientInfo.caseStory}</p>
            </div>
          }
        />

        {/* Case Summary */}
        <SectionCard
          title="কেস সারসংক্ষেপ"
          icon={FileText}
          editSection="summary"
          content={
            <div className="prose max-w-none">
              <p>{mockCaseData.caseSummary}</p>
            </div>
          }
        />

        {/* Questions and Answers */}
        <SectionCard
          title="প্রশ্ন তালিকা ও উত্তর"
          icon={MessageSquare}
          editSection="summary"
          content={
            <div className="space-y-4">
              {mockCaseData.questions.map((qa, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <div className="font-medium text-sm text-muted-foreground mb-1">
                    প্রশ্ন {index + 1}:
                  </div>
                  <div className="font-medium mb-2">{qa.question}</div>
                  <div className="text-muted-foreground bg-muted p-2 rounded">
                    <strong>উত্তর:</strong> {qa.answer}
                  </div>
                </div>
              ))}
            </div>
          }
        />

        {/* Legal Advice and Reference */}
        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard
            title="আইনি পরামর্শ"
            icon={Scale}
            editSection="advice"
            content={
              <div className="prose max-w-none">
                <p>{mockCaseData.lawAdvice}</p>
              </div>
            }
          />

          <SectionCard
            title="আইনের রেফারেন্স"
            icon={FileText}
            editSection="advice"
            content={
              <div className="prose max-w-none">
                <p>{mockCaseData.lawReference}</p>
              </div>
            }
          />
        </div>

        {/* Positive and Negative Sides */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  ইতিবাচক দিক
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleEdit('advice')}
                  className="text-primary hover:text-primary/80"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  সম্পাদনা
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line">{mockCaseData.positiveSide}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  নেতিবাচক দিক
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleEdit('advice')}
                  className="text-primary hover:text-primary/80"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  সম্পাদনা
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line">{mockCaseData.negativeSide}</div>
            </CardContent>
          </Card>
        </div>

        {/* Overview Comment */}
        <SectionCard
          title="ওভারভিউ মন্তব্য"
          icon={MessageSquare}
          editSection="advice"
          content={
            <div className="prose max-w-none">
              <p>{mockCaseData.overviewComment}</p>
            </div>
          }
        />

        {/* Attachments */}
        <SectionCard
          title="অ্যাটাচমেন্টস (অজাহার ফাইলসমূহ)"
          icon={FileText}
          editSection="client"
          content={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCaseData.attachments.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">{file.name}</div>
                    <div className="text-sm text-muted-foreground">{file.size}</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
};