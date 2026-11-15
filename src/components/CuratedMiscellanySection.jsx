import React, { useState } from 'react';
import { ExternalLink, BookOpen, Star, Clock } from 'lucide-react';

export default function CuratedMiscellanySection({ 
  gems, 
  onSelectStory, 
  searchQuery
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    '⭐️ Staff Picks',
    'Essays',
    'The New Yorker',
    'Articles',
    'Aviation Disasters',
    'Sad, Creepy & Disturbing',
    'Museum of Reddit',
    'Sci-Fi, Philosophy & Mathematics',
    'Podcasts',
    'Webcomics',
    'Bizarre and Mystifying',
    'Music',
    'Miscellaneous'
  ];

  const filteredGems = gems.filter((gem) => {
    let matchesCat = true;
    if (selectedCategory === '⭐️ Staff Picks') {
      matchesCat = gem.isStaffPick;
    } else if (selectedCategory !== 'All') {
      matchesCat = gem.category.toLowerCase() === selectedCategory.toLowerCase();
    }

    let matchesSearch = true;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      matchesSearch = 
        gem.title.toLowerCase().includes(q) ||
        (gem.author && gem.author.toLowerCase().includes(q)) ||
        (gem.description && gem.description.toLowerCase().includes(q)) ||
        (gem.category && gem.category.toLowerCase().includes(q)) ||
        (gem.type && gem.type.toLowerCase().includes(q));
    }

    return matchesCat && matchesSearch;
  });

  return (
    <section className="space-y-10 animate-in fade-in duration-300">
      
      {/* Editorial Header */}
      <div className="border-b border-[#111111] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#888888] block mb-1">
              Section II • Internet Archive
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#111111] tracking-tight">
              Sherpa’s Miscellany
            </h2>
          </div>
          <p className="max-w-md font-serif text-sm text-[#555555] leading-relaxed italic">
            Curated content dredged from the far reaches of the internet. Gripping investigative journalism, aviation post-mortems, transfinite mathematics, eerie manga, and internet lore.
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none border-b border-[#e5e5e5] text-xs font-sans uppercase tracking-wider">
        {categories.map((cat) => {
          const isStaff = cat === '⭐️ Staff Picks';
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap pb-2 border-b-2 transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'border-[#111111] text-[#111111] font-semibold'
                  : 'border-transparent text-[#777777] hover:text-[#111111]'
              }`}
            >
              {isStaff && <Star className="w-3 h-3 fill-[#111111] text-[#111111]" />}
              {cat}
            </button>
          );
        })}
      </div>

      {/* List of Curated Gems */}
      {filteredGems.length === 0 ? (
        <div className="text-center py-20 px-4 border border-dashed border-[#dddddd] rounded">
          <p className="font-serif italic text-base text-[#666666]">No amusements found in this category.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#eeeeee]">
          {filteredGems.map((gem, idx) => {
            const hasStory = gem.paragraphs && gem.paragraphs.length > 0;

            return (
              <article
                key={gem.id}
                className="py-8 group flex flex-col md:flex-row md:items-baseline justify-between gap-6 transition-colors"
              >
                {/* Left Column: Number, Category, Type, Staff Pick */}
                <div className="md:w-56 flex-shrink-0 space-y-1">
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[#999999] block">
                    {gem.category}
                  </span>
                  
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-sans uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#f3f3f3] text-[#555555]">
                      {gem.type}
                    </span>
                    {gem.isStaffPick && (
                      <span className="text-[10px] font-sans uppercase tracking-wider font-semibold text-[#111111] flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-[#111111]" /> Pick
                      </span>
                    )}
                  </div>

                  {gem.readingTime && (
                    <span className="font-sans text-[11px] text-[#888888] flex items-center gap-1 pt-1">
                      <Clock className="w-3 h-3 text-[#999999]" />
                      {gem.readingTime}
                    </span>
                  )}
                </div>

                {/* Main Column: Title, Author, Description, Actions */}
                <div className="flex-1 space-y-2.5">
                  <h3 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal tracking-tight group-hover:underline underline-offset-4 decoration-1">
                    {gem.url ? (
                      <a 
                        href={gem.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:opacity-80"
                      >
                        <span>{gem.title}</span>
                        <ExternalLink className="w-4 h-4 text-[#888888] inline" />
                      </a>
                    ) : (
                      <span 
                        onClick={() => hasStory && onSelectStory(gem)}
                        className={hasStory ? 'cursor-pointer hover:opacity-80' : ''}
                      >
                        {gem.title}
                      </span>
                    )}
                  </h3>

                  {gem.author && (
                    <p className="font-sans text-xs uppercase tracking-wider text-[#666666]">
                      By <span className="text-[#111111] font-medium">{gem.author}</span>
                    </p>
                  )}

                  {gem.description && (
                    <p className="font-serif text-base text-[#444444] leading-relaxed pt-1">
                      {gem.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-4 text-xs font-sans">
                    {hasStory && (
                      <button
                        onClick={() => onSelectStory(gem)}
                        className="font-sans font-medium text-[#111111] hover:underline underline-offset-4 flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Full Story →</span>
                      </button>
                    )}

                    {gem.url && (
                      <a
                        href={gem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#666666] hover:text-[#111111] hover:underline underline-offset-4 flex items-center gap-1"
                      >
                        <span>Open original source ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

    </section>
  );
}
