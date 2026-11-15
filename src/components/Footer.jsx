import React from 'react';
import { Heart, Compass, Globe, ArrowUp, Github, Sparkles } from 'lucide-react';

export default function Footer({ onOpenDeployGuide }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 border-t border-stone-200 dark:border-stone-800 bg-[#f5f2eb] dark:bg-[#090a0b] py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              idkloves<span className="text-rose-500">.com</span>
            </span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
              two sections: what I love & what I found
            </span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md">
            Archive migrated from <span className="text-stone-700 dark:text-stone-300">Sherpa’s Miscellany Of Compendious Amusements</span>. Curated with care for the curious mind.
          </p>
        </div>

        {/* Center / Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDeployGuide}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 flex items-center gap-1.5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            <span>Connect idkloves.com</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stone-400 gap-3">
        <span>© {new Date().getFullYear()} idkloves.com. All intellectual curiosities belong to their original chroniclers.</span>
        <span>Built with React + Vite + Tailwind CSS</span>
      </div>
    </footer>
  );
}
