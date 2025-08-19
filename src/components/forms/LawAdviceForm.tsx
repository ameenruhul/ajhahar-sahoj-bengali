import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Plus, FileText, MessageSquare, Clock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Amendment {
  id: string;
  timestamp: Date;
  author: string;
  note: string;
  fieldType: 'lawAdvice' | 'lawReference';
}

interface FormData {
  lawAdvice: string;
  lawReference: string;
  positiveSide: string;
  negativeSide: string;
  overviewComment: string;
}

interface LawAdviceFormProps {
  caseId: string;
}

export const LawAdviceForm = ({ caseId }: LawAdviceFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    lawAdvice: "",
    lawReference: "",
    positiveSide: "",
    negativeSide: "",
    overviewComment: ""
  });

  const [amendments, setAmendments] = useState<Amendment[]>([]);
  const [newNote, setNewNote] = useState("");
  const [activeField, setActiveField] = useState<'lawAdvice' | 'lawReference' | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // In real implementation, save to Supabase here
      console.log('Auto-saving form data:', formData);
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  }, [formData]);

  // Debounced auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.values(formData).some(value => value.trim() !== "")) {
        autoSave();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData, autoSave]);

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addAmendment = () => {
    if (!newNote.trim() || !activeField) return;

    const amendment: Amendment = {
      id: Date.now().toString(),
      timestamp: new Date(),
      author: "বর্তমান ব্যবহারকারী", // In real app, get from auth
      note: newNote.trim(),
      fieldType: activeField
    };

    setAmendments(prev => [...prev, amendment]);
    setNewNote("");
    
    toast({
      title: "সংশোধনী যোগ করা হয়েছে",
      description: `${activeField === 'lawAdvice' ? 'আইনি পরামর্শ' : 'আইনের রেফারেন্স'} এ নোট যোগ করা হয়েছে।`
    });
  };

  const getAmendmentCount = (fieldType: 'lawAdvice' | 'lawReference') => {
    return amendments.filter(a => a.fieldType === fieldType).length;
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Auto-save indicator */}
      {isSaving && (
        <div className="flex items-center justify-end text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          সংরক্ষণ করা হচ্ছে...
        </div>
      )}

      {/* Law Advice Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              আইনি পরামর্শ
            </CardTitle>
            <div className="flex items-center gap-2">
              {getAmendmentCount('lawAdvice') > 0 && (
                <Badge variant="secondary">
                  সংশোধনী ({getAmendmentCount('lawAdvice')})
                </Badge>
              )}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveField('lawAdvice')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    সংশোধনী যোগ করুন
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>আইনি পরামর্শে সংশোধনী যোগ করুন</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="amendment-note">সংশোধনী নোট</Label>
                      <Textarea
                        id="amendment-note"
                        placeholder="আপনার সংশোধনী বা মন্তব্য লিখুন..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button onClick={addAmendment} disabled={!newNote.trim()}>
                      সংশোধনী যোগ করুন
                    </Button>
                    
                    {/* Existing amendments for this field */}
                    <div className="space-y-2 pt-4 border-t">
                      <h4 className="font-medium">বিদ্যমান সংশোধনী</h4>
                      {amendments
                        .filter(a => a.fieldType === 'lawAdvice')
                        .map(amendment => (
                          <Tooltip key={amendment.id}>
                            <TooltipTrigger asChild>
                              <div className="p-3 bg-muted rounded-md cursor-help">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                  <User className="h-3 w-3" />
                                  {amendment.author}
                                  <Clock className="h-3 w-3 ml-auto" />
                                  {formatTimestamp(amendment.timestamp)}
                                </div>
                                <p className="text-sm line-clamp-2">{amendment.note}</p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs">
                              <p>{amendment.note}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="এই কেসের জন্য বিস্তারিত আইনি পরামর্শ লিখুন..."
            value={formData.lawAdvice}
            onChange={(e) => handleFieldChange('lawAdvice', e.target.value)}
            className="min-h-[200px]"
          />
        </CardContent>
      </Card>

      {/* Law Reference Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              আইনের রেফারেন্স
            </CardTitle>
            <div className="flex items-center gap-2">
              {getAmendmentCount('lawReference') > 0 && (
                <Badge variant="secondary">
                  সংশোধনী ({getAmendmentCount('lawReference')})
                </Badge>
              )}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveField('lawReference')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    সংশোধনী যোগ করুন
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>আইনের রেফারেন্সে সংশোধনী যোগ করুন</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="reference-amendment-note">সংশোধনী নোট</Label>
                      <Textarea
                        id="reference-amendment-note"
                        placeholder="আপনার সংশোধনী বা মন্তব্য লিখুন..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button onClick={addAmendment} disabled={!newNote.trim()}>
                      সংশোধনী যোগ করুন
                    </Button>
                    
                    {/* Existing amendments for this field */}
                    <div className="space-y-2 pt-4 border-t">
                      <h4 className="font-medium">বিদ্যমান সংশোধনী</h4>
                      {amendments
                        .filter(a => a.fieldType === 'lawReference')
                        .map(amendment => (
                          <Tooltip key={amendment.id}>
                            <TooltipTrigger asChild>
                              <div className="p-3 bg-muted rounded-md cursor-help">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                  <User className="h-3 w-3" />
                                  {amendment.author}
                                  <Clock className="h-3 w-3 ml-auto" />
                                  {formatTimestamp(amendment.timestamp)}
                                </div>
                                <p className="text-sm line-clamp-2">{amendment.note}</p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs">
                              <p>{amendment.note}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="প্রাসঙ্গিক আইন, ধারা, উপধারা এবং নজির উল্লেখ করুন..."
            value={formData.lawReference}
            onChange={(e) => handleFieldChange('lawReference', e.target.value)}
            className="min-h-[200px]"
          />
        </CardContent>
      </Card>

      {/* Positive and Negative Sides */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">ইতিবাচক দিক</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="• কেসের অনুকূল দিকগুলো লিখুন&#10;• শক্তিশালী যুক্তিসমূহ&#10;• সুবিধাজনক পরিস্থিতি"
              value={formData.positiveSide}
              onChange={(e) => handleFieldChange('positiveSide', e.target.value)}
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">নেতিবাচক দিক</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="• কেসের প্রতিকূল দিকগুলো লিখুন&#10;• দুর্বল যুক্তিসমূহ&#10;• চ্যালেঞ্জিং পরিস্থিতি"
              value={formData.negativeSide}
              onChange={(e) => handleFieldChange('negativeSide', e.target.value)}
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>
      </div>

      {/* Overview Comment */}
      <Card>
        <CardHeader>
          <CardTitle>ওভারভিউ মন্তব্য</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="কেসের সার্বিক মূল্যায়ন, সম্ভাব্য ফলাফল এবং পরবর্তী পদক্ষেপ সম্পর্কে মন্তব্য লিখুন..."
            value={formData.overviewComment}
            onChange={(e) => handleFieldChange('overviewComment', e.target.value)}
            className="min-h-[150px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};
