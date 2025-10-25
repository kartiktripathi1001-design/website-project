import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import fstLogo from "@/assets/fst-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={fstLogo} alt="FST Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-foreground">Funded Sports Trader</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Transform your sports betting skills into a professional trading career. 
              Get funded up to $300k and keep up to 90% of your profits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/challenges">Start Trading</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/challenges" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Challenges
                </Link>
              </li>
              <li>
                <Link 
                  to="/evaluation-process" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Evaluation Process
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#faq" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@fundedsportstrader.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Live Chat
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 Funded Sports Trader. All rights reserved.</p>
            <div className="flex gap-4">
              <Link 
                to="/privacy" 
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/disclaimer" 
                className="hover:text-primary transition-colors"
              >
                Risk Disclaimer
              </Link>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Licensed and Regulated Trading Platform</p>
          </div>
        </div>
      </div>
    </footer>
  );
};