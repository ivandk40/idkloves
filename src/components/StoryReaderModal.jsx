import React, { useEffect } from 'react';
import { X, ExternalLink, Bookmark, Clock, BookOpen, Share2 } from 'lucide-react';

export default function StoryReaderModal({ story, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!story) return null;

  const copyStory = () => {
    const fullText = `${story.title}\n${story.author ? `By ${story.author}\n` : ''}\n${story.paragraphs.join('\n\n')}`;
    navigator.clipboard.writeText(fullText);
    alert('Copied story text to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#faf8f5] dark:bg-[#121316] border border-stone-300 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-[#f4f1eb] dark:bg-[#18191d]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
              {story.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
              <Clock className="w-3.5 h-3.5" />
              {story.readingTime || '5 min read'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyStory}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
              title="Copy text"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
              title="Close (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Longform Reader */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 space-y-6">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
              {story.title}
            </h1>
            {story.author && (
              <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 font-medium">
                Archived from: <span className="text-stone-800 dark:text-stone-200">{story.author}</span>
              </p>
            )}
            {story.url && (
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-mono text-rose-600 dark:text-rose-400 hover:underline"
              >
                <span>Original source link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="prose dark:prose-invert prose-stone max-w-none font-serif text-base sm:text-lg leading-relaxed text-stone-800 dark:text-stone-200 space-y-4">
            {story.paragraphs && story.paragraphs.length > 0 ? (
              story.paragraphs.map((p, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {p}
                </p>
              ))
            ) : (
              <p className="italic text-stone-500">{story.description}</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-stone-200 dark:border-stone-800 bg-[#f4f1eb] dark:bg-[#18191d] flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>Sherpa’s Miscellany of Compendious Amusements</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-sans font-medium hover:opacity-90"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}
