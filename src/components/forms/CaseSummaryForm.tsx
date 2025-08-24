import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CaseSummaryFormProps {
  caseId?: string;
}

export const CaseSummaryForm = ({ caseId }: CaseSummaryFormProps) => {
  const [summary, setSummary] = useState("মতিঝিল বাণিজ্যিক এলাকায় অবস্থিত আমার মোবাইল ফোনের দোকান থেকে এক অপরিচিত ব্যক্তি ৫০,০০০ টাকার স্মার্টফোন জোরপূর্বক নিয়ে যাওয়ার চেষ্টা করেন। ঘটনার সময় দুইজন সাক্ষী উপস্থিত ছিলেন এবং পুরো ঘটনা সিসিটিভি ক্যামেরায় রেকর্ড হয়েছে।");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  // Auto-save functionality
  useEffect(() => {
    if (summary.trim()) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
        toast({
          title: "স্বয়ংক্রিয় সংরক্ষণ",
          description: "কেস সারসংক্ষেপ সংরক্ষিত হয়েছে",
          duration: 2000,
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [summary, toast]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>কেস সারসংক্ষেপ</CardTitle>
          {lastSaved && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <Save className="h-3 w-3" />
              <span>সংরক্ষিত {lastSaved.toLocaleTimeString('bn-BD')}</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            ১–২ অনুচ্ছেদে মূল ঘটনা, সময়, স্থান, পক্ষসমূহ লিখুন।
          </p>
          <Textarea
            placeholder="এখানে কেসটির সংক্ষিপ্ত সারাংশ লিখুন..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="min-h-40 resize-none"
            rows={6}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>সারসংক্ষেপ দৈর্ঘ্য: {summary.length} অক্ষর</span>
            <span>সুপারিশ: ২০০-৫০০ অক্ষর</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};