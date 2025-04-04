
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { useState } from "react";
import CategorySelector from "@/components/CategorySelector";
import PoemCard from "@/components/PoemCard";
import { poems } from "@/data/poems";
import FeaturedPoets from "@/components/FeaturedPoets";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("सभी");

  // Filter poems based on selected category
  const filteredPoems = selectedCategory === "सभी" 
    ? poems.slice(0, 3) // Show only first 3 poems on homepage
    : poems.filter(poem => poem.category === selectedCategory).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-2xl md:text-3xl font-display text-center mb-12 decoration-top pt-6">
              प्रमुख कविताएँ
            </h2>
            
            <CategorySelector 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoems.map((poem) => (
                <PoemCard key={poem.id} poem={poem} />
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button asChild variant="outline">
                <Link to="/explore">और कविताएँ पढ़ें</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <FeaturedPoets />
        
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-display mb-6">
              अपनी कविता साझा करें
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              अपनी रचनात्मकता को व्यक्त करें और अपनी कविताओं को दुनिया के साथ साझा करें। हमारे समुदाय का हिस्सा बनें और अन्य कवियों से जुड़ें।
            </p>
            <Button asChild size="lg">
              <Link to="/submit">अभी लिखना शुरू करें</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
