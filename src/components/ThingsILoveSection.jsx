import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function ThingsILoveSection({ things, onOpenAddThing, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(things.map(t => t.category))];

  const filteredThings = things.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.whyLove && item.whyLove.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section className="space-y-10 animate-in fade-in duration-300">
      
      {/* Editorial Header */}
      <div className="border-b border-[#111111] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#888888] block mb-1">
              Section I
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#111111] tracking-tight">
              Things I Love
            </h2>
          </div>
          <p className="max-w-md font-serif text-sm text-[#555555] leading-relaxed italic">
            A personal collection of everyday artifacts, analog tools, enduring literature, slow rituals, and atmospheres that reward close attention.
          </p>
        </div>
      </div>

      {/* Category Navigation */}
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

      {/* List of Loved Items */}
      {filteredThings.length === 0 ? (
        <div className="text-center py-20 px-4 border border-dashed border-[#dddddd] rounded">
          <p className="font-serif italic text-base text-[#666666]">No entries found in this category.</p>
          <button
            onClick={onOpenAddThing}
            className="mt-4 px-4 py-1.5 rounded bg-[#111111] text-white text-xs font-sans uppercase tracking-wider hover:bg-black transition-colors"
          >
            Add an item
          </button>
        </div>
      ) : (
        <div className="divide-y divide-[#eeeeee]">
          {filteredThings.map((item, idx) => (
            <article
              key={item.id}
              className="py-8 group flex flex-col md:flex-row md:items-baseline justify-between gap-6 transition-colors"
            >
              {/* Left Column: Number & Category */}
              <div className="md:w-48 flex-shrink-0">
                <span className="font-sans text-[11px] uppercase tracking-widest text-[#999999] block mb-1">
                  {String(idx + 1).padStart(2, '0')} • {item.category}
                </span>
                {item.tag && (
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-sans uppercase tracking-wider bg-[#f3f3f3] text-[#555555]">
                    {item.tag}
                  </span>
                )}
                {item.rating && (
                  <span className="block mt-2 font-serif text-xs italic text-[#777777]">
                    Tier: {item.rating}
                  </span>
                )}
              </div>

              {/* Main Column: Title & Body */}
              <div className="flex-1 space-y-3">
                <h3 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal tracking-tight group-hover:underline underline-offset-4 decoration-1">
                  {item.title}
                </h3>

                <p className="font-serif text-base text-[#333333] leading-relaxed">
                  {item.description}
                </p>

                {item.whyLove && (
                  <div className="pt-2">
                    <p className="font-serif italic text-sm text-[#555555] border-l-2 border-[#111111] pl-3">
                      “{item.whyLove}”
                    </p>
                  </div>
                )}

                {item.favoriteDetail && (
                  <p className="font-sans text-xs text-[#888888] pt-1">
                    <span className="uppercase tracking-wider font-medium text-[#555555]">Nuance:</span> {item.favoriteDetail}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Add New Thing Footer */}
      <div className="border-t border-[#111111] pt-6 flex justify-center">
        <button
          onClick={onOpenAddThing}
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#111111] text-xs font-sans uppercase tracking-widest text-[#111111] hover:bg-[#111111] hover:text-white transition-all rounded"
        >
          <Plus className="w-3.5 h-3.5" />
          Add to this list
        </button>
      </div>

    </section>
  );
}
