import React from 'react';
import { Search, Shuffle, Plus, ArrowUpRight } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenRandomGem,
  onOpenAddThing,
  counts
}) {
  return (
    <header className="bg-white border-b border-[#e5e5e5] sticky top-0 z-40 transition-colors">
      {/* Top Masthead */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-5 text-center">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setActiveTab('loves'); }}
          className="inline-block group"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#111111] font-normal hover:opacity-80 transition-opacity">
            idk loves
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-sans uppercase tracking-[0.2em] text-[#666666]">
            A Personal Canon &amp; Curated Amusements
          </p>
        </a>

        {/* Minimalist 2-Section Switcher */}
        <div className="mt-6 flex items-center justify-center gap-8 border-t border-b border-[#e5e5e5] py-3 text-xs sm:text-sm font-sans uppercase tracking-widest">
          <button
            onClick={() => setActiveTab('loves')}
            className={`transition-all py-1 border-b-2 ${
              activeTab === 'loves'
                ? 'border-[#111111] text-[#111111] font-semibold'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            Things I Love ({counts.loves})
          </button>

          <span className="text-[#cccccc]">•</span>

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
        </div>
      </div>

      {/* Sub-bar: Search & Actions */}
      <div className="bg-[#fafafa] border-t border-[#f0f0f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          
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

          {/* Action buttons */}
          <div className="flex items-center gap-2 text-xs font-sans">
            <button
              onClick={onOpenRandomGem}
              className="px-3 py-1 rounded bg-white border border-[#e5e5e5] hover:border-[#111111] text-[#333333] hover:text-[#111111] flex items-center gap-1.5 transition-colors"
              title="Draw a random gem from the internet archive"
            >
              <Shuffle className="w-3 h-3 text-[#555555]" />
              <span className="hidden sm:inline">Random Gem</span>
            </button>

            <button
              onClick={onOpenAddThing}
              className="px-3 py-1 rounded bg-[#111111] hover:bg-black text-white flex items-center gap-1.5 transition-colors"
              title="Add a new item to Things I Love"
            >
              <Plus className="w-3 h-3" />
              <span>Add Love</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
