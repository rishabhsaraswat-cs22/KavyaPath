
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay before starting the animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const img = "https://img.freepik.com/premium-photo/tranquil-riverside-with-saraswati-playing-veena_841543-75918.jpg"

  return (
    <div className="relative from-accent/40 to-background py-16 md:py-24 overflow-hidden">
      {/* Saraswati image background */}
      <div className="absolute inset-0 flex justify-center items-center opacity-15 pointer-events-none w-[100vw]">
        <img 
          src={img} 
          alt="Goddess Saraswati" 
          className="w-3/4 md:w-1/2 max-h-full object-fill"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center relative z-10">
        <h1 className={`font-display text-4xl md:text-6xl text-foreground mb-6 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          अपनी <span className="text-primary">कविता</span> को दें उड़ान
        </h1>
        <p className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          कविता सृजन मंच पर अपनी कविताओं को लिखें, पढ़ें और दूसरों के साथ साझा करें। हिंदी साहित्य के इस मंच पर आपका स्वागत है।
        </p>
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button asChild size="lg" className="px-8">
            <Link to="/explore">कविताएँ पढ़ें</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <Link to="/submit">अपनी कविता लिखें</Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-primary/10 -z-10"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-secondary/10 -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-accent/20 -z-10"></div>
    </div>
  );
};

export default Hero;
