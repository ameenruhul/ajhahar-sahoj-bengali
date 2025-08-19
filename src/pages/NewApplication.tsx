import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import CaseLoader from '@/components/forms/CaseLoader';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Search, FileText, ArrowRight, Info, ArrowLeft, Plus, X, User, Scale, BookOpen, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewApplication = () => {
  const { caseId } = useParams();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  // References for text insertion
  const factsRef = useRef<HTMLTextAreaElement>(null);
  const groundsRef = useRef<HTMLTextAreaElement>(null);
  const prayerRef = useRef<HTMLTextAreaElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  
  // Step 2 form data
  const [recipientType, setRecipientType] = useState("");
  const [courtName, setCourtName] = useState("");
  const [customCourt, setCustomCourt] = useState("");
  const [bench, setBench] = useState("");
  const [district, setDistrict] = useState("");
  const [subject, setSubject] = useState("");
  const [ccRecipients, setCcRecipients] = useState<string[]>([]);
  const [newCcRecipient, setNewCcRecipient] = useState("");
  
  // Step 3 form data
  const [autoFillFromCase, setAutoFillFromCase] = useState(true);
  
  // Mock case data for the Case Loader
  const caseLoaderData = {
    id: caseId || '1',
    caseNumber: 'GR Case No. 123/2025',
    clientName: 'মোহাম্মদ করিম উদ্দিন',
    clientPhone: '০১৭০০০০০০০০',
    court: 'জুডিশিয়াল ম্যাজিস্ট্রেট আদালত, ঢাকা',
    status: 'Active',
    summary: 'এটি একটি অনুসন্ধান মামলার সংক্ষিপ্ত বিবরণ। ঘটনার মূল বিষয়বস্তু এবং প্রাথমিক তথ্যাদি।',
    story: 'ঘটনার বিস্তারিত বিবরণ: তারিখ, সময়, স্থান এবং জড়িত ব্যক্তিদের সম্পূর্ণ তথ্য। সাক্ষী এবং প্রমাণাদির বিবরণ।',
    references: 'দণ্ডবিধি ১৮৬০ এর ধারা ৩০২, ৩০৭। ফৌজদারি কার্যবিধি ১৮৯৮ এর ধারা ১৫৪। প্রাসঙ্গিক মামলার রায়।',
    positiveAspects: 'শক্তিশালী সাক্ষ্য প্রমাণ রয়েছে। আইনি দিক থেকে অনুকূল অবস্থান। পূর্ববর্তী রায়ের সমর্থন।',
    negativeAspects: 'কিছু সাক্ষীর বিশ্বসযোগ্যতা নিয়ে সন্দেহ। বিপক্ষের শক্তিশালী আইনি অবস্থান। সময়ের সীমাবদ্ধতা।',
    updates: [
      {
        id: '1',
        title: 'নতুন সাক্ষী পাওয়া গেছে',
        content: 'ঘটনার প্রত্যক্ষদর্শী একজন নতুন সাক্ষী পাওয়া গেছে যিনি গুরুত্বপূর্ণ তথ্য প্রদান করতে পারেন।',
        date: '২০২৫-০৮-১৫',
        type: 'update' as const,
        selected: false
      },
      {
        id: '2',
        title: 'ডকুমেন্ট ভেরিফিকেশন সমস্যা',
        content: 'একটি গুরুত্বপূর্ণ ডকুমেন্টের সত্যতা যাচাই করা প্রয়োজন।',
        date: '২০২৫-০৮-১৪',
        type: 'issue' as const,
        selected: false
      },
      {
        id: '3',
        title: 'আদালত তারিখ নির্ধারণ',
        content: 'পরবর্তী শুনানির তারিখ ২৫ আগস্ট ২০২৫ নির্ধারণ করা হয়েছে।',
        date: '২০২৫-০৮-১২',
        type: 'update' as const,
        selected: false
      }
    ],
    documents: [
      {
        id: '1',
        name: 'জাতীয় পরিচয়পত্র.pdf',
        type: 'PDF',
        date: '২০২৫-০৮-১০',
        size: '২.৩ MB'
      },
      {
        id: '2',
        name: 'থানার রিপোর্ট.docx',
        type: 'Word',
        date: '২০২৫-০৮-০৮',
        size: '১.৮ MB'
      },
      {
        id: '3',
        name: 'সাক্ষীর বিবৃতি.pdf',
        type: 'PDF',
        date: '২০২৫-০৮-০৫',
        size: '৯৮৫ KB'
      }
    ]
  };
  
  const [caseUpdates, setCaseUpdates] = useState(caseLoaderData.updates);

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
  
  // Mock case data for Step 3
  const caseData = {
    client: {
      name: "মোহাম্মদ রহিম",
      phone: "০১৭১২৩৪৫৬৭৮",
      address: "১২৩ মতিঝিল, ঢাকা-১০০০",
      nid: "১২৩৪৫৬৭৮৯০"
    },
    summary: "একটি জটিল দেওয়ানি মামলা যেখানে সম্পত্তির মালিকানা নিয়ে বিরোধ রয়েছে।",
    story: "বাদী দাবি করেছেন যে বিবাদী অবৈধভাবে তার জমি দখল করে রেখেছে। ১৯৮৫ সালে বাদী উক্ত জমি ক্রয় করেন এবং নিয়মিত খাজনা প্রদান করে আসছেন।",
    legalReferences: "সম্পত্তি আইন ১৯৫০, দেওয়ানি কার্যবিধি ১৯০৮, রেজিস্ট্রেশন আইন ১৯০৮",
    positiveAspects: ["স্পষ্ট দলিল রয়েছে", "নিয়মিত খাজনা প্রদানের প্রমাণ", "দীর্ঘদিন দখলে"],
    negativeAspects: ["বিবাদী পক্ষের পাল্টা দাবি", "কিছু নথি অস্পষ্ট"],
    updates: [
      {
        id: "1",
        date: "২৫ জানুয়ারি ২০২৪",
        title: "শুনানির তারিখ পরিবর্তন",
        description: "আদালত শুনানির তারিখ পরিবর্তন করেছেন",
        tag: "শুনানি"
      },
      {
        id: "2",
        date: "২২ জানুয়ারি ২০২৪", 
        title: "নতুন সাক্ষী তথ্য",
        description: "বিবাদী পক্ষ নতুন সাক্ষী উপস্থাপন করেছে",
        tag: "সাক্ষী"
      }
    ]
  };

  const courtOptions = [
    "সুপ্রিম কোর্ট",
    "হাইকোর্ট",
    "জজ আদালত",
    "মেট্রো ম্যাজিস্ট্রেট আদালত",
    "জুডিশিয়াল ম্যাজিস্ট্রেট আদালত",
    "ট্রাইব্যুনাল",
    "থানা"
  ];

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

  const addCcRecipient = () => {
    if (newCcRecipient.trim() && !ccRecipients.includes(newCcRecipient.trim())) {
      setCcRecipients([...ccRecipients, newCcRecipient.trim()]);
      setNewCcRecipient("");
    }
  };

  const removeCcRecipient = (recipient: string) => {
    setCcRecipients(ccRecipients.filter(r => r !== recipient));
  };

  // Case Loader handlers
  const handleInsertText = (text: string, targetField?: string) => {
    // Insert text at current cursor position or in specific field
    if (targetField === 'subject' && subjectRef.current) {
      const input = subjectRef.current;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const currentValue = input.value;
      const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
      setSubject(newValue);
      // Set cursor position after inserted text
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + text.length, start + text.length);
      }, 0);
    } else {
      // For general insertion, we'll show a toast for now
      toast({
        title: "টেক্সট ইনসার্ট করা হয়েছে",
        description: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      });
    }
  };

  const handleUpdateSelection = (updateId: string, selected: boolean) => {
    setCaseUpdates(prev => 
      prev.map(update => 
        update.id === updateId ? { ...update, selected } : update
      )
    );
  };

  const handleAttachDocument = (documentId: string) => {
    const document = caseLoaderData.documents.find(doc => doc.id === documentId);
    if (document) {
      toast({
        title: "ডকুমেন্ট সংযুক্ত",
        description: `"${document.name}" সংযুক্তি তালিকায় যোগ করা হয়েছে।`,
      });
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-screen">
        <DashboardSidebar />
        
        {/* Case Loader Panel - Always visible */}
        {currentStep >= 2 && (
          <CaseLoader 
            caseData={{ ...caseLoaderData, updates: caseUpdates }}
            onInsertText={handleInsertText}
            onUpdateSelection={handleUpdateSelection}
            onAttachDocument={handleAttachDocument}
          />
        )}
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">নতুন আবেদন তৈরি করুন</h1>
                <p className="text-muted-foreground">
                  স্টেপ {currentStep}: {
                    currentStep === 1 ? "আবেদনের ধরণ নির্বাচন করুন" :
                    currentStep === 2 ? "যার উদ্দেশে আবেদন" :
                    "কেস থেকে তথ্য লোড করুন"
                  } (কেস: {caseId})
                </p>
              </div>
              <div className="flex gap-2">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    পূর্ববর্তী
                  </Button>
                )}
              </div>
            </div>

            {/* Step Progress */}
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? 'bg-primary text-primary-foreground border-primary' : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 mx-2 ${
                      step < currentStep ? 'bg-primary' : 'bg-muted-foreground'
                    }`} />
                  )}
                </div>
              ))}
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
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Step 1: Template Selection */}
                {currentStep === 1 && (
                  <>
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
                  </>
                )}

                {/* Step 2: Recipient & Court */}
                {currentStep === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>যার উদ্দেশে আবেদন</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Recipient Type */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">রিসিপিয়েন্ট টাইপ *</label>
                        <Select value={recipientType} onValueChange={setRecipientType}>
                          <SelectTrigger>
                            <SelectValue placeholder="নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="judge">বিচারক</SelectItem>
                            <SelectItem value="magistrate">ম্যাজিস্ট্রেট</SelectItem>
                            <SelectItem value="tribunal">ট্রাইব্যুনাল</SelectItem>
                            <SelectItem value="oc">ওসি</SelectItem>
                            <SelectItem value="registry">রেজিস্ট্রি</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Court Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">কোর্টের নাম *</label>
                          <Select value={courtName} onValueChange={setCourtName}>
                            <SelectTrigger>
                              <SelectValue placeholder="নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              {courtOptions.map(court => (
                                <SelectItem key={court} value={court}>{court}</SelectItem>
                              ))}
                              <SelectItem value="custom">অন্যান্য</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {courtName === "custom" && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">কাস্টম কোর্ট নাম</label>
                            <Input
                              value={customCourt}
                              onChange={(e) => setCustomCourt(e.target.value)}
                              placeholder="কোর্টের নাম লিখুন"
                            />
                          </div>
                        )}
                      </div>

                      {/* Bench and District */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">বেঞ্চ/শাখা</label>
                          <Input
                            value={bench}
                            onChange={(e) => setBench(e.target.value)}
                            placeholder="বেঞ্চ বা শাখার নাম"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">জেলা/সার্কেল</label>
                          <Input
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            placeholder="জেলা বা সার্কেলের নাম"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">বিষয়/Subject *</label>
                        <Input
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="আবেদনের বিষয় এক লাইনে লিখুন"
                        />
                      </div>

                      {/* CC Recipients */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">কপি প্রেরণ (CC)</label>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Input
                              value={newCcRecipient}
                              onChange={(e) => setNewCcRecipient(e.target.value)}
                              placeholder="রিসিপিয়েন্ট যোগ করুন"
                              onKeyPress={(e) => e.key === 'Enter' && addCcRecipient()}
                            />
                            <Button type="button" onClick={addCcRecipient}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {ccRecipients.length > 0 && (
                            <div className="space-y-2">
                              {ccRecipients.map((recipient, index) => (
                                <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                                  <span className="text-sm">{recipient}</span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeCcRecipient(recipient)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={nextStep} disabled={!recipientType || !courtName || !subject}>
                          <ArrowRight className="h-4 w-4 mr-2" />
                          পরবর্তী ধাপ
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Case Loader Content */}
                {currentStep === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>ডকুমেন্ট এডিটর</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        বাম পাশের কেস লোডার থেকে ইনসার্ট বোতামে ক্লিক করে তথ্য যোগ করুন।
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Facts Section */}
                        <div>
                          <label className="text-sm font-medium mb-2 block">ঘটনার সারমর্ম (Facts)</label>
                          <Textarea
                            ref={factsRef}
                            placeholder="ঘটনার বিস্তারিত তথ্য এখানে লিখুন..."
                            className="min-h-32"
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => handleInsertText(caseLoaderData.story, 'facts')}
                          >
                            কেস স্টোরি থেকে নিন
                          </Button>
                        </div>

                        <Separator />

                        {/* Grounds Section */}
                        <div>
                          <label className="text-sm font-medium mb-2 block">গ্রাউন্ডস/কারণসমূহ</label>
                          <Textarea
                            ref={groundsRef}
                            placeholder="আবেদনের কারণসমূহ এখানে যোগ করুন..."
                            className="min-h-32"
                          />
                          <div className="mt-2 text-sm text-muted-foreground">
                            • বুলেট পয়েন্ট যোগ করুন বা রি-অর্ডার করুন
                            • নির্বাচিত আপডেট ও ইস্যু ট্যাগ এখানে যোগ হবে
                          </div>
                        </div>

                        <Separator />

                        {/* Prayer Section */}
                        <div>
                          <label className="text-sm font-medium mb-2 block">প্রার্থিত উপশম (Reliefs Sought/Prayer)</label>
                          <Textarea
                            ref={prayerRef}
                            placeholder="আপনার প্রার্থনা এখানে লিখুন..."
                            className="min-h-24"
                          />
                          <div className="mt-2 flex gap-2">
                            <Button variant="outline" size="sm">
                              টেমপ্লেট সাজেশন
                            </Button>
                            <Button variant="outline" size="sm">
                              কাস্টম এডিট
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button variant="outline" onClick={prevStep}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            পূর্ববর্তী
                          </Button>
                          <Button>
                            <ArrowRight className="h-4 w-4 mr-2" />
                            পরবর্তী ধাপ
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Sidebar - Template Preview (Step 1 only) */}
              {currentStep === 1 && (
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
                            <Button className="w-full" disabled={!selectedTemplate} onClick={nextStep}>
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
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewApplication;