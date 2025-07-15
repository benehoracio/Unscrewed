import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Menu, X, ShoppingCart } from "lucide-react";

interface NavigationProps {
  onCartClick: () => void;
  sessionId: string;
}

export default function Navigation({ onCartClick, sessionId }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: cartItems = [] } = useCart(sessionId);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-deep-black bg-opacity-90 backdrop-blur-md z-50 border-b border-neon-cyan border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-neon-green text-glow-green">UNSCREWED</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('music')}
              className="text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              Música
            </button>
            <button 
              onClick={() => scrollToSection('beats')}
              className="text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              Beats
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              Galeria
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              Contato
            </button>
            
            {/* Cart Icon */}
            <div className="relative">
              <button 
                onClick={onCartClick}
                className="text-neon-pink hover:text-neon-green transition-colors duration-300"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-neon-pink text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold cart-count">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-deep-black bg-opacity-95 backdrop-blur-md border-t border-neon-cyan border-opacity-20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('home')}
              className="block px-3 py-2 text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('music')}
              className="block px-3 py-2 text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              Música
            </button>
            <button 
              onClick={() => scrollToSection('beats')}
              className="block px-3 py-2 text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              Beats
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="block px-3 py-2 text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              Galeria
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block px-3 py-2 text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              Contato
            </button>
            <button 
              onClick={onCartClick}
              className="block px-3 py-2 text-neon-pink hover:text-neon-green transition-colors duration-300"
            >
              Carrinho ({totalItems})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
