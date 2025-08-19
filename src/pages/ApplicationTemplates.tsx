import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Copy, 
  Archive, 
  Upload, 
  Edit3,
  Clock,
  Tag,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  name: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft' | 'archived';
  version: string;
  lastModified: string;
  author: string;
  description: string;
  usageCount: number;
}

const ApplicationTemplates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const templates: Template[] = [
    {
      id: '1',
      name: 'অনুসন্ধান মামলার আবেদন',
      category: 'ফৌজদারি',
      tags: ['মামলা', 'অনুসন্ধান', 'থানা'],
      status: 'published',
      version: '২.১',
      lastModified: '২০২৫-০৮-১৫',
      author: 'ব্যারিস্টার রহমান',
      description: 'থানায় অনুসন্ধান মামলা দায়ের করার জন্য প্রয়োজনীয় আবেদনপত্র',
      usageCount: 45
    },
    {
      id: '2',
      name: 'জামিনের আবেদন',
      category: 'ফৌজদারি',
      tags: ['জামিন', 'মুক্তি', 'আদালত'],
      status: 'published',
      version: '১.৫',
      lastModified: '২০২৫-০৮-১০',
      author: 'আইনজীবী করিম',
      description: 'আদালতে জামিনের আবেদন করার জন্য টেমপ্লেট',
      usageCount: 32
    },
    {
      id: '3',
      name: 'দেওয়ানি মামলার দরখাস্ত',
      category: 'দেওয়ানি',
      tags: ['দেওয়ানি', 'মামলা', 'সম্পত্তি'],
      status: 'draft',
      version: '১.০',
      lastModified: '২০২৫-০৮-০৫',
      author: 'আইনজীবী আলী',
      description: 'দেওয়ানি আদালতে মামলা দায়ের করার জন্য দরখাস্ত',
      usageCount: 8
    },
    {
      id: '4',
      name: 'রিট পিটিশন',
      category: 'প্রশাসনিক',
      tags: ['রিট', 'হাইকোর্ট', 'প্রশাসনিক'],
      status: 'published',
      version: '৩.০',
      lastModified: '২০২৫-০৮-১২',
      author: 'সিনিয়র আইনজীবী খান',
      description: 'হাইকোর্টে রিট পিটিশন দায়ের করার টেমপ্লেট',
      usageCount: 15
    }
  ];

  const categories = ['ফৌজদারি', 'দেওয়ানি', 'প্রশাসনিক', 'থানা পর্যায়', 'পারিবারিক'];
  const statuses = [
    { value: 'published', label: 'প্রকাশিত' },
    { value: 'draft', label: 'খসড়া' },
    { value: 'archived', label: 'সংরক্ষিত' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || template.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAction = (action: string, templateId: string, templateName: string) => {
    switch (action) {
      case 'edit':
        navigate(`/applications/templates/${templateId}/edit`);
        break;
      case 'duplicate':
        toast({
          title: "টেমপ্লেট কপি করা হয়েছে",
          description: `"${templateName}" এর একটি কপি তৈরি করা হয়েছে।`,
        });
        break;
      case 'archive':
        toast({
          title: "টেমপ্লেট সংরক্ষণ",
          description: `"${templateName}" সংরক্ষণ করা হয়েছে।`,
        });
        break;
      case 'publish':
        toast({
          title: "টেমপ্লেট প্রকাশ",
          description: `"${templateName}" প্রকাশ করা হয়েছে।`,
        });
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'প্রকাশিত';
      case 'draft':
        return 'খসড়া';
      case 'archived':
        return 'সংরক্ষিত';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              টেমপ্লেট লাইব্রেরি
            </h1>
            <p className="text-muted-foreground mt-2">
              আবেদনপত্রের টেমপ্লেট তৈরি ও পরিচালনা করুন
            </p>
          </div>
          <Button onClick={() => navigate('/applications/templates/new')}>
            <Plus className="h-4 w-4 mr-2" />
            নতুন টেমপ্লেট
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="টেমপ্লেট অনুসন্ধান করুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="ক্যাটাগরি নির্বাচন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="স্ট্যাটাস" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 line-clamp-2">
                      {template.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                      <Badge 
                        className={`text-xs ${getStatusColor(template.status)}`}
                      >
                        {getStatusLabel(template.status)}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction('edit', template.id, template.name)}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        সম্পাদনা
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('duplicate', template.id, template.name)}>
                        <Copy className="h-4 w-4 mr-2" />
                        ডুপ্লিকেট
                      </DropdownMenuItem>
                      {template.status === 'draft' && (
                        <DropdownMenuItem onClick={() => handleAction('publish', template.id, template.name)}>
                          <Upload className="h-4 w-4 mr-2" />
                          প্রকাশ করুন
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleAction('archive', template.id, template.name)}>
                        <Archive className="h-4 w-4 mr-2" />
                        সংরক্ষণ
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>লেখক: {template.author}</span>
                    <span>ভার্সন: {template.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {template.lastModified}
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      {template.usageCount} বার ব্যবহৃত
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                কোন টেমপ্লেট পাওয়া যায়নি
              </h3>
              <p className="text-muted-foreground mb-4">
                আপনার অনুসন্ধান অনুযায়ী কোন টেমপ্লেট খুঁজে পাওয়া যায়নি।
              </p>
              <Button onClick={() => navigate('/applications/templates/new')}>
                <Plus className="h-4 w-4 mr-2" />
                নতুন টেমপ্লেট তৈরি করুন
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApplicationTemplates;