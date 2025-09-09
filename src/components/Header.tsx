import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Cart } from "./Cart";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Inicio", href: "#inicio", type: "scroll" },
    { label: "Cómo funciona", href: "#como-funciona", type: "scroll" },
    { label: "Beneficios", href: "#beneficios", type: "scroll" },
    { label: "Testimonios", href: "#testimonios", type: "scroll" },
    { label: "Precios", href: "/pricing", type: "route" },
    { label: "Servicios Puntuales", href: "/servicios", type: "route" },
    { label: "FAQ", href: "#faq", type: "scroll" },
  ];

  const handleNavigation = (item: { label: string; href: string; type: string }) => {
    if (item.type === "route") {
      navigate(item.href);
    } else {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait a bit for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/95 backdrop-blur-sm shadow-card" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            Asesfy
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item)}
                className="text-foreground hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Cart and CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Cart />
            <Button
              variant="cta"
              size="lg"
              onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
            >
              Empezar ahora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item)}
                  className="text-left text-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center justify-between mt-4">
                <Cart />
                <Button
                  variant="cta"
                  size="lg"
                  onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
                >
                  Empezar ahora
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;