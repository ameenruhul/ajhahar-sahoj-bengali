import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, FileText, Eye, Edit, Clock, User, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaseApplications = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();

  // Mock case data
  const caseData = {
    id: caseId,
    number: "GR-123/2024",
    client: {
      name: "মোহাম্মদ রহিম",
      phone: "০১৭১২৩৪৫৬৭৮",
      address: "১২৩ মতিঝিল, ঢাকা-১০০০"
    },
    summary: "একটি জটিল দেওয়ানি মামলা যেখানে সম্পত্তির মালিকানা নিয়ে বিরোধ রয়েছে। বাদী দাবি করেছেন যে বিবাদী অবৈধভাবে তার জমি দখল করে রেখেছে।",
    court: "চট্টগ্রাম জজ আদালত",
    status: "চলমান"
  };

  // Mock applications for this case
  const caseApplications = [
    {
      id: "1",
      title: "সময় প্রার্থনার আবেদন",
      type: "সময় প্রার্থনা",
      status: "খসড়া",
      createdDate: "২৫ জানুয়ারি ২০২৪",
      lastUpdate: "২৫ জানুয়ারি ২০২৪",
      version: "১.০"
    },
    {
      id: "2",
      title: "নথি সংযুক্তির আবেদন",
      type: "নথি সংযুক্তি", 
      status: "জেনারেটেড",
      createdDate: "২০ জানুয়ারি ২০২৪",
      lastUpdate: "২২ জানুয়ারি ২০২৪",
      version: "২.১"
    }
  ];

  // Mock case updates/timeline
  const caseUpdates = [
    {
      id: "1",
      date: "২৫ জানুয়ারি ২০২৪",
      title: "শুনানির তারিখ পরিবর্তন",
      description: "আদালত শুনানির তারিখ ৩০ জানুয়ারি থেকে ৫ ফেব্রুয়ারিতে পরিবর্তন করেছেন",
      tag: "শুনানি",
      selected: false
    },
    {
      id: "2", 
      date: "২২ জানুয়ারি ২০২৪",
      title: "নতুন সাক্ষী তথ্য",
      description: "বিবাদী পক্ষ নতুন সাক্ষী উপস্থাপন করেছে",
      tag: "সাক্ষী",
      selected: false
    },
    {
      id: "3",
      date: "২০ জানুয়ারি ২০২৪", 
      title: "নথি জমা",
      description: "বাদী পক্ষের সব প্রয়োজনীয় নথি জমা দেওয়া হয়েছে",
      tag: "নথি",
      selected: true
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "খসড়া": return "secondary";
      case "অনুমোদিত": return "default";
      case "জেনারেটেড": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Case Summary Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Case Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    কেস সামারি
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">কেস নম্বর</div>
                    <div className="font-medium">{caseData.number}</div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <User className="h-4 w-4" />
                      ক্লায়েন্ট
                    </div>
                    <div className="font-medium">{caseData.client.name}</div>
                    <div className="text-sm text-muted-foreground">{caseData.client.phone}</div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm text-muted-foreground">আদালত</div>
                    <div className="font-medium">{caseData.court}</div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm text-muted-foreground">সারসংক্ষেপ</div>
                    <div className="text-sm leading-relaxed">{caseData.summary}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline/Updates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    টাইমলাইন ও আপডেটস
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {caseUpdates.map((update) => (
                      <div 
                        key={update.id}
                        className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{update.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {update.description}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                              {update.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {update.tag}
                            </Badge>
                            <Button size="sm" variant="ghost" className="h-6 w-16 text-xs">
                              ইনসার্ট
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Page Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">কেস আবেদনসমূহ</h1>
                  <p className="text-muted-foreground">কেস {caseData.number} এর সব আবেদন</p>
                </div>
                <Button onClick={() => navigate(`/case/${caseId}/applications/new`)}>
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন আবেদন
                </Button>
              </div>

              {/* Applications List */}
              <Card>
                <CardHeader>
                  <CardTitle>আবেদনের ইতিহাস ({caseApplications.length}টি)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseApplications.map((app) => (
                      <div key={app.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium">{app.title}</h3>
                              <Badge variant={getStatusBadgeVariant(app.status)}>
                                {app.status}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                v{app.version}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div>
                                <span className="font-medium">তৈরি:</span> {app.createdDate}
                              </div>
                              <div>
                                <span className="font-medium">শেষ আপডেট:</span> {app.lastUpdate}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {app.status === "খসড়া" && (
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {caseApplications.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        এই কেসের জন্য এখনও কোনো আবেদন তৈরি করা হয়নি
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CaseApplications;