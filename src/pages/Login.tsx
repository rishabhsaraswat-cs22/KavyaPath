
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "सभी फ़ील्ड भरें",
        description: "कृपया सभी आवश्यक फ़ील्ड भरें।"
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate login API call
    setTimeout(() => {
      toast({
        title: "सफलतापूर्वक लॉग इन किया गया!",
        description: "आपका स्वागत है!",
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
              <CardTitle className="text-2xl font-display text-center">लॉग इन</CardTitle>
              <CardDescription className="text-center">
                अपने खाते में लॉग इन करें
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">पासवर्ड</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      पासवर्ड भूल गए?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="आपका पासवर्ड"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "लॉग इन हो रहा है..." : "लॉग इन करें"}
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  खाता नहीं है?{" "}
                  <Link to="/signup" className="text-primary hover:underline">
                    रजिस्टर करें
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

export default Login;
