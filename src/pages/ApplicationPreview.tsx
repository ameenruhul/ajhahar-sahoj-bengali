import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit3, Download, MessageSquare, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'correction';
}

const ApplicationPreview = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'আইনজীবী রহমান',
      content: 'তথ্য ও পর্যবেক্ষণ অংশে আরও বিস্তারিত তথ্য প্রয়োজন।',
      timestamp: '২০২৫-০৮-১৯ ১১:৩০',
      type: 'correction'
    },
    {
      id: '2',
      author: 'স্টাফ করিম',
      content: 'সংযুক্তি তালিকা পরীক্ষা করা হয়েছে।',
      timestamp: '২০২৫-০৮-১৯ ০৯:১৫',
      type: 'comment'
    }
  ]);

  // Mock application data
  const applicationData = {
    templateName: 'অনুসন্ধান মামলার আবেদন',
    caseNumber: 'GR Case No. 123/2025',
    court: 'জুডিশিয়াল ম্যাজিস্ট্রেট আদালত, ঢাকা',
    filingDate: '২০২৫-০৮-১৯',
    status: 'পর্যালোচনার জন্য অপেক্ষমাণ',
    content: `
বরাবর,
জুডিশিয়াল ম্যাজিস্ট্রেট
জুডিশিয়াল ম্যাজিস্ট্রেট আদালত, ঢাকা

বিষয়: অনুসন্ধান মামলার আবেদন

জনাব,
             সবিনয় নিবেদন এই যে, আমি নিম্নস্বাক্ষরকারী আবেদনকারী হিসেবে আপনার সম্মুখে নিম্নোক্ত তথ্য ও কারণসমূহ উল্লেখপূর্বক আবেদন করছি:

তথ্য ও পর্যবেক্ষণ:
১. আবেদনকারী একজন আইনত বৈধ নাগরিক
২. ঘটনার তারিখ: ২০২৫-০৮-১৫
৩. ঘটনাস্থল: ঢাকা, বাংলাদেশ

গ্রাউন্ডস/কারণসমূহ:
• ন্যায়বিচার নিশ্চিতকরণ
• আইনগত প্রতিকার লাভ
• সত্য উদ্ঘাটন

প্রার্থিত উপশম:
অতএব, উপরোক্ত কারণসমূহের ভিত্তিতে আবেদনকারীর বিনীত প্রার্থনা যে, আপনি এই আবেদনটি গ্রহণ করে যথাযথ আইনি ব্যবস্থা গ্রহণ করবেন।

সংযুক্তি:
১. আবেদনকারীর জাতীয় পরিচয়পত্রের ফটোকপি
২. সংশ্লিষ্ট দলিলপত্র

আবেদনকারী
নাম: মোহাম্মদ করিম
ঠিকানা: ঢাকা, বাংলাদেশ
ফোন: ০১৭০০০০০০০০

আইনজীবী
নাম: ব্যারিস্টার রহমান
এনরোলমেন্ট নং: বি-১২৩৪
চেম্বার: সুপ্রিম কোর্ট বার, ঢাকা

তারিখ: ২০২৫-০৮-১৯
    `
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'বর্তমান ব্যবহারকারী',
      content: newComment,
      timestamp: new Date().toLocaleString('bn-BD'),
      type: 'comment'
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    toast({
      title: "মন্তব্য যোগ করা হয়েছে",
      description: "আপনার মন্তব্য সফলভাবে যোগ করা হয়েছে।",
    });
  };

  const handleEdit = () => {
    navigate(`/case/1/applications/edit/${appId}`);
  };

  const handleGenerate = () => {
    navigate(`/applications/${appId}/export`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {applicationData.templateName}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>কেস: {applicationData.caseNumber}</span>
                  <span>•</span>
                  <span>আদালত: {applicationData.court}</span>
                  <span>•</span>
                  <span>দাখিল: {applicationData.filingDate}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="secondary"
                  className="bg-warning/10 text-warning border-warning/20"
                >
                  {applicationData.status}
                </Badge>
                <Button onClick={handleEdit} variant="outline" size="sm">
                  <Edit3 className="h-4 w-4 mr-2" />
                  সম্পাদনা
                </Button>
                <Button onClick={handleGenerate} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  জেনারেট/PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Document Preview */}
          <Card>
            <CardContent className="p-8">
              <div className="bg-white min-h-[800px] border border-border rounded-lg p-8 shadow-sm">
                <pre className="whitespace-pre-wrap font-noto-serif-bengali text-base leading-relaxed text-foreground">
                  {applicationData.content}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comments Sidebar */}
        <div className="w-80 border-l border-border bg-muted/30">
          <div className="p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              মন্তব্য ও সংশোধনী
            </h3>

            {/* Add Comment */}
            <div className="mb-4">
              <Textarea
                placeholder="মন্তব্য বা সংশোধনী লিখুন..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2"
                rows={3}
              />
              <Button onClick={addComment} size="sm" className="w-full">
                মন্তব্য যোগ করুন
              </Button>
            </div>

            <Separator className="mb-4" />

            {/* Comments List */}
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="p-3">
                    <div className="flex items-start space-x-2">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        comment.type === 'correction' ? 'bg-destructive' : 'bg-primary'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">
                            {comment.author}
                          </span>
                          <Badge 
                            variant={comment.type === 'correction' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {comment.type === 'correction' ? 'সংশোধনী' : 'মন্তব্য'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {comment.content}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {comment.timestamp}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPreview;