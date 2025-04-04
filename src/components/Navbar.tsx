
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background sticky top-0 z-50 border-b py-4 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl text-primary">कविता सृजन मंच</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-primary font-medium">
            होम
          </Link>
          <Link to="/explore" className="text-foreground hover:text-primary font-medium">
            कविताएँ
          </Link>
          <Link to="/submit" className="text-foreground hover:text-primary font-medium">
            लिखें
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary font-medium">
            परिचय
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button onClick={toggleTheme} variant="ghost" size="icon" className="rounded-full">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button asChild variant="outline">
            <Link to="/login">लॉग इन</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">रजिस्टर</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button onClick={toggleTheme} variant="ghost" size="icon" className="rounded-full">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button onClick={toggleMenu} variant="ghost" size="icon" className="rounded-full">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden z-50 py-4 px-6">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                होम
              </Link>
              <Link 
                to="/explore" 
                className="text-foreground hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                कविताएँ
              </Link>
              <Link 
                to="/submit" 
                className="text-foreground hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                लिखें
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                परिचय
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>लॉग इन</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>रजिस्टर</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
