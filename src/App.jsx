import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ThingsILoveSection from './components/ThingsILoveSection';
import Footer from './components/Footer';

import defaultThings from './data/thingsILove.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const things = defaultThings;

  // Clear previous localStorage state to guarantee the page is static
  useEffect(() => {
    try {
      localStorage.removeItem('idkloves_saved_things');
    } catch {
      // Ignore in private/restricted browsing contexts
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        count={things.length}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        <ThingsILoveSection
          things={things}
          searchQuery={searchQuery}
        />
      </main>

      <Footer />
    </div>
  );
}
