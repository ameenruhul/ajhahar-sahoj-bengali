import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, User, Phone, MapPin, Calendar } from "lucide-react";

interface ClientInfo {
  name: string;
  nameEnglish: string;
  fatherName: string;
  motherName: string;
  age: string;
  phone: string;
  address: string;
  occupation: string;
  nationalId: string;
}

export function ClientInfoForm() {
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: "মোহাম্মদ আব্দুল রহিম",
    nameEnglish: "Mohammad Abdul Rahim",
    fatherName: "মোহাম্মদ আব্দুর রহমান",
    motherName: "ফাতেমা খাতুন",
    age: "৪৫",
    phone: "০১৭১২-৩৪৫৬৭৮",
    address: "বাড়ি: ২৫, রোড: ৩, ব্লক: এ, মিরপুর-১০, ঢাকা-১২১৬",
    occupation: "ব্যবসায়ী (মোবাইল ফোনের দোকান)",
    nationalId: "১৯৭৮১২৩৪৫৬৭৮৯০১"
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // Auto-save functionality
    localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updateField = (field: keyof ClientInfo, value: string) => {
    setClientInfo(prev => ({ ...prev, [field]: value }));
    // Auto-save after delay
    setTimeout(handleSave, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <User className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">ক্লায়েন্ট তথ্য</h1>
            <p className="text-muted-foreground">Client Information</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isSaved && <Badge variant="outline" className="text-success">সংরক্ষিত</Badge>}
          <Button onClick={handleSave} size="sm">
            <Save className="h-4 w-4 mr-2" />
            সংরক্ষণ করুন
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>ব্যক্তিগত তথ্য</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">নাম (বাংলায়) *</Label>
              <Input
                id="name"
                value={clientInfo.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="উদাহরণ: মোহাম্মদ রহিম"
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nameEnglish">Name (English) *</Label>
              <Input
                id="nameEnglish"
                value={clientInfo.nameEnglish}
                onChange={(e) => updateField('nameEnglish', e.target.value)}
                placeholder="Example: Mohammad Rahim"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fatherName">পিতার নাম</Label>
              <Input
                id="fatherName"
                value={clientInfo.fatherName}
                onChange={(e) => updateField('fatherName', e.target.value)}
                placeholder="পিতার নাম লিখুন"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motherName">মাতার নাম</Label>
              <Input
                id="motherName"
                value={clientInfo.motherName}
                onChange={(e) => updateField('motherName', e.target.value)}
                placeholder="মাতার নাম লিখুন"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>বয়স</span>
              </Label>
              <Input
                id="age"
                type="number"
                value={clientInfo.age}
                onChange={(e) => updateField('age', e.target.value)}
                placeholder="উদাহরণ: ৩৫"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>ফোন নম্বর</span>
              </Label>
              <Input
                id="phone"
                value={clientInfo.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="উদাহরণ: ০১৭১২৩৪৫৬৭৮"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">পেশা</Label>
              <Input
                id="occupation"
                value={clientInfo.occupation}
                onChange={(e) => updateField('occupation', e.target.value)}
                placeholder="উদাহরণ: ব্যবসায়ী, চাকরিজীবি"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationalId">জাতীয় পরিচয়পত্র নম্বর</Label>
              <Input
                id="nationalId"
                value={clientInfo.nationalId}
                onChange={(e) => updateField('nationalId', e.target.value)}
                placeholder="১৩ অথবা ১৭ সংখ্যার NID"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>পূর্ণ ঠিকানা</span>
            </Label>
            <Textarea
              id="address"
              value={clientInfo.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="গ্রাম/মহল্লা, ডাকঘর, উপজেলা, জেলা লিখুন"
              rows={3}
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}