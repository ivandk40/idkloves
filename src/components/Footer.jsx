import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onSelectSection }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#111111] bg-white py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <span className="font-display text-xl text-[#111111] tracking-tight block">
            idk loves
          </span>
          <p className="mt-1 font-serif italic text-xs text-[#666666]">
            A personal canon &amp; compendious archive migrated from Notion.
          </p>
        </div>

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

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-[#eeeeee] flex flex-col sm:flex-row items-center justify-between font-serif italic text-xs text-[#888888]">
        <span>Published at idkloves.com</span>
        <span>Curated for the curious mind</span>
      </div>
    </footer>
  );
}
