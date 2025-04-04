
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted mt-12 py-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-xl text-primary">कविता सृजन मंच</span>
            </Link>
            <p className="text-muted-foreground mt-2">
              हिंदी कविता के प्रेमियों का एक मंच, जहां आप अपनी रचनात्मकता को खुलकर व्यक्त कर सकते हैं।
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-medium text-foreground mb-4">नेविगेशन</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  होम
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-primary">
                  कविताएँ
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-muted-foreground hover:text-primary">
                  लिखें
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  परिचय
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-medium text-foreground mb-4">जानकारी</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  प्राइवेसी पॉलिसी
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">
                  नियम और शर्तें
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  संपर्क करें
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-muted-foreground">
          <p>&copy; {currentYear} कविता सृजन मंच - सभी अधिकार सुरक्षित</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
