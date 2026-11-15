import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ThingsILoveSection from './components/ThingsILoveSection';
import CuratedMiscellanySection from './components/CuratedMiscellanySection';
import StoryReaderModal from './components/StoryReaderModal';
import RandomGemModal from './components/RandomGemModal';
import AddThingModal from './components/AddThingModal';
import Footer from './components/Footer';

import initialThings from './data/thingsILove.json';
import initialGems from './data/curatedGems.json';

export default function App() {
  // Tab state: 'loves' | 'curated' (No 'all' / everything section)
  const [activeTab, setActiveTab] = useState('loves');
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

  // Modals
  const [selectedStory, setSelectedStory] = useState(null);
  const [randomGem, setRandomGem] = useState(null);
  const [isAddThingOpen, setIsAddThingOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      {/* Masthead Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenRandomGem={handleOpenRandomGem}
        onOpenAddThing={() => setIsAddThingOpen(true)}
        counts={{
          loves: things.length,
          curated: gems.length
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full">
        {activeTab === 'loves' ? (
          <ThingsILoveSection
            things={things}
            onOpenAddThing={() => setIsAddThingOpen(true)}
            searchQuery={searchQuery}
          />
        ) : (
          <CuratedMiscellanySection
            gems={gems}
            onSelectStory={(story) => setSelectedStory(story)}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Minimalist Footer */}
      <Footer onSelectSection={(tab) => setActiveTab(tab)} />

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
    </div>
  );
}
