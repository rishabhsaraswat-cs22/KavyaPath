
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-6xl font-display text-primary mb-4">404</h1>
          <h2 className="text-2xl font-medium mb-6">पृष्ठ नहीं मिला</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            आप जिस पृष्ठ की तलाश कर रहे हैं, वह मौजूद नहीं है या हटा दिया गया है।
          </p>
          <Button asChild>
            <Link to="/">होम पेज पर वापस जाएं</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
