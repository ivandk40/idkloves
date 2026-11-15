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
    <section className="space-y-6 animate-in fade-in duration-300">
      
      {/* Editorial Header (Compact) */}
      <div className="border-b border-[#111111] pb-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#888888]">
              Section II
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#111111] tracking-tight">
              Sherpa’s Miscellany
            </h2>
          </div>
          <p className="font-serif text-xs text-[#666666] italic">
            Curated internet archive • {filteredGems.length} pieces
          </p>
        </div>
      </div>

      {/* Category Navigation (Dense) */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1.5 scrollbar-none border-b border-[#e5e5e5] text-[11px] font-sans uppercase tracking-wider">
        {categories.map((cat) => {
          const isStaff = cat === '⭐️ Staff Picks';
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap pb-1.5 border-b-2 transition-all flex items-center gap-1 ${
                selectedCategory === cat
                  ? 'border-[#111111] text-[#111111] font-semibold'
                  : 'border-transparent text-[#777777] hover:text-[#111111]'
              }`}
            >
              {isStaff && <Star className="w-2.5 h-2.5 fill-[#111111] text-[#111111]" />}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Dense List of Curated Gems */}
      {filteredGems.length === 0 ? (
        <div className="text-center py-12 px-4 border border-dashed border-[#dddddd] rounded">
          <p className="font-serif italic text-sm text-[#666666]">No amusements found in this category.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#eeeeee]">
          {filteredGems.map((gem, idx) => {
            const hasStory = gem.paragraphs && gem.paragraphs.length > 0;

            return (
              <article
                key={gem.id}
                className="py-3 sm:py-3.5 group hover:bg-[#fafafa] px-2 -mx-2 rounded transition-colors"
              >
                {/* Row 1: Title, Author, and Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                    <span className="font-sans text-[10px] text-[#999999] font-mono select-none w-5 flex-shrink-0">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>

                    <h3 className="font-display text-base sm:text-lg text-[#111111] font-normal tracking-tight group-hover:underline underline-offset-2">
                      {gem.url ? (
                        <a 
                          href={gem.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:opacity-80"
                        >
                          {gem.title}
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
                      <span className="font-sans text-[11px] uppercase tracking-wider text-[#777777]">
                        — {gem.author}
                      </span>
                    )}
                  </div>

                  {/* Right Badges & Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-auto text-[10px] font-sans">
                    {gem.isStaffPick && (
                      <span className="text-[#111111] font-semibold flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-[#111111]" /> Pick
                      </span>
                    )}

                    <span className="text-[#888888] uppercase tracking-wider">
                      {gem.category}
                    </span>

                    {hasStory ? (
                      <button
                        onClick={() => onSelectStory(gem)}
                        className="ml-1 text-[#111111] font-medium hover:underline flex items-center gap-0.5 bg-[#f0f0f0] hover:bg-[#e4e4e4] px-1.5 py-0.5 rounded transition-colors"
                      >
                        <BookOpen className="w-2.5 h-2.5" />
                        <span>Story</span>
                      </button>
                    ) : gem.url ? (
                      <a
                        href={gem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-[#555555] hover:text-[#111111] flex items-center gap-0.5 px-1.5 py-0.5 rounded hover:bg-[#f0f0f0] transition-colors"
                        title="Open external source"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Row 2: Description (Compact) */}
                {gem.description && (
                  <p className="font-serif text-xs sm:text-[13px] text-[#555555] leading-snug line-clamp-2 mt-1 sm:pl-7">
                    {gem.description}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}

    </section>
  );
}
