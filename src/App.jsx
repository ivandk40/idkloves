import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ThingsILoveSection from './components/ThingsILoveSection';
import CuratedMiscellanySection from './components/CuratedMiscellanySection';
import StoryReaderModal from './components/StoryReaderModal';
import RandomGemModal from './components/RandomGemModal';
import AddThingModal from './components/AddThingModal';
import DeployGuideModal from './components/DeployGuideModal';
import Footer from './components/Footer';

import initialThings from './data/thingsILove.json';
import initialGems from './data/curatedGems.json';

export default function App() {
  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('idkloves_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('idkloves_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('idkloves_theme', 'light');
    }
  }, [darkMode]);

  // Tab state: 'all' | 'loves' | 'curated'
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Things I Love list with localStorage persistence
  const [things, setThings] = useState(() => {
    const saved = localStorage.getItem('idkloves_things');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialThings;
  });

  useEffect(() => {
    localStorage.setItem('idkloves_things', JSON.stringify(things));
  }, [things]);

  // Curated Gems
  const [gems] = useState(initialGems);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem('idkloves_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('idkloves_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Modals
  const [selectedStory, setSelectedStory] = useState(null);
  const [randomGem, setRandomGem] = useState(null);
  const [isAddThingOpen, setIsAddThingOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);

  // Random Gem trigger
  const handleOpenRandomGem = () => {
    const randomIndex = Math.floor(Math.random() * gems.length);
    setRandomGem(gems[randomIndex]);
  };

  const handleShuffleRandomGem = () => {
    const randomIndex = Math.floor(Math.random() * gems.length);
    setRandomGem(gems[randomIndex]);
  };

  // Add new thing
  const handleAddThing = (newThing) => {
    setThings((prev) => [newThing, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-[#0c0d0e] text-[#1c1917] dark:text-[#f3f4f6]">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenRandomGem={handleOpenRandomGem}
        onOpenAddThing={() => setIsAddThingOpen(true)}
        counts={{
          loves: things.length,
          curated: gems.length,
          total: things.length + gems.length
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24 w-full">
        {/* Render based on active tab */}
        {activeTab === 'all' && (
          <>
            <ThingsILoveSection
              things={things}
              onOpenAddThing={() => setIsAddThingOpen(true)}
              searchQuery={searchQuery}
            />
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
              <span className="flex-shrink mx-4 text-xs font-mono uppercase tracking-widest text-stone-400">
                • • •
              </span>
              <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
            </div>
            <CuratedMiscellanySection
              gems={gems}
              onSelectStory={(story) => setSelectedStory(story)}
              searchQuery={searchQuery}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
            />
          </>
        )}

        {activeTab === 'loves' && (
          <ThingsILoveSection
            things={things}
            onOpenAddThing={() => setIsAddThingOpen(true)}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'curated' && (
          <CuratedMiscellanySection
            gems={gems}
            onSelectStory={(story) => setSelectedStory(story)}
            searchQuery={searchQuery}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenDeployGuide={() => setIsDeployGuideOpen(true)} />

      {/* Modals */}
      {selectedStory && (
        <StoryReaderModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}

      {randomGem && (
        <RandomGemModal
          gem={randomGem}
          onShuffle={handleShuffleRandomGem}
          onClose={() => setRandomGem(null)}
          onReadStory={(story) => setSelectedStory(story)}
        />
      )}

      {isAddThingOpen && (
        <AddThingModal
          onAdd={handleAddThing}
          onClose={() => setIsAddThingOpen(false)}
          allThings={things}
        />
      )}

      {isDeployGuideOpen && (
        <DeployGuideModal
          onClose={() => setIsDeployGuideOpen(false)}
        />
      )}
    </div>
  );
}
