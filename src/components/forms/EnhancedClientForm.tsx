import { useState, useCallback, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Phone, 
  MapPin, 
  FileText,
  Upload,
  X,
  Check,
  AlertTriangle,
  Paperclip
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClientFormData {
  name: string;
  address: string;
  phone: string;
  caseNumber: string;
  nid: string;
  caseDescription: string;
  hasAjhahar: boolean;
  attachments: File[];
}

interface FormErrors {
  [key: string]: string;
}

interface EnhancedClientFormProps {
  onFormChange: () => void;
  onAutoSave: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

export function EnhancedClientForm({ onFormChange, onAutoSave }: EnhancedClientFormProps) {
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    address: "",
    phone: "",
    caseNumber: "",
    nid: "",
    caseDescription: "",
    hasAjhahar: false,
    attachments: []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'নাম প্রয়োজনীয়';
        if (value.length < 2) return 'নাম কমপক্ষে ২ অক্ষর হতে হবে';
        if (value.length > 120) return 'নাম সর্বোচ্চ ১২০ অক্ষর হতে পারে';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'ফোন নম্বর প্রয়োজনীয়';
        const phoneRegex = /^(\+৮৮০?)?[০-৯১-৯]{11}$/;
        if (!phoneRegex.test(value.replace(/\s+/g, ''))) {
          return 'সঠিক ফোন নম্বর লিখুন (যেমন: +৮৮০১৭১২৩৪৫৬৭৮)';
        }
        return '';
      
      case 'nid':
        if (value && !/^[০-৯0-9]{10,17}$/.test(value)) {
          return 'এনআইডি ১০-১৭ সংখ্যার হতে হবে';
        }
        return '';
      
      case 'caseDescription':
        if (!value.trim()) return 'কেসের বর্ণনা প্রয়োজনীয়';
        if (value.length > 10000) return 'সর্বোচ্চ ১০,০০০ অক্ষর লিখতে পারবেন';
        return '';
      
      default:
        return '';
    }
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    onFormChange();

    // Auto-save after 2 seconds of no typing
    setTimeout(() => {
      const error = validateField(name, value);
      if (!error) {
        onAutoSave();
      }
    }, 2000);
  };

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const fileErrors: string[] = [];

    Array.from(files).forEach(file => {
      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        fileErrors.push(`${file.name}: অসমর্থিত ফাইল ফরম্যাট`);
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        fileErrors.push(`${file.name}: ফাইল সাইজ ১০ MB এর বেশি`);
        return;
      }

      validFiles.push(file);
    });

    // Check total file count
    if (formData.attachments.length + validFiles.length > MAX_FILES) {
      fileErrors.push(`সর্বোচ্চ ${MAX_FILES}টি ফাইল আপলোড করতে পারবেন`);
      return;
    }

    if (fileErrors.length > 0) {
      toast({
        title: "ফাইল আপলোড ত্রুটি",
        description: fileErrors.join(', '),
        variant: "destructive"
      });
      return;
    }

    // Simulate upload progress
    validFiles.forEach(file => {
      const fileId = `${file.name}_${Date.now()}`;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[fileId];
                return newProgress;
              });
            }, 1000);
            return prev;
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 100);
    });

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles]
    }));

    onFormChange();
  }, [formData.attachments, onFormChange, toast]);

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
    onFormChange();
  };

  const scrollToFirstError = () => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element?.focus();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== 'attachments' && key !== 'hasAjhahar') {
        const error = validateField(key, formData[key as keyof ClientFormData] as string);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setTimeout(scrollToFirstError, 100);
      return false;
    }
    
    return true;
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const characterCount = formData.caseDescription.length;
  const remainingChars = 10000 - characterCount;

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>ব্যক্তিগত তথ্য</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                নাম <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                placeholder="পূর্ণ নাম লিখুন"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <Alert variant="destructive" className="py-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">{errors.name}</AlertDescription>
                </Alert>
              )}
              <p className="text-xs text-muted-foreground">
                {formData.name.length}/120 অক্ষর
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                ফোন নম্বর <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                placeholder="+৮৮০১৭১২৩৪৫৬৷৮"
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <Alert variant="destructive" className="py-2">
                  <Phone className="h-4 w-4" />
                  <AlertDescription className="text-sm">{errors.phone}</AlertDescription>
                </Alert>
              )}
              <p className="text-xs text-muted-foreground">
                E.164 ফরম্যাট: +৮৮০ দিয়ে শুরু করুন
              </p>
            </div>

            {/* Case Number */}
            <div className="space-y-2">
              <Label htmlFor="caseNumber" className="text-sm font-medium">
                কেস নম্বর/রেফারেন্স
              </Label>
              <Input
                id="caseNumber"
                value={formData.caseNumber}
                onChange={(e) => handleFieldChange('caseNumber', e.target.value)}
                placeholder="অভ্যন্তরীণ রেফারেন্স নম্বর (ঐচ্ছিক)"
              />
            </div>

            {/* NID */}
            <div className="space-y-2">
              <Label htmlFor="nid" className="text-sm font-medium">
                জাতীয় পরিচয়পত্র নম্বর
              </Label>
              <Input
                id="nid"
                value={formData.nid}
                onChange={(e) => handleFieldChange('nid', e.target.value)}
                placeholder="১০-১৭ সংখ্যার NID"
                className={errors.nid ? "border-destructive" : ""}
              />
              {errors.nid && (
                <Alert variant="destructive" className="py-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">{errors.nid}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              ঠিকানা
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              placeholder="গ্রাম/মহল্লা, ডাকঘর, উপজেলা, জেলা"
              rows={3}
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Case Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>কেসের বর্ণনা</span>
            </div>
            <Badge variant={remainingChars < 1000 ? "destructive" : "outline"}>
              {characterCount}/10,000
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="caseDescription" className="text-sm font-medium">
              বিস্তারিত কেস বর্ণনা <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="caseDescription"
              value={formData.caseDescription}
              onChange={(e) => handleFieldChange('caseDescription', e.target.value)}
              placeholder="ঘটনার বিস্তারিত বিবরণ, সংশ্লিষ্ট ব্যক্তিবর্গ, সময়, স্থান ও অন্যান্য গুরুত্বপূর্ণ তথ্য লিখুন..."
              rows={8}
              className={`resize-none ${errors.caseDescription ? "border-destructive" : ""}`}
              maxLength={10000}
            />
            {errors.caseDescription && (
              <Alert variant="destructive" className="py-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">{errors.caseDescription}</AlertDescription>
              </Alert>
            )}
            <p className="text-xs text-muted-foreground">
              অবশিষ্ট: {remainingChars.toLocaleString()} অক্ষর
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Attachments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Paperclip className="h-5 w-5" />
            <span>অ্যাটাচমেন্ট</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="hasAjhahar"
              checked={formData.hasAjhahar}
              onCheckedChange={(checked) => {
                setFormData(prev => ({ ...prev, hasAjhahar: checked as boolean }));
                onFormChange();
              }}
            />
            <Label htmlFor="hasAjhahar" className="text-sm font-medium cursor-pointer">
              আপনার কাছে কি আগে থেকে অজাহার (এজাহার) আছে?
            </Label>
          </div>

          {formData.hasAjhahar && (
            <div className="space-y-4 pt-4 border-t">
              {/* File Upload Area */}
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('border-primary');
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-primary');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-primary');
                  handleFileUpload(e.dataTransfer.files);
                }}
              >
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">ফাইল আপলোড করুন</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  ফাইল ড্র্যাগ করুন অথবা ক্লিক করে নির্বাচন করুন
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>সমর্থিত ফরম্যাট: PDF, JPG, PNG</p>
                  <p>সর্বোচ্চ ফাইল সাইজ: ১০ MB</p>
                  <p>সর্বোচ্চ ফাইল সংখ্যা: {MAX_FILES}টি</p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />

              {/* File List */}
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">আপলোড করা ফাইল ({formData.attachments.length}/{MAX_FILES}):</h4>
                  {formData.attachments.map((file, index) => {
                    const fileId = `${file.name}_${Date.now()}`;
                    const progress = uploadProgress[fileId];
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {progress !== undefined && progress < 100 ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-background rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="text-xs">{progress}%</span>
                            </div>
                          ) : (
                            <Check className="h-4 w-4 text-success" />
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}