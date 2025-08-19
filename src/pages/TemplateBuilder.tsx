import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Eye, 
  Upload, 
  Type, 
  Bold, 
  Italic, 
  List, 
  Plus,
  X,
  AlertTriangle,
  FileText,
  Code
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MergeField {
  token: string;
  description: string;
  category: string;
  example: string;
}

const TemplateBuilder = () => {
  const { tplId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const editorRef = useRef<HTMLTextAreaElement>(null);
  
  const [templateData, setTemplateData] = useState({
    name: tplId ? 'অনুসন্ধান মামলার আবেদন' : '',
    description: tplId ? 'থানায় অনুসন্ধান মামলা দায়ের করার জন্য প্রয়োজনীয় আবেদনপত্র' : '',
    category: tplId ? 'ফৌজদারি' : '',
    tags: tplId ? ['মামলা', 'অনুসন্ধান', 'থানা'] : [],
    content: tplId ? `বরাবর,
{{recipient.title}}
{{court.name}}

বিষয়: {{subject}}

জনাব,
             সবিনয় নিবেদন এই যে, আমি নিম্নস্বাক্ষরকারী {{client.name}} আবেদনকারী হিসেবে আপনার সম্মুখে নিম্নোক্ত তথ্য ও কারণসমূহ উল্লেখপূর্বক আবেদন করছি:

তথ্য ও পর্যবেক্ষণ:
{{case.facts}}

গ্রাউন্ডস/কারণসমূহ:
{{case.grounds}}

প্রার্থিত উপশম:
{{case.prayer}}

সংযুক্তি:
{{annexure.index}}

আবেদনকারী
নাম: {{client.name}}
ঠিকানা: {{client.address}}
ফোন: {{client.phone}}

{{#if lawyer.name}}
আইনজীবী
নাম: {{lawyer.name}}
এনরোলমেন্ট নং: {{lawyer.enrollment}}
চেম্বার: {{lawyer.chamber}}
{{/if}}

তারিখ: {{today}}` : '',
    status: 'draft',
    version: '1.0'
  });

  const [newTag, setNewTag] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const mergeFields: MergeField[] = [
    // Client Information
    { token: '{{client.name}}', description: 'ক্লায়েন্টের নাম', category: 'ক্লায়েন্ট তথ্য', example: 'মোহাম্মদ করিম' },
    { token: '{{client.address}}', description: 'ক্লায়েন্টের ঠিকানা', category: 'ক্লায়েন্ট তথ্য', example: 'ঢাকা, বাংলাদেশ' },
    { token: '{{client.phone}}', description: 'ক্লায়েন্টের ফোন', category: 'ক্লায়েন্ট তথ্য', example: '০১৭০০০০০০০০' },
    { token: '{{client.nid}}', description: 'জাতীয় পরিচয়পত্র নং', category: 'ক্লায়েন্ট তথ্য', example: '১২৩৪৫৬৭৮৯০' },
    
    // Case Information
    { token: '{{case.number}}', description: 'কেস নম্বর', category: 'কেস তথ্য', example: 'GR Case No. 123/2025' },
    { token: '{{case.summary}}', description: 'কেস সারসংক্ষেপ', category: 'কেস তথ্য', example: 'মামলার সংক্ষিপ্ত বিবরণ' },
    { token: '{{case.story}}', description: 'কেস স্টোরি', category: 'কেস তথ্য', example: 'ঘটনার বিস্তারিত বিবরণ' },
    { token: '{{case.facts}}', description: 'ঘটনার সারমর্ম', category: 'কেস তথ্য', example: 'মূল ঘটনার তথ্য' },
    { token: '{{case.grounds}}', description: 'গ্রাউন্ডস/কারণসমূহ', category: 'কেস তথ্য', example: '• কারণ ১\n• কারণ ২' },
    { token: '{{case.prayer}}', description: 'প্রার্থিত উপশম', category: 'কেস তথ্য', example: 'যথাযথ ব্যবস্থা গ্রহণ' },
    { token: '{{case.positive}}', description: 'পজিটিভ দিক', category: 'কেস তথ্য', example: 'অনুকূল বিষয়সমূহ' },
    { token: '{{case.negative}}', description: 'নেগেটিভ দিক', category: 'কেস তথ্য', example: 'প্রতিকূল বিষয়সমূহ' },
    
    // Court Information
    { token: '{{court.name}}', description: 'আদালতের নাম', category: 'আদালত তথ্য', example: 'জুডিশিয়াল ম্যাজিস্ট্রেট আদালত, ঢাকা' },
    { token: '{{recipient.title}}', description: 'প্রাপকের পদবি', category: 'আদালত তথ্য', example: 'জুডিশিয়াল ম্যাজিস্ট্রেট' },
    { token: '{{subject}}', description: 'বিষয়/Subject', category: 'আদালত তথ্য', example: 'আবেদনের বিষয়' },
    
    // Filing Information
    { token: '{{filing.date}}', description: 'ফাইলিং তারিখ', category: 'ফাইলিং তথ্য', example: '২০২৫-০৮-১৯' },
    { token: '{{hearing.date}}', description: 'শুনানির তারিখ', category: 'ফাইলিং তথ্য', example: '২০২৫-০৮-২৫' },
    { token: '{{diary.number}}', description: 'ডায়েরি নম্বর', category: 'ফাইলিং তথ্য', example: 'D-১২৩৪' },
    
    // Lawyer Information
    { token: '{{lawyer.name}}', description: 'আইনজীবীর নাম', category: 'আইনজীবী তথ্য', example: 'ব্যারিস্টার রহমান' },
    { token: '{{lawyer.enrollment}}', description: 'এনরোলমেন্ট নং', category: 'আইনজীবী তথ্য', example: 'বি-১২৩৪' },
    { token: '{{lawyer.chamber}}', description: 'চেম্বার ঠিকানা', category: 'আইনজীবী তথ্য', example: 'সুপ্রিম কোর্ট বার' },
    
    // Miscellaneous
    { token: '{{today}}', description: 'আজকের তারিখ (বাংলা)', category: 'অন্যান্য', example: '২০২৫-০৮-১৯' },
    { token: '{{annexure.index}}', description: 'সংযুক্তি সূচি', category: 'অন্যান্য', example: '১. জাতীয় পরিচয়পত্র\n২. অন্যান্য দলিল' }
  ];

  const categories = [...new Set(mergeFields.map(field => field.category))];

  const handleSave = () => {
    const errors = validateTemplate();
    if (errors.length > 0) {
      setValidationErrors(errors);
      toast({
        title: "ভ্যালিডেশন এরর",
        description: "দয়া করে প্রয়োজনীয় তথ্য পূরণ করুন।",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "টেমপ্লেট সংরক্ষণ",
      description: "টেমপ্লেট সফলভাবে সংরক্ষণ করা হয়েছে।",
    });
  };

  const handlePublish = () => {
    const errors = validateTemplate();
    if (errors.length > 0) {
      setValidationErrors(errors);
      toast({
        title: "প্রকাশ করা সম্ভব নয়",
        description: "প্রকাশের আগে সব ভ্যালিডেশন এরর ঠিক করুন।",
        variant: "destructive"
      });
      return;
    }

    setTemplateData({...templateData, status: 'published'});
    toast({
      title: "টেমপ্লেট প্রকাশিত",
      description: "টেমপ্লেট সফলভাবে প্রকাশ করা হয়েছে।",
    });
  };

  const validateTemplate = (): string[] => {
    const errors: string[] = [];
    
    if (!templateData.name.trim()) {
      errors.push('টেমপ্লেটের নাম প্রয়োজন');
    }
    
    if (!templateData.description.trim()) {
      errors.push('টেমপ্লেটের বিবরণ প্রয়োজন');
    }
    
    if (!templateData.category) {
      errors.push('ক্যাটাগরি নির্বাচন প্রয়োজন');
    }
    
    if (!templateData.content.trim()) {
      errors.push('টেমপ্লেট কন্টেন্ট প্রয়োজন');
    }

    // Check for unclosed conditional blocks
    const openIfs = (templateData.content.match(/{{#if/g) || []).length;
    const closeIfs = (templateData.content.match(/{{\/if}}/g) || []).length;
    if (openIfs !== closeIfs) {
      errors.push('শর্তাবলী ব্লক সঠিকভাবে বন্ধ করা হয়নি');
    }

    return errors;
  };

  const insertMergeField = (token: string) => {
    if (!editorRef.current) return;
    
    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = templateData.content;
    
    const newText = text.substring(0, start) + token + text.substring(end);
    setTemplateData({...templateData, content: newText});
    
    // Set cursor position after inserted token
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + token.length, start + token.length);
    }, 0);
  };

  const addTag = () => {
    if (newTag.trim() && !templateData.tags.includes(newTag.trim())) {
      setTemplateData({
        ...templateData,
        tags: [...templateData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTemplateData({
      ...templateData,
      tags: templateData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const renderPreview = () => {
    // Simple preview with sample data
    let previewContent = templateData.content
      .replace(/{{client\.name}}/g, 'মোহাম্মদ করিম')
      .replace(/{{client\.address}}/g, 'ঢাকা, বাংলাদেশ')
      .replace(/{{client\.phone}}/g, '০১৭০০০০০০০০')
      .replace(/{{court\.name}}/g, 'জুডিশিয়াল ম্যাজিস্ট্রেট আদালত, ঢাকা')
      .replace(/{{recipient\.title}}/g, 'জুডিশিয়াল ম্যাজিস্ট্রেট')
      .replace(/{{subject}}/g, 'অনুসন্ধান মামলার আবেদন')
      .replace(/{{case\.facts}}/g, 'নমুনা ঘটনার বিবরণ...')
      .replace(/{{case\.grounds}}/g, '• নমুনা কারণ ১\n• নমুনা কারণ ২')
      .replace(/{{case\.prayer}}/g, 'যথাযথ আইনি ব্যবস্থা গ্রহণ')
      .replace(/{{annexure\.index}}/g, '১. জাতীয় পরিচয়পত্র\n২. অন্যান্য দলিল')
      .replace(/{{today}}/g, '২০২৫-০৮-১৯')
      .replace(/{{#if lawyer\.name}}/g, '')
      .replace(/{{\/if}}/g, '');

    return previewContent;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {tplId ? 'টেমপ্লেট সম্পাদনা' : 'নতুন টেমপ্লেট তৈরি'}
            </h1>
            <p className="text-muted-foreground mt-2">
              স্মার্ট মার্জ ফিল্ড সহ আবেদনপত্রের টেমপ্লেট তৈরি করুন
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/applications/templates')}
            >
              বাতিল
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              সংরক্ষণ
            </Button>
            <Button onClick={handlePublish}>
              <Upload className="h-4 w-4 mr-2" />
              প্রকাশ করুন
            </Button>
          </div>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Card className="mb-6 border-destructive">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <h3 className="font-semibold text-destructive mb-2">
                    নিম্নোক্ত সমস্যাগুলো ঠিক করুন:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {validationErrors.map((error, index) => (
                      <li key={index} className="text-destructive">{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Template Settings */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">টেমপ্লেট সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">টেমপ্লেটের নাম *</Label>
                  <Input
                    id="name"
                    value={templateData.name}
                    onChange={(e) => setTemplateData({...templateData, name: e.target.value})}
                    placeholder="টেমপ্লেটের নাম লিখুন"
                  />
                </div>

                <div>
                  <Label htmlFor="description">বিবরণ *</Label>
                  <Textarea
                    id="description"
                    value={templateData.description}
                    onChange={(e) => setTemplateData({...templateData, description: e.target.value})}
                    placeholder="টেমপ্লেটের বিবরণ লিখুন"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="category">ক্যাটাগরি *</Label>
                  <Select
                    value={templateData.category}
                    onValueChange={(value) => setTemplateData({...templateData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ফৌজদারি">ফৌজদারি</SelectItem>
                      <SelectItem value="দেওয়ানি">দেওয়ানি</SelectItem>
                      <SelectItem value="প্রশাসনিক">প্রশাসনিক</SelectItem>
                      <SelectItem value="থানা পর্যায়">থানা পর্যায়</SelectItem>
                      <SelectItem value="পারিবারিক">পারিবারিক</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>ট্যাগসমূহ</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="নতুন ট্যাগ"
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button size="sm" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {templateData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-auto p-0 ml-1"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>স্ট্যাটাস: <span className="font-medium">{templateData.status === 'draft' ? 'খসড়া' : 'প্রকাশিত'}</span></p>
                  <p>ভার্সন: <span className="font-medium">{templateData.version}</span></p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">টেমপ্লেট এডিটর</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={previewMode ? "default" : "outline"}
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {previewMode ? 'এডিট' : 'প্রিভিউ'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!previewMode ? (
                  <Textarea
                    ref={editorRef}
                    value={templateData.content}
                    onChange={(e) => setTemplateData({...templateData, content: e.target.value})}
                    placeholder="টেমপ্লেটের কন্টেন্ট লিখুন..."
                    className="min-h-[600px] font-noto-serif-bengali"
                    style={{ fontSize: '14px', lineHeight: '1.6' }}
                  />
                ) : (
                  <div className="bg-white border rounded-lg p-6 min-h-[600px]">
                    <pre className="whitespace-pre-wrap font-noto-serif-bengali text-sm leading-relaxed">
                      {renderPreview()}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Merge Fields */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Code className="h-5 w-5 mr-2" />
                  মার্জ ফিল্ডস
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={categories[0]} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    {categories.slice(0, 2).map((category) => (
                      <TabsTrigger key={category} value={category} className="text-xs">
                        {category.split(' ')[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {categories.map((category) => (
                    <TabsContent key={category} value={category} className="space-y-2">
                      {mergeFields
                        .filter(field => field.category === category)
                        .map((field) => (
                          <div key={field.token} className="p-2 border rounded-lg hover:bg-muted/50">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start p-0 h-auto text-left"
                              onClick={() => insertMergeField(field.token)}
                            >
                              <div>
                                <div className="font-mono text-xs text-primary font-medium">
                                  {field.token}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {field.description}
                                </div>
                                <div className="text-xs text-muted-foreground italic mt-1">
                                  উদাহরণ: {field.example}
                                </div>
                              </div>
                            </Button>
                          </div>
                        ))}
                    </TabsContent>
                  ))}
                </Tabs>

                <Separator className="my-4" />

                <div className="text-xs text-muted-foreground space-y-2">
                  <p className="font-medium">শর্তাবলী ব্যবহার:</p>
                  <div className="bg-muted p-2 rounded text-xs font-mono">
                    {`{{#if field.name}}\n  কন্টেন্ট\n{{/if}}`}
                  </div>
                  <p>শুধুমাত্র ফিল্ড মান থাকলে কন্টেন্ট দেখানো হবে।</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateBuilder;