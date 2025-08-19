import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Printer,
  FileText, 
  Calendar,
  User,
  Scale,
  ArrowLeft,
  Clock,
  UserCheck
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AjhaharDocument = () => {
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

  const handleBackToOverview = () => {
    // Extract case ID from document ID (assuming format: ajhahar-{timestamp} or similar)
    const caseId = "case-123"; // In real implementation, this would be derived from docId or stored data
    navigate(`/case/final-overview/${caseId}`);
  };

  // Mock metadata
  const documentMeta = {
    createdDate: "১৫ ডিসেম্বর ২০২৪",
    createdTime: "৩:৪৫ PM", 
    generatedBy: "মো. করিম উদ্দিন (আইনজীবী)",
    caseId: "CASE-2024-001"
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Header with Actions */}
      <div className="bg-card border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleBackToOverview}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            ওভারভিউ এ ফিরুন
          </Button>
          <div className="h-6 w-px bg-border" />
          <div>
            <h1 className="text-lg font-semibold">আজহার ডকুমেন্ট</h1>
            <p className="text-sm text-muted-foreground">ডকুমেন্ট আইডি: {docId}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            প্রিন্ট
          </Button>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            ডাউনলোড
          </Button>
        </div>
      </div>

      {/* Meta Information Bar */}
      <div className="bg-muted/30 px-6 py-3 border-b">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>তৈরি: {documentMeta.createdDate}, {documentMeta.createdTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4" />
              <span>জেনারেটর: {documentMeta.generatedBy}</span>
            </div>
          </div>
          <Badge variant="outline">
            কেস: {documentMeta.caseId}
          </Badge>
        </div>
      </div>

      {/* Full-page PDF Viewer */}
      <div className="flex-1 overflow-auto bg-muted/20">
        <div className="max-w-4xl mx-auto p-6">
          <Card className="print-content shadow-lg">
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
        </div>
      </div>
    </div>
  );
};

export default AjhaharDocument;