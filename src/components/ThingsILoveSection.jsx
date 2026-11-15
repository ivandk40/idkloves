import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function ThingsILoveSection({ things = [], searchQuery = '', onOpenAddModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = things.length > 0 ? ['All', ...new Set(things.map(t => t.category))] : [];

  const filteredThings = things.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      
      {/* Category Navigation (Cleanly Wrapped, No Horizontal Scrollbar) */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-y-3 border-b border-[#e5e5e5] pb-2.5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-sans uppercase tracking-wider">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-1 border-b-2 transition-all ${
                  selectedCategory === cat
                    ? 'border-[#111111] text-[#111111] font-semibold'
                    : 'border-transparent text-[#777777] hover:text-[#111111]'
                }`}
              >
                {cat} {cat === 'All' ? `(${things.length})` : ''}
              </button>
            ))}
          </div>
          <span className="font-sans text-[11px] text-[#888888] whitespace-nowrap self-end sm:self-center">
            {filteredThings.length} items
          </span>
        </div>
      )}

      {/* When blank: quiet minimalist placeholder with invite to add */}
      {things.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif italic text-lg text-[#555555]">
            Currently unwritten.
          </p>
          <p className="mt-2 font-sans text-xs uppercase tracking-widest text-[#999999]">
            A personal canon in progress
          </p>
          {onOpenAddModal && (
            <button
              onClick={onOpenAddModal}
              className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded border border-[#111111] text-xs font-sans uppercase tracking-wider hover:bg-[#111111] hover:text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record your first love</span>
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-[#eeeeee]">
          {filteredThings.map((item, idx) => (
            <article
              key={item.id || idx}
              className="py-3.5 sm:py-4 group hover:bg-[#fafafa] px-3 -mx-3 rounded transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                  <span className="font-sans text-[10px] text-[#999999] font-mono select-none w-5 flex-shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <h3 className="font-display text-base sm:text-lg text-[#111111] font-normal tracking-tight">
                    {item.title}
                  </h3>
                  {item.category && (
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#777777]">
                      — {item.category}
                    </span>
                  )}
                </div>

                {item.tag && (
                  <span className="text-[10px] font-sans uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#f3f3f3] text-[#555555]">
                    {item.tag}
                  </span>
                )}
              </div>

              {item.description && (
                <p className="font-serif text-xs sm:text-[13px] text-[#555555] leading-relaxed mt-1.5 sm:pl-7">
                  {item.description}
                </p>
              )}

              {item.whyLove && (
                <p className="font-serif italic text-xs text-[#777777] leading-relaxed mt-1 sm:pl-7">
                  "{item.whyLove}"
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
