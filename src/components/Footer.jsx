import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-[#e5e5e5] bg-white py-6 px-4 sm:px-6">
      <div className="max-w-md mx-auto flex items-center justify-between text-xs text-[#888888]">
        <p className="font-serif italic">
          Made by Ivan with ❤️
        </p>
        <a
          href="https://liminalreads.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans uppercase tracking-widest text-[10px] text-[#666666] hover:text-[#111111] transition-colors"
        >
          Liminal Reads ↗
        </a>
      </div>
    </footer>
  );
}
