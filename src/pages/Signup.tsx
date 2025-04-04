
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

const Signup = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.match('image.*')) {
        toast({
          variant: "destructive",
          title: "अमान्य फ़ाइल प्रकार",
          description: "कृपया छवि फ़ाइल चुनें (JPG, PNG, GIF)।"
        });
        return;
      }
      
      // Validate file size (max 5 MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "फ़ाइल बहुत बड़ी है",
          description: "अधिकतम फ़ाइल आकार 5 MB है।"
        });
        return;
      }
      
      setProfilePicture(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "सभी फ़ील्ड भरें",
        description: "कृपया सभी आवश्यक फ़ील्ड भरें।"
      });
      setIsLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "पासवर्ड मेल नहीं खाते",
        description: "पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।"
      });
      setIsLoading(false);
      return;
    }
    
    if (!agreed) {
      toast({
        variant: "destructive",
        title: "नियम और शर्तें",
        description: "कृपया नियम और शर्तें स्वीकार करें।"
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate signup API call
    setTimeout(() => {
      toast({
        title: "सफलतापूर्वक रजिस्टर किया गया!",
        description: "कविता सृजन मंच में आपका स्वागत है!",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 flex items-center justify-center">
        <div className="w-full max-w-md px-6 md:px-0">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-display text-center">रजिस्टर करें</CardTitle>
              <CardDescription className="text-center">
                अपना नया खाता बनाएं
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center space-y-3">
                  <Label htmlFor="profilePicture" className="self-start">प्रोफाइल चित्र</Label>
                  <div className="relative group cursor-pointer">
                    <Avatar className="w-24 h-24 border-2 border-primary">
                      {profilePreview ? (
                        <AvatarImage src={profilePreview} alt="Profile" />
                      ) : (
                        <AvatarFallback className="bg-muted">
                          <User className="w-12 h-12 text-muted-foreground" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs">बदलें</span>
                    </div>
                    <Input
                      id="profilePicture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                    />
                  </div>
                  <Label 
                    htmlFor="profilePicture" 
                    className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    {profilePreview ? "छवि बदलें" : "छवि अपलोड करें"}
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">नाम</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="आपका पूरा नाम"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">ईमेल</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="आपका ईमेल पता"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">पासवर्ड</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="पासवर्ड (कम से कम 8 अक्षर)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">पासवर्ड की पुष्टि करें</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                    placeholder="पासवर्ड दोबारा लिखें"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreed}
                    onCheckedChange={(checked) => {
                      setAgreed(checked as boolean);
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    मैं <Link to="/terms" className="text-primary hover:underline">नियम और शर्तों</Link> से सहमत हूँ
                  </label>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "प्रोसेसिंग..." : "रजिस्टर करें"}
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  पहले से खाता है?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    लॉग इन करें
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
