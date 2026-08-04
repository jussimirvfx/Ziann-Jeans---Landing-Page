import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface NavbarProps {
  onScrollToForm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white border-b border-neutral-200/80'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center">
          <img
            src="https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/logo-ziann-em-aberto-branca-1-1785183016766.webp"
            alt="Ziann Jeans"
            className="h-7 sm:h-9 w-auto object-contain brightness-0"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Action Button */}
        <div>
          <button
            id="nav-cta-btn"
            onClick={onScrollToForm}
            className={`group relative inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-none active:scale-95 cursor-pointer border-none shadow-none ${
              isScrolled
                ? 'bg-black text-white hover:bg-neutral-800'
                : 'bg-transparent text-black hover:opacity-80'
            }`}
          >
            <span className={isScrolled ? 'text-white' : 'text-black'}>Seja Parceiro</span>
            <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 ${isScrolled ? 'text-white' : 'text-black'}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

