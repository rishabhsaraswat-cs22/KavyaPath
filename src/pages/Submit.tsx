
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/components/CategorySelector";
import { useToast } from "@/components/ui/use-toast";

const Submit = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!title || !content || !category) {
      toast({
        variant: "destructive",
        title: "सभी फ़ील्ड भरें",
        description: "कृपया सभी आवश्यक फ़ील्ड भरें।"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "कविता सफलतापूर्वक जमा की गई!",
        description: "आपकी कविता प्रकाशित होने के बाद आपको सूचित किया जाएगा।",
      });
      
      // Reset form
      setTitle("");
      setContent("");
      setCategory("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-4xl font-display mb-2">अपनी कविता लिखें</h1>
          <p className="text-muted-foreground mb-8">
            अपनी रचनात्मकता को व्यक्त करें और अपनी कविता को समुदाय के साथ साझा करें।
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">शीर्षक</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                placeholder="अपनी कविता का शीर्षक लिखें"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">श्रेणी</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="input-field">
                  <SelectValue placeholder="एक श्रेणी चुनें" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(cat => cat.id !== "all").map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">कविता</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input-field min-h-[200px]"
                placeholder="यहां अपनी कविता लिखें..."
              />
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "जमा हो रहा है..." : "कविता जमा करें"}
              </Button>
            </div>
          </form>
          
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-medium mb-4">कविता लेखन के सुझाव</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>अपनी कविता पर गंभीरता से विचार करें और उसे संपादित करें।</li>
              <li>अपनी भावनाओं को सच्चाई के साथ व्यक्त करें।</li>
              <li>सरल और सहज भाषा का प्रयोग करें।</li>
              <li>उचित छंद और लय का ध्यान रखें।</li>
              <li>अपनी कविता का शीर्षक आकर्षक रखें।</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Submit;
