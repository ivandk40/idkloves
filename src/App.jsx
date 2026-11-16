import React from 'react';
import Header from './components/Header';
import ThingsILoveSection from './components/ThingsILoveSection';
import Footer from './components/Footer';

import categories from './data/thingsILove.json';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 w-full">
        <ThingsILoveSection categories={categories} />
      </main>

      <Footer />
    </div>
  );
}
