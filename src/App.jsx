import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ThingsILoveSection from './components/ThingsILoveSection';
import AddThingModal from './components/AddThingModal';
import Footer from './components/Footer';

import defaultThings from './data/thingsILove.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [things, setThings] = useState(() => {
    try {
      const saved = localStorage.getItem('idkloves_saved_things');
      return saved ? JSON.parse(saved) : defaultThings;
    } catch {
      return defaultThings;
    }
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('idkloves_saved_things', JSON.stringify(things));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [things]);

  const handleAddThing = (newThing) => {
    setThings((prev) => [newThing, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        count={things.length}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        <ThingsILoveSection
          things={things}
          searchQuery={searchQuery}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />
      </main>

      <Footer />

      {isAddModalOpen && (
        <AddThingModal
          onAdd={handleAddThing}
          onClose={() => setIsAddModalOpen(false)}
          allThings={things}
        />
      )}
    </div>
  );
}
