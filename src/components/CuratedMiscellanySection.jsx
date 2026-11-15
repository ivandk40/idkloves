import React, { useState } from 'react';
import { 
  Compass, 
  ExternalLink, 
  Star, 
  BookOpen, 
  Clock, 
  Headphones, 
  Video, 
  FileText, 
  Flame, 
  MessageSquare,
  Sparkles,
  Share2,
  Bookmark
} from 'lucide-react';

export default function CuratedMiscellanySection({ 
  gems, 
  onSelectStory, 
  searchQuery,
  bookmarkedIds,
  onToggleBookmark
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const categories = [
    'All',
    '⭐️ Staff Picks',
    'Essays',
    'Articles',
    'The New Yorker',
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

  const types = ['All', 'Longform Story', 'Essay', 'Article', 'Podcast', 'Audio', 'Video', 'Manga / Comic', 'Reddit Legend'];

  const filteredGems = gems.filter((gem) => {
    // Category match
    let matchesCat = true;
    if (selectedCategory === '⭐️ Staff Picks') {
      matchesCat = gem.isStaffPick;
    } else if (selectedCategory !== 'All') {
      matchesCat = gem.category.toLowerCase() === selectedCategory.toLowerCase();
    }

    // Type match
    let matchesType = true;
    if (selectedType !== 'All') {
      matchesType = gem.type === selectedType;
    }

    // Search match
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

    return matchesCat && matchesType && matchesSearch;
  });

  const getMediaIcon = (type) => {
    switch (type) {
      case 'Podcast':
      case 'Audio':
        return <Headphones className="w-3.5 h-3.5 text-purple-500" />;
      case 'Video':
        return <Video className="w-3.5 h-3.5 text-rose-500" />;
      case 'Longform Story':
        return <BookOpen className="w-3.5 h-3.5 text-amber-500" />;
      case 'Reddit Legend':
      case 'Reddit':
        return <MessageSquare className="w-3.5 h-3.5 text-orange-500" />;
      case 'Manga / Comic':
        return <Flame className="w-3.5 h-3.5 text-pink-500" />;
      case 'Essay':
      default:
        return <FileText className="w-3.5 h-3.5 text-sky-500" />;
    }
  };

  const handleCopyLink = (gem) => {
    if (gem.url) {
      navigator.clipboard.writeText(gem.url);
      alert('Copied URL to clipboard!');
    } else {
      navigator.clipboard.writeText(`${gem.title} - from idkloves.com`);
      alert('Copied title to clipboard!');
    }
  };

  return (
    <section id="curated-miscellany" className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Intro */}
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-sky-500/10 via-amber-500/5 to-transparent border border-sky-200/60 dark:border-sky-950/60 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-900">
            <Compass className="w-3.5 h-3.5 text-sky-500" />
            Section 02 • Migrated from Notion
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
            Sherpa’s Miscellany of Compendious Amusements.
          </h2>
          <p className="font-serif text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            Dredged from the deepest corners of the internet. Gripping investigative journalism, aviation post-mortems, transfinite mathematics, eerie manga, and internet lore that will keep you awake past 3 AM.
          </p>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isStaff = cat === '⭐️ Staff Picks';
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20'
                    : isStaff
                    ? 'bg-amber-100/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-200/80'
                    : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 hover:bg-stone-300/60 dark:hover:bg-stone-700/60'
                }`}
              >
                {isStaff && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Format Filter */}
        <div className="flex items-center gap-2 overflow-x-auto text-[11px] font-mono scrollbar-none text-stone-500 dark:text-stone-400">
          <span className="whitespace-nowrap text-stone-400">Filter format:</span>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-md transition-colors ${
                selectedType === type
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold'
                  : 'hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Gems Grid */}
      {filteredGems.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white/50 dark:bg-stone-900/50 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800">
          <Compass className="w-10 h-10 mx-auto text-stone-400 mb-3" />
          <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">No matching amusements</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try clearing filters or search to reveal the rest of the 62 curated gems.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGems.map((gem) => {
            const hasStory = gem.paragraphs && gem.paragraphs.length > 0;
            const isBookmarked = bookmarkedIds && bookmarkedIds.includes(gem.id);

            return (
              <div
                key={gem.id}
                className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#141518] border transition-all hover:shadow-lg hover:shadow-stone-200/50 dark:hover:shadow-black/50 ${
                  gem.isStaffPick
                    ? 'border-amber-300/80 dark:border-amber-800/60 bg-gradient-to-b from-amber-500/[0.03] to-transparent'
                    : 'border-stone-200/80 dark:border-stone-800 hover:border-sky-300 dark:hover:border-sky-900/80'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center gap-1">
                        {getMediaIcon(gem.type)}
                        {gem.type}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                        • {gem.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {gem.isStaffPick && (
                        <span 
                          title="Curator's Staff Pick"
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 flex items-center gap-1"
                        >
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          Pick
                        </span>
                      )}
                      <button
                        onClick={() => onToggleBookmark && onToggleBookmark(gem.id)}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark this gem'}
                        className={`p-1 rounded-md transition-colors ${
                          isBookmarked 
                            ? 'text-rose-500 hover:text-rose-600' 
                            : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                    {gem.url ? (
                      <a 
                        href={gem.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        <span>{gem.title}</span>
                      </a>
                    ) : (
                      <span 
                        onClick={() => hasStory && onSelectStory(gem)}
                        className={hasStory ? 'cursor-pointer hover:underline' : ''}
                      >
                        {gem.title}
                      </span>
                    )}
                  </h3>

                  {/* Author / Publication */}
                  {gem.author && (
                    <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400 font-medium">
                      by <span className="text-stone-800 dark:text-stone-200">{gem.author}</span>
                    </p>
                  )}

                  {/* Description */}
                  {gem.description && (
                    <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                      {gem.description}
                    </p>
                  )}
                </div>

                {/* Card Actions & Footer */}
                <div className="mt-5 pt-3.5 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-stone-400 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{gem.readingTime || 'Quick read'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyLink(gem)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      title="Share link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    {hasStory && (
                      <button
                        onClick={() => onSelectStory(gem)}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-sm"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Story</span>
                      </button>
                    )}

                    {gem.url && (
                      <a
                        href={gem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/50 text-xs font-medium flex items-center gap-1.5 transition-colors border border-sky-200/50 dark:border-sky-900/50"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
