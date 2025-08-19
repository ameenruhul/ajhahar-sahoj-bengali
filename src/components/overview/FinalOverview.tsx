import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Eye, 
  FileText, 
  Download, 
  Edit,
  Check,
  AlertCircle,
  User,
  Scale
} from "lucide-react";

interface OverviewSection {
  title: string;
  bengaliTitle: string;
  content: string;
  isEditable: boolean;
  isRequired: boolean;
}

export function FinalOverview() {
  const [sections, setSections] = useState<OverviewSection[]>([
    {
      title: "Client Information",
      bengaliTitle: "ক্লায়েন্ট তথ্য",
      content: "মোহাম্মদ রহিম, পিতা: আব্দুল করিম, মাতা: রাহেলা খাতুন, বয়স: ৩৫ বছর, ফোন: ০১৭১২৩৪৫৬৭২, ঠিকানা: ২৩৪ নং বাড়ি, পুরান ঢাকা, ঢাকা-১০০০",
      isEditable: false,
      isRequired: true
    },
    {
      title: "Case Summary",
      bengaliTitle: "মামলার সারসংক্ষেপ",
      content: "১৫ ডিসেম্বর ২০২৪ তারিখে সকাল ১০টার দিকে আমার দোকান থেকে ৫০,০০০ টাকার পণ্য ও ১০,০০০ টাকা নগদ চুরি হয়েছে। প্রতিবেশী সাকিব ও তার সাথীরা এই কাজ করেছে বলে সন্দেহ। দোকানের সিসিটিভি ক্যামেরায় তাদের দেখা গেছে।",
      isEditable: true,
      isRequired: true
    },
    {
      title: "Legal Basis",
      bengaliTitle: "আইনি ভিত্তি",
      content: "দণ্ডবিধি ১৮৬০ এর ৩৭৯ ধারা অনুযায়ী চুরির অভিযোগ। ফৌজদারি কার্যবিধি ১৮৯৮ এর ১৫৪ ধারায় আজহার দায়ের। প্রমাণ হিসেবে সিসিটিভি ফুটেজ ও সাক্ষীদের বিবৃতি।",
      isEditable: true,
      isRequired: true
    },
    {
      title: "Demands/Relief Sought",
      bengaliTitle: "দাবি ও প্রতিকার",
      content: "১. অভিযুক্তদের গ্রেফতার ও শাস্তি, ২. চুরি যাওয়া পণ্য ও অর্থ ফেরত, ৩. ক্ষতিপূরণ প্রদান, ৪. ভবিষ্যতে নিরাপত্তার নিশ্চয়তা।",
      isEditable: true,
      isRequired: true
    }
  ]);

  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  const updateSection = (index: number, content: string) => {
    setSections(prev => prev.map((section, i) => 
      i === index ? { ...section, content } : section
    ));
    setEditingSection(null);
  };

  const generateAjhaharPDF = () => {
    // PDF generation logic would go here
    console.log("Generating Ajhahar PDF...");
  };

  const completedSections = sections.filter(s => s.content.trim().length > 0).length;
  const totalSections = sections.length;
  const completionRate = (completedSections / totalSections) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Eye className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">চূড়ান্ত সারসংক্ষেপ</h1>
            <p className="text-muted-foreground">Final Overview & Ajhahar Generation</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={completionRate === 100 ? "default" : "secondary"}>
            {Math.round(completionRate)}% সম্পূর্ণ
          </Badge>
          <Button 
            onClick={generateAjhaharPDF}
            disabled={completionRate < 100}
            className="bg-primary hover:bg-primary/90"
          >
            <Download className="h-4 w-4 mr-2" />
            আজহার PDF তৈরি করুন
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span>সম্পূর্ণতার অবস্থা</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <div key={index} className="text-center space-y-2">
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                  section.content.trim() ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {section.content.trim() ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                </div>
                <p className="text-xs font-medium">{section.bengaliTitle}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Editable Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {index === 0 ? <User className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                  <span>{section.bengaliTitle}</span>
                  {section.isRequired && (
                    <Badge variant="outline" className="text-destructive ml-2">প্রয়োজনীয়</Badge>
                  )}
                </CardTitle>
                {section.isEditable && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection(editingSection === index ? null : index)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {editingSection === index ? "বাতিল" : "সম্পাদনা"}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {editingSection === index ? (
                <div className="space-y-4">
                  <Textarea
                    value={section.content}
                    onChange={(e) => setSections(prev => prev.map((s, i) => 
                      i === index ? { ...s, content: e.target.value } : s
                    ))}
                    rows={6}
                    className="resize-none"
                  />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => updateSection(index, sections[index].content)}
                    >
                      সংরক্ষণ করুন
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingSection(null)}
                    >
                      বাতিল
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {section.content || "এই বিভাগটি এখনো পূরণ করা হয়নি"}
                  </p>
                  {!section.content && (
                    <p className="text-xs text-muted-foreground">
                      এই তথ্য আজহার তৈরির জন্য প্রয়োজনীয়
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>অতিরিক্ত মন্তব্য</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="আজহারে অন্তর্ভুক্ত করার জন্য কোন অতিরিক্ত তথ্য বা মন্তব্য লিখুন..."
            rows={4}
            className="resize-none"
          />
        </CardContent>
      </Card>

      {/* Ajhahar Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scale className="h-5 w-5" />
            <span>আজহার প্রিভিউ</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 p-6 rounded-lg space-y-4 border-2 border-dashed">
            <div className="text-center space-y-2">
              <h3 className="font-bold text-lg">প্রাথমিক তথ্য প্রতিবেদন (আজহার)</h3>
              <p className="text-sm text-muted-foreground">First Information Report (FIR)</p>
            </div>
            
            <Separator />
            
            <div className="space-y-4 text-sm">
              <div>
                <strong>অভিযোগকারীর তথ্য:</strong>
                <p className="mt-1">{sections[0]?.content}</p>
              </div>
              
              <div>
                <strong>ঘটনার বিবরণ:</strong>
                <p className="mt-1">{sections[1]?.content}</p>
              </div>
              
              <div>
                <strong>প্রযোজ্য আইন:</strong>
                <p className="mt-1">{sections[2]?.content}</p>
              </div>
              
              <div>
                <strong>প্রার্থিত প্রতিকার:</strong>
                <p className="mt-1">{sections[3]?.content}</p>
              </div>
              
              {notes && (
                <div>
                  <strong>অতিরিক্ত তথ্য:</strong>
                  <p className="mt-1">{notes}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}