import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  HelpCircle 
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  bengaliQuestion: string;
  category: string;
  isRequired: boolean;
}

interface Answer {
  questionId: string;
  answer: string;
}

const questions: Question[] = [
  {
    id: "q1",
    question: "What type of case is this?",
    bengaliQuestion: "এটি কি ধরনের মামলা?",
    category: "case-type",
    isRequired: true
  },
  {
    id: "q2",
    question: "Are there any ongoing disputes or previous cases?",
    bengaliQuestion: "কোন চলমান বিরোধ বা পূর্বের মামলা আছে কি?",
    category: "background",
    isRequired: true
  },
  {
    id: "q3",
    question: "What outcome are you seeking?",
    bengaliQuestion: "আপনি কি ধরনের সমাধান চান?",
    category: "outcome",
    isRequired: true
  },
  {
    id: "q4",
    question: "Are there any financial damages involved?",
    bengaliQuestion: "কোন আর্থিক ক্ষতি হয়েছে কি?",
    category: "damages",
    isRequired: false
  },
  {
    id: "q5",
    question: "Do you have any supporting documents?",
    bengaliQuestion: "আপনার কাছে কোন সহায়ক নথিপত্র আছে কি?",
    category: "documents",
    isRequired: false
  },
  {
    id: "q6",
    question: "Were there any witnesses to the incident?",
    bengaliQuestion: "ঘটনার কোন সাক্ষী ছিল কি?",
    category: "witnesses",
    isRequired: false
  }
];

export function GuidedQASession() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([
    { questionId: "q1", answer: "এটি একটি ফৌজদারি মামলা - চুরির অভিযোগ। দণ্ডবিধি ১৮৬০ এর ৩৭৮ ধারা অনুযায়ী চুরির অপরাধ।" },
    { questionId: "q2", answer: "না, এর আগে কোন মামলা বা বিরোধ নেই। এটি প্রথমবার এমন ঘটনা ঘটেছে।" },
    { questionId: "q3", answer: "অভিযুক্তদের গ্রেফতার ও যথাযথ শাস্তি চাই। ক্ষতিপূরণ এবং ভবিষ্যতে নিরাপত্তার নিশ্চয়তা চাই।" }
  ]);
  const [currentAnswer, setCurrentAnswer] = useState("৫০,০০০ টাকার স্মার্টফোন নিয়ে যাওয়ার চেষ্টা হয়েছে। এছাড়া মানসিক কষ্ট ও ব্যবসায়িক ক্ষতি হয়েছে।");

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = () => {
    if (currentAnswer.trim()) {
      const newAnswers = answers.filter(a => a.questionId !== questions[currentQuestion].id);
      newAnswers.push({
        questionId: questions[currentQuestion].id,
        answer: currentAnswer
      });
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setCurrentAnswer("");
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      const prevAnswer = answers.find(a => a.questionId === questions[currentQuestion - 1].id);
      setCurrentAnswer(prevAnswer?.answer || "");
    }
  };

  const getAnswerForQuestion = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.answer || "";
  };

  const isCurrentQuestionAnswered = () => {
    return getAnswerForQuestion(questions[currentQuestion].id).trim().length > 0;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <MessageSquare className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">গাইডেড প্রশ্নোত্তর সেশন</h1>
          <p className="text-muted-foreground">Guided Q&A Session</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>প্রশ্ন {currentQuestion + 1} of {questions.length}</CardTitle>
            <Badge variant="outline">{Math.round(progress)}% সম্পূর্ণ</Badge>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <HelpCircle className="h-6 w-6 text-primary mt-1" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {questions[currentQuestion].bengaliQuestion}
                </h3>
                <p className="text-muted-foreground">
                  {questions[currentQuestion].question}
                </p>
                {questions[currentQuestion].isRequired && (
                  <Badge variant="outline" className="text-destructive">প্রয়োজনীয়</Badge>
                )}
              </div>
            </div>

            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="আপনার উত্তর বিস্তারিত লিখুন..."
              rows={6}
              className="resize-none text-base"
            />

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                পূর্ববর্তী
              </Button>

              <Button
                onClick={handleAnswer}
                disabled={!currentAnswer.trim()}
                className={currentQuestion === questions.length - 1 ? "bg-success hover:bg-success/90" : ""}
              >
                {currentQuestion === questions.length - 1 ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    সম্পূর্ণ করুন
                  </>
                ) : (
                  <>
                    পরবর্তী
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Previous answers summary */}
      {answers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>আপনার উত্তরসমূহ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {answers.map((answer, index) => {
                const question = questions.find(q => q.id === answer.questionId);
                return (
                  <div key={answer.questionId} className="border-l-2 border-primary pl-4">
                    <p className="font-medium text-sm">{question?.bengaliQuestion}</p>
                    <p className="text-sm text-muted-foreground mt-1">{answer.answer}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}