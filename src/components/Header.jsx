import React from 'react';
import { Search, Shuffle } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenRandomGem,
  counts
}) {
  return (
    <header className="bg-white border-b border-[#e5e5e5] sticky top-0 z-40 transition-colors">
      {/* Top Masthead (No 'idk loves' title) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-3 text-center">
        
        {/* Subtitle / Header Moniker */}
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#666666]">
          A Cabinet of Curiosities &amp; Personal Affections
        </p>

        {/* Minimalist 2-Section Switcher */}
        <div className="mt-3.5 flex items-center justify-center gap-8 border-t border-b border-[#e5e5e5] py-2 text-xs sm:text-sm font-sans uppercase tracking-widest">
          <button
            onClick={() => setActiveTab('curated')}
            className={`transition-all py-1 border-b-2 ${
              activeTab === 'curated'
                ? 'border-[#111111] text-[#111111] font-semibold'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            Compendious Amusements ({counts.curated})
          </button>

          <span className="text-[#cccccc]">•</span>

          <button
            onClick={() => setActiveTab('loves')}
            className={`transition-all py-1 border-b-2 ${
              activeTab === 'loves'
                ? 'border-[#111111] text-[#111111] font-semibold'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            Things I Love {counts.loves > 0 ? `(${counts.loves})` : ''}
          </button>
        </div>
      </div>

      {/* Sub-bar: Search & Random Gem (No 'Add Love' button) */}
      <div className="bg-[#fafafa] border-t border-[#f0f0f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" />
            <input
              type="text"
              placeholder="Search archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 rounded bg-white border border-[#e5e5e5] text-xs font-sans text-[#111111] placeholder-[#888888] focus:outline-none focus:border-[#111111] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111] text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

          {/* Random Gem Action */}
          <button
            onClick={onOpenRandomGem}
            className="px-3 py-1 rounded bg-white border border-[#e5e5e5] hover:border-[#111111] text-[#333333] hover:text-[#111111] text-xs font-sans flex items-center gap-1.5 transition-colors"
            title="Draw a random gem from the internet archive"
          >
            <Shuffle className="w-3 h-3 text-[#555555]" />
            <span>Random Gem</span>
          </button>

        </div>
      </div>
    </header>
  );
}
