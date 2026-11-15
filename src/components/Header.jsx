import React from 'react';
import { Heart, Compass, Search, Moon, Sun, Shuffle, Plus, Sparkles, BookOpen } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  onOpenRandomGem,
  onOpenAddThing,
  counts
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#faf8f5]/90 dark:bg-[#0c0d0e]/90 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('all')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                  idkloves<span className="text-rose-500">.com</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                  curated cabinet
                </span>
              </div>
              <p className="hidden sm:block text-xs text-stone-500 dark:text-stone-400">
                things I adore & the far reaches of the internet
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden lg:flex items-center p-1 rounded-full bg-stone-200/70 dark:bg-stone-800/70 border border-stone-300/50 dark:border-stone-700/50 text-xs font-medium">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Everything
              <span className="text-[10px] opacity-60">({counts.total})</span>
            </button>
            <button
              onClick={() => setActiveTab('loves')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'loves'
                  ? 'bg-white dark:bg-stone-900 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              Things I Love
              <span className="text-[10px] opacity-60">({counts.loves})</span>
            </button>
            <button
              onClick={() => setActiveTab('curated')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'curated'
                  ? 'bg-white dark:bg-stone-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-sky-500" />
              Compendious Amusements
              <span className="text-[10px] opacity-60">({counts.curated})</span>
            </button>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search gems, essays, things..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 sm:w-56 md:w-64 pl-9 pr-3 py-1.5 rounded-full text-xs sm:text-sm bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Random / Shuffle Button */}
            <button
              onClick={onOpenRandomGem}
              title="Surprise me with a random internet rabbit hole"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:border-amber-400 dark:hover:border-amber-500 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Shuffle className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Rabbit Hole</span>
            </button>

            {/* Add Thing Button */}
            <button
              onClick={onOpenAddThing}
              title="Add a new item to Things I Love"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-sm transition-all flex items-center gap-1 text-xs font-medium"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Love</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle color theme"
              className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-stone-200 dark:border-stone-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-1 px-3 rounded-full flex items-center gap-1 ${
              activeTab === 'all'
                ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            All ({counts.total})
          </button>
          <button
            onClick={() => setActiveTab('loves')}
            className={`py-1 px-3 rounded-full flex items-center gap-1 ${
              activeTab === 'loves'
                ? 'bg-rose-500 text-white'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            <Heart className="w-3 h-3 fill-current" />
            Things I Love ({counts.loves})
          </button>
          <button
            onClick={() => setActiveTab('curated')}
            className={`py-1 px-3 rounded-full flex items-center gap-1 ${
              activeTab === 'curated'
                ? 'bg-sky-600 text-white'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            <Compass className="w-3 h-3" />
            Amusements ({counts.curated})
          </button>
        </div>
      </div>
    </header>
  );
}
