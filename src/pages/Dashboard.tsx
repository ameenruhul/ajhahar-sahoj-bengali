import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit,
  Calendar,
  FileText,
  Users,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

interface CaseData {
  id: string;
  clientName: string;
  caseNumber: string;
  lastUpdated: string;
  status: "draft" | "ready" | "generated";
  createdAt: string;
}

const mockCases: CaseData[] = [
  {
    id: "1",
    clientName: "মোহাম্মদ রহিম",
    caseNumber: "CASE-001",
    lastUpdated: "২০২৪-১২-১৫",
    status: "draft",
    createdAt: "২০২৪-১২-১০"
  },
  {
    id: "2", 
    clientName: "ফাতেমা খাতুন",
    caseNumber: "CASE-002",
    lastUpdated: "২০২৪-১২-১৪",
    status: "ready",
    createdAt: "২০২৪-১২-০৮"
  },
  {
    id: "3",
    clientName: "আব্দুল করিম",
    caseNumber: "CASE-003", 
    lastUpdated: "২০২৪-১২-১৩",
    status: "generated",
    createdAt: "২০২৪-১২-০৫"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "draft":
      return <Badge variant="secondary">খসড়া</Badge>;
    case "ready":
      return <Badge variant="outline" className="text-warning">প্রস্তুত</Badge>;
    case "generated":
      return <Badge variant="default" className="bg-success">সম্পূর্ণ</Badge>;
    default:
      return <Badge variant="secondary">অজানা</Badge>;
  }
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filteredCases = mockCases.filter(caseItem => {
    const matchesSearch = caseItem.clientName.includes(searchTerm) || 
                         caseItem.caseNumber.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCases = mockCases.length;
  const draftCases = mockCases.filter(c => c.status === "draft").length;
  const readyCases = mockCases.filter(c => c.status === "ready").length;
  const completedCases = mockCases.filter(c => c.status === "generated").length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <DashboardSidebar currentRoute="/dashboard" />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">ড্যাশবোর্ড</h1>
              <p className="text-muted-foreground">আপনার সব মামলা ও ক্লায়েন্টের তথ্য</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">মোট মামলা</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCases}</div>
                <p className="text-xs text-muted-foreground">
                  সব মামলার সংখ্যা
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">খসড়া মামলা</CardTitle>
                <Edit className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{draftCases}</div>
                <p className="text-xs text-muted-foreground">
                  কাজ চলমান
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">প্রস্তুত</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{readyCases}</div>
                <p className="text-xs text-muted-foreground">
                  আজহারের জন্য প্রস্তুত
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">সম্পূর্ণ</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedCases}</div>
                <p className="text-xs text-muted-foreground">
                  আজহার তৈরি হয়েছে
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                    <Plus className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">নতুন ক্লায়েন্ট যোগ করুন</h3>
                    <p className="text-sm text-muted-foreground">নতুন মামলা শুরু করুন</p>
                  </div>
                  <Button 
                    onClick={() => navigate("/clients/new")}
                    className="ml-auto"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary rounded-lg">
                    <FileText className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">শেষ ড্রাফ্ট চালিয়ে যান</h3>
                    <p className="text-sm text-muted-foreground">অসম্পূর্ণ কাজ সম্পন্ন করুন</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle>সব মামলা</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="নাম, ফোন বা কেস নম্বর দিয়ে খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="অবস্থা ফিল্টার" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব অবস্থা</SelectItem>
                    <SelectItem value="draft">খসড়া</SelectItem>
                    <SelectItem value="ready">প্রস্তুত</SelectItem>
                    <SelectItem value="generated">সম্পূর্ণ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cases Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ক্লায়েন্ট নাম</TableHead>
                      <TableHead>কেস নম্বর</TableHead>
                      <TableHead>শেষ আপডেট</TableHead>
                      <TableHead>অবস্থা</TableHead>
                      <TableHead className="text-right">কার্যক্রম</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCases.map((caseItem) => (
                      <TableRow key={caseItem.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {caseItem.clientName}
                        </TableCell>
                        <TableCell>{caseItem.caseNumber}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{caseItem.lastUpdated}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(caseItem.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/case/summary-questions/${caseItem.id}`)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              খুলুন
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/case/final-overview/${caseItem.id}`)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              প্রিভিউ
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredCases.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">কোন মামলা পাওয়া যায়নি</h3>
                  <p className="text-muted-foreground mb-4">আপনার সার্চ অনুযায়ী কোন মামলা খুঁজে পাওয়া যায়নি</p>
                  <Button onClick={() => navigate("/clients/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    নতুন মামলা শুরু করুন
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;