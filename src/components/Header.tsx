import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import bettorFundedLogo from "@/assets/bettorfunded-logo.png";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-[#d4af37]/30 shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={bettorFundedLogo}
            alt="FundedSport Logo"
            className="h-9 w-auto object-contain drop-shadow-[0_0_6px_rgba(212,175,55,0.4)]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {[
            { name: "How It Works", href: "#how-it-works" },
            { name: "Reviews", href: "/reviews" },
            { name: "Challenges", href: "/challenges" },
            { name: "FAQs", href: "#faq" },
            { name: "Contact Us", href: "/contact" },
            { name: "Calculators", href: "/calculators" },
          ].map((item) =>
            item.href.startsWith("#") ? (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(item.href.substring(1))
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative text-gray-300 hover:text-[#d4af37] transition-colors cursor-pointer group"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  item.name === "Challenges"
                    ? "bg-[#d4af37] text-black px-4 py-1.5 rounded-full font-semibold hover:bg-[#bfa036] transition-all shadow-md"
                    : "relative text-gray-300 hover:text-[#d4af37] transition-colors group"
                }`}
              >
                {item.name}
                {item.name !== "Challenges" && (
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            )
          )}
        </nav>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {!user ? (
            <>
              <Link
                to="/auth"
                className="text-gray-300 hover:text-[#d4af37] text-sm font-semibold transition-colors"
              >
                Login
              </Link>
              <Button className="bg-[#d4af37] hover:bg-[#bfa036] text-black font-semibold px-5 py-2 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)] transition-all">
                Get Funded →
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="default"
                className="bg-[#d4af37] text-black hover:bg-[#bfa036] font-semibold"
              >
                <Link to="/challenges">Buy Challenge</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#1a1a1a] rounded-full"
                  >
                    <User className="h-5 w-5 text-[#d4af37]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-[#1a1a1a] text-white border border-[#d4af37]/30 rounded-md shadow-lg"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center cursor-pointer hover:text-[#d4af37]"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4 text-[#d4af37]" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="flex items-center cursor-pointer hover:text-[#d4af37]"
                    >
                      <UserCircle className="mr-2 h-4 w-4 text-[#d4af37]" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-400 hover:text-red-300"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#d4af37]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Golden underline glow */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent animate-pulse"></div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 py-4 border-t border-[#d4af37]/20 transition-all">
          <nav className="flex flex-col space-y-4 px-6 text-gray-300">
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-[#d4af37]"
            >
              How It Works
            </a>
            <Link
              to="/reviews"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#d4af37]"
            >
              Reviews
            </Link>
            <Link
              to="/challenges"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#d4af37]"
            >
              Challenges
            </Link>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                document
                  .getElementById("faq")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-[#d4af37]"
            >
              FAQs
            </a>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#d4af37]"
            >
              Contact Us
            </Link>
            <Link
              to="/calculators"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#d4af37]"
            >
              Calculators
            </Link>

            {!user ? (
              <Link
                to="/auth"
                className="hover:text-[#d4af37]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-[#d4af37]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-[#d4af37]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hover:text-[#d4af37] text-left"
                >
                  Logout
                </button>
              </>
            )}
            <Button
              asChild
              className="w-full bg-[#d4af37] text-black hover:bg-[#bfa036]"
            >
              <Link to="/challenges" onClick={() => setIsMobileMenuOpen(false)}>
                {user ? "Buy Challenge" : "Buy Now"}
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

