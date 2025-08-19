import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Share2,
  FileText, 
  Calendar,
  User,
  Scale,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AjhaharDocument = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { docId } = useParams();
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "ডাউনলোড শুরু হয়েছে",
      description: "আজহার PDF ডাউনলোড হচ্ছে..."
    });
    // Simulate download
    setTimeout(() => {
      // In real implementation, this would trigger actual PDF download
      console.log("Downloading PDF with ID:", docId);
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'আজহার ডকুমেন্ট',
        text: 'আইনি আজহার ডকুমেন্ট',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "লিংক কপি হয়েছে",
        description: "আজহার ডকুমেন্টের লিংক ক্লিপবোর্ডে কপি হয়েছে"
      });
    }
  };

  const mockAjhaharData = {
    caseNumber: "FIR-2024-001",
    policeStation: "রমনা থানা",
    district: "ঢাকা",
    date: "১৫ ডিসেম্বর ২০২৤",
    time: "১০:৩০ AM",
    informant: {
      name: "মোহাম্মদ রহিম",
      father: "আব্দুল করিম",
      mother: "রাহেলা খাতুন",
      age: "৩৫",
      address: "২৩৪ নং বাড়ি, পুরান ঢাকা, ঢাকা-১০০০",
      phone: "০১৭১২৩৪৫৬৭২"
    },
    incident: {
      date: "১৪ ডিসেম্বর ২০২৪",
      time: "রাত ২:০০ টা",
      place: "আমার দোকান, পুরান ঢাকা",
      description: "আমার দোকান থেকে ৫০,০০০ টাকার পণ্য ও ১০,০০০ টাকা নগদ চুরি হয়েছে। প্রতিবেশী সাকিব ও তার সাথীরা এই কাজ করেছে বলে সন্দেহ। দোকানের সিসিটিভি ক্যামেরায় তাদের দেখা গেছে।"
    },
    sections: ["দণ্ডবিধি ১৮৬০ এর ৩৭৯ ধারা (চুরি)", "ফৌজদারি কার্যবিধি ১৮৯৮ এর ১৫৪ ধারা"]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex">
        <DashboardSidebar isOpen={isSidebarOpen} />
        
        <main className="flex-1 min-h-[calc(100vh-64px)] overflow-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header with Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-success rounded-lg">
                  <CheckCircle className="h-6 w-6 text-success-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">আজহার ডকুমেন্ট প্রস্তুত</h1>
                  <p className="text-muted-foreground">ডকুমেন্ট আইডি: {docId}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  শেয়ার
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  <FileText className="h-4 w-4 mr-2" />
                  প্রিন্ট
                </Button>
                <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90">
                  <Download className="h-4 w-4 mr-2" />
                  PDF ডাউনলোড
                </Button>
              </div>
            </div>

            <Badge variant="default" className="bg-success">
              <CheckCircle className="h-3 w-3 mr-1" />
              আজহার সফলভাবে তৈরি হয়েছে
            </Badge>

            {/* Ajhahar Document Preview */}
            <Card className="print-content">
              <CardContent className="p-8 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2 border-b pb-4">
                  <h2 className="text-xl font-bold">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</h2>
                  <h3 className="text-lg font-semibold">প্রাথমিক তথ্য প্রতিবেদন (আজহার)</h3>
                  <p className="text-sm text-muted-foreground">First Information Report (F.I.R.)</p>
                </div>

                {/* Case Information */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>থানা:</strong> {mockAjhaharData.policeStation}
                  </div>
                  <div>
                    <strong>জেলা:</strong> {mockAjhaharData.district}
                  </div>
                  <div>
                    <strong>মামলা নম্বর:</strong> {mockAjhaharData.caseNumber}
                  </div>
                  <div>
                    <strong>তারিখ ও সময়:</strong> {mockAjhaharData.date}, {mockAjhaharData.time}
                  </div>
                </div>

                <Separator />

                {/* Informant Details */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>অভিযোগকারীর তথ্য</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm pl-6">
                    <div><strong>নাম:</strong> {mockAjhaharData.informant.name}</div>
                    <div><strong>পিতার নাম:</strong> {mockAjhaharData.informant.father}</div>
                    <div><strong>মাতার নাম:</strong> {mockAjhaharData.informant.mother}</div>
                    <div><strong>বয়স:</strong> {mockAjhaharData.informant.age} বছর</div>
                    <div className="md:col-span-2">
                      <strong>ঠিকানা:</strong> {mockAjhaharData.informant.address}
                    </div>
                    <div><strong>ফোন:</strong> {mockAjhaharData.informant.phone}</div>
                  </div>
                </div>

                <Separator />

                {/* Incident Details */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>ঘটনার বিবরণ</span>
                  </h4>
                  <div className="text-sm pl-6 space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div><strong>ঘটনার তারিখ:</strong> {mockAjhaharData.incident.date}</div>
                      <div><strong>ঘটনার সময়:</strong> {mockAjhaharData.incident.time}</div>
                    </div>
                    <div><strong>ঘটনাস্থল:</strong> {mockAjhaharData.incident.place}</div>
                    <div className="mt-3">
                      <strong>ঘটনার বিস্তারিত:</strong>
                      <p className="mt-2 leading-relaxed">{mockAjhaharData.incident.description}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Legal Sections */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <Scale className="h-4 w-4" />
                    <span>প্রযোজ্য আইনের ধারা</span>
                  </h4>
                  <div className="text-sm pl-6">
                    <ul className="space-y-1">
                      {mockAjhaharData.sections.map((section, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-primary">•</span>
                          <span>{section}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator />

                {/* Signature Section */}
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="text-center">
                    <div className="border-t border-gray-400 pt-2">
                      <p className="text-sm font-medium">অভিযোগকারীর স্বাক্ষর</p>
                      <p className="text-xs text-muted-foreground mt-1">{mockAjhaharData.informant.name}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="border-t border-gray-400 pt-2">
                      <p className="text-sm font-medium">দায়িত্বপ্রাপ্ত কর্মকর্তার স্বাক্ষর</p>
                      <p className="text-xs text-muted-foreground mt-1">তারিখ: {mockAjhaharData.date}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                ড্যাশবোর্ডে ফিরুন
              </Button>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/clients/new")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  নতুন মামলা শুরু করুন
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AjhaharDocument;