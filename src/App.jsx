import React, { useState } from 'react';
import Header from './components/Header';
import ThingsILoveSection from './components/ThingsILoveSection';
import CuratedMiscellanySection from './components/CuratedMiscellanySection';
import StoryReaderModal from './components/StoryReaderModal';
import RandomGemModal from './components/RandomGemModal';
import Footer from './components/Footer';

import thingsData from './data/thingsILove.json';
import initialGems from './data/curatedGems.json';

export default function App() {
  // Clear any legacy mock things from previous sessions
  if (typeof window !== 'undefined') {
    localStorage.removeItem('idkloves_things');
  }

  // Tab state: 'loves' | 'curated'
  const [activeTab, setActiveTab] = useState('loves');
  const [searchQuery, setSearchQuery] = useState('');

  // Things I Love list is blank by default
  const [things] = useState(thingsData);

  // Curated Gems (62 items from Notion)
  const [gems] = useState(initialGems);

  // Modals
  const [selectedStory, setSelectedStory] = useState(null);
  const [randomGem, setRandomGem] = useState(null);

  // Random Gem trigger
  const handleOpenRandomGem = () => {
    const randomIndex = Math.floor(Math.random() * gems.length);
    setRandomGem(gems[randomIndex]);
  };

  const handleShuffleRandomGem = () => {
    const randomIndex = Math.floor(Math.random() * gems.length);
    setRandomGem(gems[randomIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      {/* Header (No 'idk loves' title, no Add button) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenRandomGem={handleOpenRandomGem}
        counts={{
          loves: things.length,
          curated: gems.length
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
        {activeTab === 'loves' ? (
          <ThingsILoveSection
            things={things}
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
    </div>
  );
}
