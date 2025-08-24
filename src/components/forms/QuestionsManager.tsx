import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, GripVertical, Trash2, Save, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  text: string;
  answer?: string;
  isAnswerOpen?: boolean;
}

interface QuestionsManagerProps {
  caseId?: string;
}

export const QuestionsManager = ({ caseId }: QuestionsManagerProps) => {
  const [questions, setQuestions] = useState<Question[]>([
    { 
      id: "1", 
      text: "অভিযুক্ত ব্যক্তির সম্পূর্ণ পরিচয় জানা আছে কি?", 
      answer: "অভিযুক্ত ব্যক্তি নিজেকে 'রফিক উদ্দিন' বলে পরিচয় দিয়েছিলেন, তবে কোনো সঠিক ঠিকানা বা পরিচয়পত্র দেখাননি। তার বয়স আনুমানিক ৩০-৩৫ বছর, গায়ের রং শ্যামলা, মাঝারি উচ্চতা।",
      isAnswerOpen: true 
    },
    { 
      id: "2", 
      text: "ঘটনার সময় আর কেউ উপস্থিত ছিলেন কি?", 
      answer: "হ্যাঁ, পাশের দোকানদার মোহাম্মদ করিম সাহেব পুরো ঘটনা দেখেছেন। এছাড়াও একজন মহিলা ক্রেতা সালমা খাতুন উপস্থিত ছিলেন যিনি ঘটনার সাক্ষী দিতে রাজি আছেন।",
      isAnswerOpen: false 
    },
    { 
      id: "3", 
      text: "কোন ধরনের প্রমাণ সংগ্রহ করা হয়েছে?", 
      answer: "আমাদের কাছে দোকানের সিসিটিভি ক্যামেরার সম্পূর্ণ ফুটেজ আছে যেখানে পুরো ঘটনা স্পষ্টভাবে দেখা যাচ্ছে। মোবাইল ফোনের ক্রয়ের রসিদ, দোকানের লাইসেন্স এবং সাক্ষীদের লিখিত বিবৃতি রয়েছে।",
      isAnswerOpen: false 
    },
    {
      id: "4",
      text: "আগে কি এই ধরনের ঘটনা ঘটেছে?",
      answer: "এই প্রথমবার আমার দোকানে এমন ঘটনা ঘটেছে। তবে এলাকায় মাঝে মাঝে এ ধরনের চুরির ঘটনা ঘটে থাকে।",
      isAnswerOpen: false
    }
  ]);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  // Auto-save functionality
  useEffect(() => {
    const hasContent = questions.some(q => q.text.trim() || q.answer?.trim());
    if (hasContent) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
        toast({
          title: "স্বয়ংক্রিয় সংরক্ষণ",
          description: "প্রশ্নসমূহ সংরক্ষিত হয়েছে",
          duration: 2000,
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [questions, toast]);

  const addQuestion = () => {
    const newId = Date.now().toString();
    setQuestions([...questions, { id: newId, text: "", isAnswerOpen: false }]);
  };

  const deleteQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: keyof Question, value: string | boolean) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const toggleAnswer = (id: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, isAnswerOpen: !q.isAnswerOpen } : q
    ));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  };

  const validateQuestions = () => {
    const errors: string[] = [];
    const questionTexts = questions.map(q => q.text.trim()).filter(Boolean);
    
    // Check for empty questions
    if (questionTexts.length === 0) {
      errors.push("কমপক্ষে একটি প্রশ্ন লিখুন");
    }

    // Check for duplicates
    const duplicates = questionTexts.filter((text, index) => 
      questionTexts.indexOf(text) !== index
    );
    if (duplicates.length > 0) {
      errors.push("একই প্রশ্নের পুনরাবৃত্তি এড়িয়ে চলুন");
    }

    return errors;
  };

  const errors = validateQuestions();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>কিছু প্রশ্নের উত্তর দিন</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              পারফেক্ট সমাধানের জন্য কয়েকটি প্রশ্নের উত্তর প্রয়োজন
            </p>
          </div>
          {lastSaved && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <Save className="h-3 w-3" />
              <span>সংরক্ষিত {lastSaved.toLocaleTimeString('bn-BD')}</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {errors.length > 0 && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <ul className="text-sm text-destructive space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {questions.map((question, index) => (
                  <Draggable key={question.id} draggableId={question.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`p-4 border rounded-md space-y-3 transition-colors ${
                          snapshot.isDragging ? 'bg-accent/50' : 'bg-card'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            {...provided.dragHandleProps}
                            className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical className="h-4 w-4" />
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-muted-foreground">
                                প্রশ্ন {index + 1}:
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleAnswer(question.id)}
                                className="h-6 px-2 text-xs"
                              >
                                {question.isAnswerOpen ? (
                                  <>
                                    <ChevronUp className="h-3 w-3 mr-1" />
                                    উত্তর লুকান
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="h-3 w-3 mr-1" />
                                    উত্তর লিখুন
                                  </>
                                )}
                              </Button>
                            </div>
                            <Input
                              placeholder="প্রশ্নটি লিখুন..."
                              value={question.text}
                              onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                              className="w-full"
                            />
                            
                            {question.isAnswerOpen && (
                              <div className="animate-fade-in">
                                <Textarea
                                  placeholder="ক্লায়েন্টের উত্তর এখানে লিখুন..."
                                  value={question.answer || ""}
                                  onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
                                  className="min-h-20 resize-none"
                                  rows={3}
                                />
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteQuestion(question.id)}
                            disabled={questions.length === 1}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Button
          onClick={addQuestion}
          variant="outline"
          className="w-full border-dashed"
        >
          <Plus className="h-4 w-4 mr-2" />
          নতুন প্রশ্ন যোগ করুন
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          প্রশ্ন {questions.filter(q => q.text.trim()).length}টি • 
          উত্তর {questions.filter(q => q.answer?.trim()).length}টি
        </div>
      </CardContent>
    </Card>
  );
};