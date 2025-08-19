import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, FileText, Eye, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for applications
const mockApplications = [
  {
    id: "1",
    title: "সময় প্রার্থনার আবেদন",
    caseNumber: "GR-123/2024",
    clientName: "মোহাম্মদ রহিম",
    recipient: "মহোদয় বিচারক",
    court: "চট্টগ্রাম জজ আদালত",
    status: "খসড়া",
    lastUpdate: "২৫ জানুয়ারি ২০২৪",
    type: "সময় প্রার্থনা"
  },
  {
    id: "2", 
    title: "জামিন আবেদন",
    caseNumber: "CR-456/2024",
    clientName: "ফাতেমা খাতুন",
    recipient: "মাননীয় ম্যাজিস্ট্রেট",
    court: "ঢাকা মেট্রো ম্যাজিস্ট্রেট আদালত",
    status: "জেনারেটেড",
    lastUpdate: "২৪ জানুয়ারি ২০২৪",
    type: "জামিন আবেদন"
  },
  {
    id: "3",
    title: "নথি সংযুক্তির আবেদন", 
    caseNumber: "GR-789/2024",
    clientName: "আহমেদ হাসান",
    recipient: "মহোদয় বিচারক",
    court: "সিলেট জজ আদালত",
    status: "অনুমোদিত",
    lastUpdate: "২৩ জানুয়ারি ২০২৪",
    type: "নথি সংযুক্তি"
  }
];

const Applications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "খসড়া": return "secondary";
      case "অনুমোদিত": return "default";
      case "জেনারেটেড": return "outline";
      default: return "secondary";
    }
  };

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = searchTerm === "" || 
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesType = typeFilter === "all" || app.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">আবেদনসমূহ</h1>
                <p className="text-muted-foreground">সব আবেদন দেখুন এবং পরিচালনা করুন</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/applications/templates")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  টেমপ্লেট লাইব্রেরি
                </Button>
                <Button onClick={() => navigate("/case/new/applications/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন আবেদন
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  খুঁজুন ও ফিল্টার করুন
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="কেস নম্বর, ক্লায়েন্ট নাম বা আবেদন টাইপ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="col-span-1 md:col-span-2"
                  />
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="অবস্থা নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব অবস্থা</SelectItem>
                      <SelectItem value="খসড়া">খসড়া</SelectItem>
                      <SelectItem value="অনুমোদিত">অনুমোদিত</SelectItem>
                      <SelectItem value="জেনারেটেড">জেনারেটেড</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="আবেদনের ধরণ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব ধরণ</SelectItem>
                      <SelectItem value="সময় প্রার্থনা">সময় প্রার্থনা</SelectItem>
                      <SelectItem value="জামিন আবেদন">জামিন আবেদন</SelectItem>
                      <SelectItem value="নথি সংযুক্তি">নথি সংযুক্তি</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Applications Table */}
            <Card>
              <CardHeader>
                <CardTitle>আবেদনের তালিকা ({filteredApplications.length}টি)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>আবেদনের শিরোনাম</TableHead>
                      <TableHead>কেস</TableHead>
                      <TableHead>রিসিপিয়েন্ট</TableHead>
                      <TableHead>আদালত</TableHead>
                      <TableHead>স্ট্যাটাস</TableHead>
                      <TableHead>শেষ আপডেট</TableHead>
                      <TableHead>অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{app.title}</div>
                            <div className="text-sm text-muted-foreground">{app.clientName}</div>
                          </div>
                        </TableCell>
                        <TableCell>{app.caseNumber}</TableCell>
                        <TableCell>{app.recipient}</TableCell>
                        <TableCell>{app.court}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(app.status)}>
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{app.lastUpdate}</TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredApplications.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    কোনো আবেদন পাওয়া যায়নি
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Applications;