import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  User, 
  FileText, 
  Scale, 
  Clock,
  Plus,
  Download,
  Tag,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Copy
} from 'lucide-react';

interface CaseData {
  id: string;
  caseNumber: string;
  clientName: string;
  clientPhone: string;
  court: string;
  status: string;
  summary: string;
  story: string;
  references: string;
  positiveAspects: string;
  negativeAspects: string;
  updates: Array<{
    id: string;
    title: string;
    content: string;
    date: string;
    type: 'update' | 'issue';
    selected: boolean;
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    date: string;
    size: string;
  }>;
}

interface CaseLoaderProps {
  caseData: CaseData;
  onInsertText: (text: string, targetField?: string) => void;
  onUpdateSelection: (updateId: string, selected: boolean) => void;
  onAttachDocument: (documentId: string) => void;
}

const CaseLoader: React.FC<CaseLoaderProps> = ({
  caseData,
  onInsertText,
  onUpdateSelection,
  onAttachDocument
}) => {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(section)) {
      newCollapsed.delete(section);
    } else {
      newCollapsed.add(section);
    }
    setCollapsedSections(newCollapsed);
  };

  const insertSection = (title: string, content: string) => {
    const formattedContent = `${title}:\n${content}\n\n`;
    onInsertText(formattedContent);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const selectedUpdates = caseData.updates.filter(update => update.selected);

  return (
    <div className="w-80 border-r border-border bg-muted/30 h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border bg-background">
        <h2 className="text-lg font-semibold text-foreground flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          কেস লোডার
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          কেস থেকে তথ্য ইনসার্ট করুন
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Case Snapshot */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Scale className="h-4 w-4 mr-2" />
                কেস স্ন্যাপশট
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {caseData.clientName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {caseData.clientPhone}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">কেস নং:</span>
                  <span className="font-medium">{caseData.caseNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">আদালত:</span>
                  <span className="font-medium text-right flex-1 ml-2 truncate">
                    {caseData.court}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">অবস্থা:</span>
                  <Badge className={`text-xs ${getStatusColor(caseData.status)}`}>
                    {caseData.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">কেস কন্টেন্ট</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">সারসংক্ষেপ</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => insertSection('কেস সারসংক্ষেপ', caseData.summary)}
                    className="h-6 px-2"
                  >
                    <ArrowRight className="h-3 w-3 mr-1" />
                    ইনসার্ট
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {caseData.summary}
                </p>
              </div>

              <Separator />

              {/* Story */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">কেস স্টোরি</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => insertSection('ঘটনার বিস্তারিত', caseData.story)}
                    className="h-6 px-2"
                  >
                    <ArrowRight className="h-3 w-3 mr-1" />
                    ইনসার্ট
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {caseData.story}
                </p>
              </div>

              <Separator />

              {/* References */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">আইনি রেফারেন্স</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => insertSection('প্রাসঙ্গিক আইন', caseData.references)}
                    className="h-6 px-2"
                  >
                    <ArrowRight className="h-3 w-3 mr-1" />
                    ইনসার্ট
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {caseData.references}
                </p>
              </div>

              <Separator />

              {/* Positive Aspects */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700">পজিটিভ দিক</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => insertSection('অনুকূল বিষয়সমূহ', caseData.positiveAspects)}
                    className="h-6 px-2"
                  >
                    <ArrowRight className="h-3 w-3 mr-1" />
                    ইনসার্ট
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {caseData.positiveAspects}
                </p>
              </div>

              <Separator />

              {/* Negative Aspects */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-700">নেগেটিভ দিক</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => insertSection('প্রতিকূল বিষয়সমূহ', caseData.negativeAspects)}
                    className="h-6 px-2"
                  >
                    <ArrowRight className="h-3 w-3 mr-1" />
                    ইনসার্ট
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {caseData.negativeAspects}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Updates & Issue Tags */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                <span className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  আপডেট ও ইস্যু ট্যাগ
                </span>
                {selectedUpdates.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedUpdates.length} টি নির্বাচিত
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {caseData.updates.map((update) => (
                  <div key={update.id} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-muted/50">
                    <Checkbox
                      checked={update.selected}
                      onCheckedChange={(checked) => onUpdateSelection(update.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {update.type === 'issue' ? (
                          <AlertCircle className="h-3 w-3 text-orange-500" />
                        ) : (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        )}
                        <span className="text-xs font-medium">{update.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {update.content}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {update.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedUpdates.length > 0 && (
                <>
                  <Separator className="my-3" />
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const selectedContent = selectedUpdates
                        .map(update => `• ${update.title}: ${update.content}`)
                        .join('\n');
                      onInsertText(`নির্বাচিত আপডেট ও ইস্যু:\n${selectedContent}\n\n`);
                    }}
                  >
                    <Plus className="h-3 w-3 mr-2" />
                    নির্বাচিত আইটেম ইনসার্ট করুন
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Download className="h-4 w-4 mr-2" />
                সর্বশেষ ডকুমেন্টস
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {caseData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAttachDocument(doc.id)}
                      className="h-6 px-2 ml-2 flex-shrink-0"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      অ্যাটাচ
                    </Button>
                  </div>
                ))}
              </div>

              {caseData.documents.length === 0 && (
                <div className="text-center py-4">
                  <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    কোন ডকুমেন্ট পাওয়া যায়নি
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CaseLoader;