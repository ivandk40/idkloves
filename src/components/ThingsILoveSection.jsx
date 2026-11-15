import React, { useState } from 'react';

export default function ThingsILoveSection({ things = [], searchQuery = '' }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = things.length > 0 ? ['All', ...new Set(things.map(t => t.category))] : [];

  const filteredThings = things.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="space-y-8 animate-in fade-in duration-300">
      
      {/* Editorial Header */}
      <div className="border-b border-[#111111] pb-6">
        <div>
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#888888] block mb-1">
            Section I
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#111111] tracking-tight">
            Things I Love
          </h2>
        </div>
      </div>

      {/* When blank: quiet minimalist placeholder */}
      {things.length === 0 ? (
        <div className="py-28 text-center">
          <p className="font-serif italic text-lg text-[#777777]">
            Currently unwritten.
          </p>
          <p className="mt-2 font-sans text-xs uppercase tracking-widest text-[#aaaaaa]">
            A personal canon in progress
          </p>
        </div>
      ) : (
        <>
          {/* Category Navigation (if items exist) */}
          {categories.length > 1 && (
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none border-b border-[#e5e5e5] text-xs font-sans uppercase tracking-wider">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap pb-2 border-b-2 transition-all ${
                    selectedCategory === cat
                      ? 'border-[#111111] text-[#111111] font-semibold'
                      : 'border-transparent text-[#777777] hover:text-[#111111]'
                  }`}
                >
                  {cat} {cat === 'All' ? `(${things.length})` : ''}
                </button>
              ))}
            </div>
          )}

          {/* List of items */}
          <div className="divide-y divide-[#eeeeee]">
            {filteredThings.map((item, idx) => (
              <article
                key={item.id || idx}
                className="py-8 group flex flex-col md:flex-row md:items-baseline justify-between gap-6 transition-colors"
              >
                <div className="md:w-48 flex-shrink-0">
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[#999999] block mb-1">
                    {String(idx + 1).padStart(2, '0')} • {item.category}
                  </span>
                  {item.tag && (
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-sans uppercase tracking-wider bg-[#f3f3f3] text-[#555555]">
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-serif text-base text-[#333333] leading-relaxed">
                    {item.description}
                  </p>
                  {item.whyLove && (
                    <p className="font-serif italic text-sm text-[#555555] border-l-2 border-[#111111] pl-3">
                      “{item.whyLove}”
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

    </section>
  );
}
