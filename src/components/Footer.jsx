import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onSelectSection }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#111111] bg-white py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <p className="font-serif italic text-xs text-[#777777]">
          Curated curiosities from the far reaches of the internet.
        </p>

        <div className="flex items-center gap-6 text-xs font-sans uppercase tracking-widest text-[#555555]">
          <button 
            onClick={() => onSelectSection('loves')}
            className="hover:text-[#111111] transition-colors"
          >
            Things I Love
          </button>
          <span>•</span>
          <button 
            onClick={() => onSelectSection('curated')}
            className="hover:text-[#111111] transition-colors"
          >
            Compendious Amusements
          </button>
          <span>•</span>
          <button 
            onClick={scrollToTop}
            className="hover:text-[#111111] transition-colors p-1"
            title="Return to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
