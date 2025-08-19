import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Download, FileText, Share2, Printer, Mail, Link2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApplicationExport = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [exportSettings, setExportSettings] = useState({
    format: 'pdf',
    marginTop: '2.5',
    marginBottom: '2.5',
    marginLeft: '2',
    marginRight: '2',
    fontSize: '12',
    lineSpacing: '1.5',
    pageNumbers: true,
    pageNumberFormat: 'bengali',
    header: '',
    footer: '',
    watermark: false
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate generation process
    const steps = [
      { label: 'টেমপ্লেট প্রস্তুত করা হচ্ছে...', progress: 20 },
      { label: 'ডেটা মার্জ করা হচ্ছে...', progress: 40 },
      { label: 'ফরম্যাটিং প্রয়োগ করা হচ্ছে...', progress: 60 },
      { label: 'PDF জেনারেট করা হচ্ছে...', progress: 80 },
      { label: 'সমাপ্ত!', progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGenerationProgress(step.progress);
    }

    setIsGenerating(false);
    setIsGenerated(true);
    
    toast({
      title: "ডকুমেন্ট জেনারেট সম্পন্ন",
      description: "আপনার আবেদনপত্র সফলভাবে তৈরি হয়েছে।",
    });
  };

  const handleDownload = () => {
    // Simulate download
    toast({
      title: "ডাউনলোড শুরু",
      description: "ডকুমেন্ট ডাউনলোড হচ্ছে...",
    });
  };

  const handleShare = (method: string) => {
    toast({
      title: "শেয়ার করা হচ্ছে",
      description: `${method} এর মাধ্যমে শেয়ার করা হচ্ছে...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/applications/${appId}/preview`)}
            className="mb-4"
          >
            ← প্রিভিউতে ফিরে যান
          </Button>
          <h1 className="text-3xl font-bold text-foreground">
            ডকুমেন্ট জেনারেট ও এক্সপোর্ট
          </h1>
          <p className="text-muted-foreground mt-2">
            আপনার আবেদনপত্র PDF বা Docx ফরম্যাটে এক্সপোর্ট করুন
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Format Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  আউটপুট ফরম্যাট
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={exportSettings.format}
                  onValueChange={(value) => setExportSettings({...exportSettings, format: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF (প্রস্তাবিত)</SelectItem>
                    <SelectItem value="docx">Microsoft Word (DOCX)</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Page Settings */}
            <Card>
              <CardHeader>
                <CardTitle>পেজ সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Margins */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="marginTop">উপরের মার্জিন (সে.মি.)</Label>
                    <Input
                      id="marginTop"
                      value={exportSettings.marginTop}
                      onChange={(e) => setExportSettings({...exportSettings, marginTop: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="marginBottom">নিচের মার্জিন (সে.মি.)</Label>
                    <Input
                      id="marginBottom"
                      value={exportSettings.marginBottom}
                      onChange={(e) => setExportSettings({...exportSettings, marginBottom: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="marginLeft">বাম মার্জিন (সে.মি.)</Label>
                    <Input
                      id="marginLeft"
                      value={exportSettings.marginLeft}
                      onChange={(e) => setExportSettings({...exportSettings, marginLeft: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="marginRight">ডান মার্জিন (সে.মি.)</Label>
                    <Input
                      id="marginRight"
                      value={exportSettings.marginRight}
                      onChange={(e) => setExportSettings({...exportSettings, marginRight: e.target.value})}
                    />
                  </div>
                </div>

                <Separator />

                {/* Font & Spacing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fontSize">ফন্ট সাইজ (pt)</Label>
                    <Select
                      value={exportSettings.fontSize}
                      onValueChange={(value) => setExportSettings({...exportSettings, fontSize: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">১০</SelectItem>
                        <SelectItem value="11">১১</SelectItem>
                        <SelectItem value="12">১২</SelectItem>
                        <SelectItem value="14">১৪</SelectItem>
                        <SelectItem value="16">১৬</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lineSpacing">লাইনের ফাঁক</Label>
                    <Select
                      value={exportSettings.lineSpacing}
                      onValueChange={(value) => setExportSettings({...exportSettings, lineSpacing: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">১.০</SelectItem>
                        <SelectItem value="1.15">১.১৫</SelectItem>
                        <SelectItem value="1.5">১.৫</SelectItem>
                        <SelectItem value="2">২.০</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Page Numbers */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="pageNumbers">পৃষ্ঠা নম্বর যোগ করুন</Label>
                  <Switch
                    id="pageNumbers"
                    checked={exportSettings.pageNumbers}
                    onCheckedChange={(checked) => setExportSettings({...exportSettings, pageNumbers: checked})}
                  />
                </div>

                {exportSettings.pageNumbers && (
                  <div>
                    <Label htmlFor="pageNumberFormat">পৃষ্ঠা নম্বর ফরম্যাট</Label>
                    <Select
                      value={exportSettings.pageNumberFormat}
                      onValueChange={(value) => setExportSettings({...exportSettings, pageNumberFormat: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bengali">বাংলা (১, ২, ৩...)</SelectItem>
                        <SelectItem value="english">ইংরেজি (1, 2, 3...)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Separator />

                {/* Header & Footer */}
                <div>
                  <Label htmlFor="header">হেডার টেক্সট (ঐচ্ছিক)</Label>
                  <Input
                    id="header"
                    placeholder="প্রতি পৃষ্ঠার উপরে প্রদর্শিত হবে"
                    value={exportSettings.header}
                    onChange={(e) => setExportSettings({...exportSettings, header: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="footer">ফুটার টেক্সট (ঐচ্ছিক)</Label>
                  <Input
                    id="footer"
                    placeholder="প্রতি পৃষ্ঠার নিচে প্রদর্শিত হবে"
                    value={exportSettings.footer}
                    onChange={(e) => setExportSettings({...exportSettings, footer: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generation Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>ডকুমেন্ট জেনারেট করুন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isGenerated && !isGenerating && (
                  <Button onClick={handleGenerate} className="w-full" size="lg">
                    <Download className="h-5 w-5 mr-2" />
                    জেনারেট করুন
                  </Button>
                )}

                {isGenerating && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        ডকুমেন্ট প্রস্তুত করা হচ্ছে...
                      </p>
                      <Progress value={generationProgress} className="w-full" />
                      <p className="text-xs text-muted-foreground mt-2">
                        {generationProgress}% সম্পন্ন
                      </p>
                    </div>
                  </div>
                )}

                {isGenerated && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2">
                        ডকুমেন্ট তৈরি সম্পন্ন!
                      </h3>
                      <p className="text-sm text-green-600">
                        আপনার আবেদনপত্র সফলভাবে জেনারেট হয়েছে।
                      </p>
                    </div>

                    {/* Download & Share Options */}
                    <div className="space-y-3">
                      <Button onClick={handleDownload} className="w-full" variant="default">
                        <Download className="h-4 w-4 mr-2" />
                        ডাউনলোড করুন
                      </Button>

                      <Button onClick={() => handleShare('print')} className="w-full" variant="outline">
                        <Printer className="h-4 w-4 mr-2" />
                        প্রিন্ট করুন
                      </Button>

                      <div className="grid grid-cols-2 gap-2">
                        <Button onClick={() => handleShare('email')} variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          ইমেইল
                        </Button>
                        <Button onClick={() => handleShare('link')} variant="outline" size="sm">
                          <Link2 className="h-4 w-4 mr-2" />
                          লিংক শেয়ার
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="text-sm text-muted-foreground">
                      <p>• ডকুমেন্টটি স্বয়ংক্রিয়ভাবে কেসের ডকুমেন্টস সেকশনে যোগ হয়েছে</p>
                      <p>• স্ট্যাটাস: <span className="text-green-600 font-medium">Generated</span></p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationExport;