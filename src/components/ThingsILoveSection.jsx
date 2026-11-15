import React, { useState } from 'react';
import { Heart, Plus, Sparkles, Tag, Award, Bookmark } from 'lucide-react';

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
    <section id="things-i-love" className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Intro */}
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-transparent border border-rose-200/60 dark:border-rose-950/60 shadow-sm">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            Section 01 • Personal Canon
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
            Things I Love.
          </h2>
          <p className="font-serif text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            A personal catalog of everyday artifacts, slow rituals, tactile objects, enduring literature, and atmospheres that make being alive a little more luminous.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 hover:bg-stone-300/60 dark:hover:bg-stone-700/60'
            }`}
          >
            {cat} {cat === 'All' ? `(${things.length})` : ''}
          </button>
        ))}
      </div>

      {/* Grid of Things */}
      {filteredThings.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white/50 dark:bg-stone-900/50 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800">
          <Heart className="w-10 h-10 mx-auto text-stone-400 mb-3" />
          <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">No loved things found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or add a brand new item to your collection!
          </p>
          <button
            onClick={onOpenAddThing}
            className="mt-4 px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-medium hover:bg-rose-600 transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add First Thing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThings.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#141518] border border-stone-200/80 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-900/80 transition-all hover:shadow-lg hover:shadow-stone-200/50 dark:hover:shadow-black/50"
            >
              <div>
                {/* Meta Top */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.rating && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/60 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-500" />
                        {item.rating}
                      </span>
                    )}
                    {item.tag && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Why I Love It */}
                {item.whyLove && (
                  <div className="mt-4 p-3 rounded-xl bg-[#faf8f5] dark:bg-[#191b20] border-l-2 border-rose-500/80 text-xs text-stone-700 dark:text-stone-300">
                    <span className="font-semibold text-rose-600 dark:text-rose-400 block mb-0.5 font-mono text-[10px] uppercase">
                      Why It's Special
                    </span>
                    <span className="italic font-serif">"{item.whyLove}"</span>
                  </div>
                )}
              </div>

              {/* Bottom detail */}
              {item.favoriteDetail && (
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">Favorite nuance</span>
                  <span className="font-serif italic truncate max-w-[65%] text-stone-700 dark:text-stone-300" title={item.favoriteDetail}>
                    {item.favoriteDetail}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Quick Add CTA Card */}
          <div
            onClick={onOpenAddThing}
            className="cursor-pointer flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-800 hover:border-rose-400 dark:hover:border-rose-600 bg-stone-100/50 dark:bg-stone-900/30 hover:bg-rose-50/50 dark:hover:bg-rose-950/10 transition-all text-center group min-h-[260px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-stone-200 dark:bg-stone-800 group-hover:bg-rose-500 text-stone-500 dark:text-stone-400 group-hover:text-white flex items-center justify-center transition-colors mb-3">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200 group-hover:text-rose-600 dark:group-hover:text-rose-400">
              Add Another Love
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mt-1">
              Add an object, music album, coffee bean, book, or personal mindset to your canon.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
