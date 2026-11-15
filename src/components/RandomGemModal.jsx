import React from 'react';
import { X, Shuffle, ExternalLink, BookOpen, Compass, Star } from 'lucide-react';

export default function RandomGemModal({ gem, onShuffle, onClose, onReadStory }) {
  if (!gem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#faf8f5] dark:bg-[#121316] border border-stone-300 dark:border-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Compass className="w-5 h-5" />
          </span>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Rabbit Hole Generator
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Dredged from the far reaches of the internet
            </p>
          </div>
        </div>

        <div className="my-6 p-6 rounded-xl bg-white dark:bg-[#191b20] border border-stone-200 dark:border-stone-800 shadow-inner space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              {gem.category}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
              {gem.type}
            </span>
            {gem.isStaffPick && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-500" />
                Staff Pick
              </span>
            )}
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
            {gem.title}
          </h3>

          {gem.author && (
            <p className="text-xs text-stone-500 dark:text-stone-400">
              by <span className="font-medium text-stone-700 dark:text-stone-200">{gem.author}</span>
            </p>
          )}

          {gem.description && (
            <p className="text-sm font-serif text-stone-600 dark:text-stone-300 leading-relaxed italic border-l-2 border-amber-500/50 pl-3">
              "{gem.description}"
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={onShuffle}
            className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium flex items-center gap-2 transition-colors"
          >
            <Shuffle className="w-4 h-4 text-amber-500" />
            Spin Again
          </button>

          <div className="flex items-center gap-2">
            {gem.paragraphs && gem.paragraphs.length > 0 && (
              <button
                onClick={() => {
                  onClose();
                  onReadStory(gem);
                }}
                className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <BookOpen className="w-4 h-4" />
                Read Story
              </button>
            )}

            {gem.url && (
              <a
                href={gem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Visit Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
