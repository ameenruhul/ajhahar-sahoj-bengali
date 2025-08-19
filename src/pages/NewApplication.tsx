import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, FileText, ArrowRight, Info } from "lucide-react";

const NewApplication = () => {
  const { caseId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Mock templates data
  const applicationTemplates = [
    {
      id: "1",
      title: "সময় প্রার্থনা/স্থগিতের আবেদন",
      category: "সাধারণ",
      description: "শুনানির তারিখ পরিবর্তন বা স্থগিতের জন্য আবেদন",
      requiredFields: ["শুনানির তারিখ", "কারণ", "প্রস্তাবিত তারিখ"],
      tags: ["সময়", "স্থগিত", "তারিখ"],
      usage: "উচ্চ"
    },
    {
      id: "2", 
      title: "তালিকাভুক্তির আবেদন",
      category: "প্রাথমিক",
      description: "মামলা তালিকাভুক্তির জন্য আবেদন",
      requiredFields: ["মামলার বিষয়", "পক্ষগণ", "কারণ দর্শানো"],
      tags: ["তালিকা", "নথিভুক্তি"],
      usage: "মধ্যম"
    },
    {
      id: "3",
      title: "নথি সংযুক্তির আবেদন", 
      category: "নথিপত্র",
      description: "অতিরিক্ত নথি বা সাক্ষ্য সংযুক্তির আবেদন",
      requiredFields: ["নথির বিবরণ", "সংযুক্তির কারণ", "নথির তালিকা"],
      tags: ["নথি", "সংযুক্তি", "সাক্ষ্য"],
      usage: "উচ্চ"
    },
    {
      id: "4",
      title: "জামিন আবেদন",
      category: "ফৌজদারি",
      description: "জামিনের জন্য সাধারণ আবেদন (জুরিসডিকশন নিরপেক্ষ)",
      requiredFields: ["অভিযোগের বিবরণ", "জামিনের কারণ", "জামিনদারের তথ্য"],
      tags: ["জামিন", "ফৌজদারি", "মুক্তি"],
      usage: "উচ্চ"
    },
    {
      id: "5",
      title: "শোকজের জবাব",
      category: "প্রতিরক্ষা",
      description: "বিপক্ষের শোকজের জবাব প্রদানের আবেদন",
      requiredFields: ["শোকজের বিষয়", "জবাবের ভিত্তি", "প্রমাণাদি"],
      tags: ["জবাব", "শোকজ", "প্রতিরক্ষা"],
      usage: "মধ্যম"
    },
    {
      id: "6",
      title: "তারিখ পরিবর্তনের আবেদন",
      category: "সাধারণ", 
      description: "নির্ধারিত তারিখ পরিবর্তনের আবেদন",
      requiredFields: ["বর্তমান তারিখ", "পরিবর্তনের কারণ", "প্রস্তাবিত তারিখ"],
      tags: ["তারিখ", "পরিবর্তন", "সময়সূচি"],
      usage: "উচ্চ"
    },
    {
      id: "7",
      title: "প্রত্যাহারের আবেদন",
      category: "বিশেষ",
      description: "মামলা বা আবেদন প্রত্যাহারের জন্য আবেদন",
      requiredFields: ["প্রত্যাহারের বিষয়", "কারণ", "সম্মতিপত্র"],
      tags: ["প্রত্যাহার", "বাতিল", "সমাপ্তি"],
      usage: "কম"
    },
    {
      id: "8",
      title: "সার্টিফাইড কপি আবেদন",
      category: "নথিপত্র",
      description: "আদালতের নথির সার্টিফাইড কপির আবেদন",
      requiredFields: ["নথির বিবরণ", "প্রয়োজনীয়তার কারণ", "কপির সংখ্যা"],
      tags: ["কপি", "সার্টিফাইড", "নথি"],
      usage: "মধ্যম"
    }
  ];

  const categories = ["all", "সাধারণ", "প্রাথমিক", "নথিপত্র", "ফৌজদারি", "প্রতিরক্ষা", "বিশেষ"];

  const filteredTemplates = applicationTemplates.filter(template => {
    const matchesSearch = searchTerm === "" || 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const selectedTemplateData = selectedTemplate ? 
    applicationTemplates.find(t => t.id === selectedTemplate) : null;

  const getUsageBadgeVariant = (usage: string) => {
    switch (usage) {
      case "উচ্চ": return "default";
      case "মধ্যম": return "secondary";
      case "কম": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">নতুন আবেদন তৈরি করুন</h1>
                <p className="text-muted-foreground">
                  স্টেপ ১: আবেদনের ধরণ নির্বাচন করুন (কেস: {caseId})
                </p>
              </div>
            </div>

            {/* Legal Disclaimer */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>গুরুত্বপূর্ণ দ্রষ্টব্য:</strong> এই টেমপ্লেটগুলি শুধুমাত্র তথ্যগত উদ্দেশ্যে প্রদান করা হয়েছে এবং এগুলি আইনি পরামর্শ নয়। 
                ব্যবহারের পূর্বে অবশ্যই যোগ্য আইনজীবীর পর্যালোচনা ও অনুমোদন নিন।
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Templates Selection */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Search and Filter */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="আবেদনের ধরণ খুঁজুন..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="ক্যাটাগরি" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                          {categories.slice(1).map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTemplates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                          <div className="flex gap-1">
                            <Badge variant="outline" className="text-xs">
                              {template.category}
                            </Badge>
                            <Badge variant={getUsageBadgeVariant(template.usage)} className="text-xs">
                              {template.usage}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          {template.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredTemplates.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>কোনো টেমপ্লেট পাওয়া যায়নি</p>
                  </div>
                )}
              </div>

              {/* Template Preview */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>টেমপ্লেট প্রিভিউ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedTemplateData ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">{selectedTemplateData.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedTemplateData.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">প্রয়োজনীয় ফিল্ডসমূহ:</h4>
                          <ul className="space-y-1">
                            {selectedTemplateData.requiredFields.map((field, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                                {field}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4">
                          <Button className="w-full" disabled={!selectedTemplate}>
                            <ArrowRight className="h-4 w-4 mr-2" />
                            পরবর্তী ধাপে যান
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">একটি টেমপ্লেট নির্বাচন করুন</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewApplication;