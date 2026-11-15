import React from 'react';
import { Search, Plus } from 'lucide-react';

export default function Header({
  searchQuery,
  setSearchQuery,
  onOpenAddModal,
  count
}) {
  return (
    <header className="bg-white border-b border-[#e5e5e5] sticky top-0 z-40 transition-colors">
      {/* Editorial Masthead */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-4 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-normal text-[#111111] tracking-tight">
          idk loves
        </h1>
        <p className="mt-2 font-serif italic text-xs sm:text-[13px] text-[#666666] max-w-2xl mx-auto leading-relaxed">
          A personal canon of books, cinema, gear, objects, rituals, and quiet affections.
        </p>
      </div>

      {/* Sub-bar: Search & Add Thing */}
      <div className="bg-[#fafafa] border-t border-[#f0f0f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" />
            <input
              type="text"
              placeholder={`Search personal canon...`}
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

          {/* Add Thing Action */}
          <button
            onClick={onOpenAddModal}
            className="px-3 py-1 rounded bg-[#111111] hover:bg-[#333333] text-white text-xs font-sans flex items-center gap-1.5 transition-colors shadow-sm"
            title="Add a new item to your personal canon"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Love</span>
          </button>

        </div>
      </div>
    </header>
  );
}
