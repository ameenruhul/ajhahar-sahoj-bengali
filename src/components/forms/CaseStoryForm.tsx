import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Save, 
  FileText, 
  Calendar, 
  Upload,
  Clock,
  AlertTriangle 
} from "lucide-react";

interface CaseStory {
  incidentDate: string;
  incidentTime: string;
  location: string;
  description: string;
  witnesses: string;
  evidence: string;
  previousActions: string;
}

export function CaseStoryForm() {
  const [caseStory, setCaseStory] = useState<CaseStory>({
    incidentDate: "",
    incidentTime: "",
    location: "",
    description: "",
    witnesses: "",
    evidence: "",
    previousActions: ""
  });

  const [wordCount, setWordCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const count = caseStory.description.split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(count);
  }, [caseStory.description]);

  const handleSave = () => {
    localStorage.setItem('caseStory', JSON.stringify(caseStory));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updateField = (field: keyof CaseStory, value: string) => {
    setCaseStory(prev => ({ ...prev, [field]: value }));
    setTimeout(handleSave, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">মামলার বিবরণ</h1>
            <p className="text-muted-foreground">Case Story & Incident Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isSaved && <Badge variant="outline" className="text-success">স্বয়ংক্রিয় সংরক্ষণ</Badge>}
          <Button onClick={handleSave} size="sm">
            <Save className="h-4 w-4 mr-2" />
            সংরক্ষণ করুন
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>ঘটনার সময় ও স্থান</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="incidentDate">ঘটনার তারিখ *</Label>
              <Input
                id="incidentDate"
                type="date"
                value={caseStory.incidentDate}
                onChange={(e) => updateField('incidentDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="incidentTime" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>ঘটনার সময়</span>
              </Label>
              <Input
                id="incidentTime"
                type="time"
                value={caseStory.incidentTime}
                onChange={(e) => updateField('incidentTime', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">ঘটনাস্থল *</Label>
              <Input
                id="location"
                value={caseStory.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="সুনির্দিষ্ট স্থান উল্লেখ করুন"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>ঘটনার বিস্তারিত বিবরণ</span>
            </div>
            <Badge variant="outline">{wordCount} শব্দ</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">
              বিস্তারিত ঘটনা বর্ণনা করুন *
            </Label>
            <Textarea
              id="description"
              value={caseStory.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="ঘটনা কিভাবে ঘটেছে, কারা জড়িত ছিল, কি কি ক্ষতি হয়েছে - সবকিছু বিস্তারিত লিখুন..."
              rows={8}
              className="resize-none text-base leading-relaxed"
            />
            <p className="text-sm text-muted-foreground">
              যত বিস্তারিত লিখবেন, তত ভালো আইনি পরামর্শ পাবেন
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>সাক্ষী ও প্রমাণ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="witnesses">সাক্ষীদের তথ্য</Label>
              <Textarea
                id="witnesses"
                value={caseStory.witnesses}
                onChange={(e) => updateField('witnesses', e.target.value)}
                placeholder="সাক্ষীদের নাম, ঠিকানা ও ফোন নম্বর লিখুন"
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence">প্রমাণাদি</Label>
              <Textarea
                id="evidence"
                value={caseStory.evidence}
                onChange={(e) => updateField('evidence', e.target.value)}
                placeholder="কাগজপত্র, ছবি, ভিডিও বা অন্যান্য প্রমাণের বিবরণ"
                rows={4}
                className="resize-none"
              />
            </div>

            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              ফাইল আপলোড করুন
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>পূর্ববর্তী পদক্ষেপ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="previousActions">
                এ বিষয়ে আগে কোন পদক্ষেপ নেওয়া হয়েছে কি?
              </Label>
              <Textarea
                id="previousActions"
                value={caseStory.previousActions}
                onChange={(e) => updateField('previousActions', e.target.value)}
                placeholder="জিডি, মামলা, সালিশ বা অন্য কোন পদক্ষেপের বিবরণ"
                rows={6}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}