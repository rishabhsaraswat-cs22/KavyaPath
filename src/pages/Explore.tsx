
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategorySelector from "@/components/CategorySelector";
import PoemCard from "@/components/PoemCard";
import { poems } from "@/data/poems";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter poems based on selected category and search query
  const filteredPoems = poems.filter((poem) => {
    // Filter by category
    const categoryMatch = selectedCategory === "all" || poem.category === selectedCategory;
    
    // Filter by search query
    const searchMatch = searchQuery === "" || 
      poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poem.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poem.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-4xl font-display mb-8">कविताएँ खोजें</h1>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="कविता, कवि या विषय खोजें..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <CategorySelector 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
          
          {filteredPoems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">कोई कविता नहीं मिली।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoems.map((poem) => (
                <PoemCard key={poem.id} poem={poem} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
