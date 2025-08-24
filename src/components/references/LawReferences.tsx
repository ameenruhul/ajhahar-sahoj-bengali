import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Plus,
  FileText,
  Scale,
  Gavel
} from "lucide-react";

interface LawReference {
  id: string;
  title: string;
  bengaliTitle: string;
  section: string;
  category: string;
  description: string;
  relevance: "high" | "medium" | "low";
}

const lawReferences: LawReference[] = [
  {
    id: "1",
    title: "Penal Code 1860",
    bengaliTitle: "দণ্ডবিধি ১৮৬০",
    section: "Section 378 - Theft",
    category: "criminal",
    description: "চুরির ক্ষেত্রে প্রযোজ্য আইন। যে কেউ অন্যের অস্থাবর সম্পত্তি অসৎ উদ্দেশ্যে নিয়ে নিলে তা চুরি হিসেবে গণ্য। শাস্তি: ৩ বছর পর্যন্ত কারাদণ্ড বা জরিমানা অথবা উভয়।",
    relevance: "high"
  },
  {
    id: "2",
    title: "Code of Criminal Procedure 1898",
    bengaliTitle: "ফৌজদারি কার্যবিধি ১৮৯৮",
    section: "Section 154 - FIR",
    category: "procedure",
    description: "প্রাথমিক তথ্য প্রতিবেদন (FIR/আজহার) দায়ের করার নিয়মকানুন। ২৪ ঘন্টার মধ্যে থানায় লিখিত অভিযোগ দাখিল করতে হবে।",
    relevance: "high"
  },
  {
    id: "3",
    title: "Evidence Act 1872",
    bengaliTitle: "সাক্ষ্য আইন ১৮৭২",
    section: "Section 60 - Oral Evidence",
    category: "evidence",
    description: "আদালতে মৌখিক সাক্ষ্য প্রমাণ উপস্থাপনের নিয়মাবলী। সাক্ষীদের বিবৃতি ও ডিজিটাল প্রমাণ সংক্রান্ত।",
    relevance: "high"
  },
  {
    id: "4",
    title: "Contract Act 1872",
    bengaliTitle: "চুক্তি আইন ১৮৭২",
    section: "Section 73 - Compensation",
    category: "civil",
    description: "চুক্তি ভঙ্গের ক্ষেত্রে ক্ষতিপূরণের বিধান। ক্রেতা-বিক্রেতার মধ্যে লেনদেন সংক্রান্ত।",
    relevance: "medium"
  },
  {
    id: "5",
    title: "Information and Communication Technology Act 2006",
    bengaliTitle: "তথ্য ও যোগাযোগ প্রযুক্তি আইন ২০০৬",
    section: "Section 65B - Electronic Evidence",
    category: "evidence", 
    description: "ডিজিটাল/ইলেকট্রনিক প্রমাণ (সিসিটিভি ফুটেজ) আদালতে গ্রহণযোগ্যতার শর্তাবলী।",
    relevance: "high"
  },
  {
    id: "6",
    title: "Police Act 1861",
    bengaliTitle: "পুলিশ আইন ১৮৬১",
    section: "Section 25 - Police Duties",
    category: "procedure",
    description: "পুলিশের দায়িত্ব ও কর্তব্য। অপরাধ তদন্ত ও গ্রেফতার সংক্রান্ত ক্ষমতা।",
    relevance: "medium"
  }
];

const categories = [
  { id: "all", name: "সব", color: "default" },
  { id: "criminal", name: "ফৌজদারি", color: "destructive" },
  { id: "civil", name: "দেওয়ানি", color: "default" },
  { id: "procedure", name: "কার্যবিধি", color: "secondary" },
  { id: "evidence", name: "সাক্ষ্য", color: "outline" }
];

export function LawReferences() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("criminal");
  const [selectedReferences, setSelectedReferences] = useState<string[]>(["1", "2", "3", "5"]);

  const filteredReferences = lawReferences.filter(ref => {
    const matchesSearch = ref.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ref.bengaliTitle.includes(searchTerm) ||
                         ref.description.includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || ref.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleReference = (refId: string) => {
    setSelectedReferences(prev => 
      prev.includes(refId) 
        ? prev.filter(id => id !== refId)
        : [...prev, refId]
    );
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <BookOpen className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">আইনি রেফারেন্স</h1>
          <p className="text-muted-foreground">Relevant Law References & Legal Advice</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search and Filters */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>অনুসন্ধান ও ফিল্টার</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="আইন বা বিষয় খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">ক্যাটেগরি</h4>
                <div className="space-y-1">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">নির্বাচিত রেফারেন্স</h4>
                <Badge variant="outline">
                  {selectedReferences.length} টি নির্বাচিত
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* References List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>প্রাসঙ্গিক আইন ({filteredReferences.length})</span>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  রেফারেন্স যোগ করুন
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredReferences.map(ref => (
                    <Card key={ref.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="font-semibold">{ref.bengaliTitle}</h3>
                              <p className="text-sm text-muted-foreground">{ref.title}</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">
                                  <Gavel className="h-3 w-3 mr-1" />
                                  {ref.section}
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={getRelevanceColor(ref.relevance)}
                                >
                                  {ref.relevance === "high" ? "অত্যন্ত প্রাসঙ্গিক" : 
                                   ref.relevance === "medium" ? "প্রাসঙ্গিক" : "কম প্রাসঙ্গিক"}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant={selectedReferences.includes(ref.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleReference(ref.id)}
                            >
                              {selectedReferences.includes(ref.id) ? "নির্বাচিত" : "নির্বাচন করুন"}
                            </Button>
                          </div>

                          <p className="text-sm leading-relaxed">{ref.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Scale className="h-4 w-4 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {ref.category === "criminal" ? "ফৌজদারি আইন" :
                                 ref.category === "civil" ? "দেওয়ানি আইন" :
                                 ref.category === "procedure" ? "কার্যবিধি" : "সাক্ষ্য আইন"}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              বিস্তারিত
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Legal Advice Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>প্রাথমিক আইনি পরামর্শ</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-accent/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">আপনার মামলার ভিত্তিতে প্রাথমিক পরামর্শ:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>দ্রুত থানায় আজহার/এফআইআর দায়ের করুন (২৪ ঘন্টার মধ্যে)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>সব ধরনের প্রমাণ ও সাক্ষী সংগ্রহ করে রাখুন</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>অভিজ্ঞ আইনজীবীর সাথে পরামর্শ নিন</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>মেডিকেল চেকআপ করান (যদি শারীরিক ক্ষতি হয়ে থাকে)</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}