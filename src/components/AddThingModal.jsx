import React, { useState } from 'react';
import { X, Plus, Heart, Download } from 'lucide-react';

export default function AddThingModal({ onAdd, onClose, allThings }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Everyday Carry');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [whyLove, setWhyLove] = useState('');
  const [favoriteDetail, setFavoriteDetail] = useState('');
  const [rating, setRating] = useState('Essential');

  const categories = [
    'Rituals & Coffee',
    'Everyday Carry',
    'Books & Words',
    'Tech & Craft',
    'Objects & Wear',
    'Atmosphere & Nature',
    'Sounds & Audio',
    'Mindsets & Philosophy',
    'Food & Gastronomy'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newThing = {
      id: `til-${Date.now()}`,
      title: title.trim(),
      category,
      tag: tag.trim() || 'Favorite',
      description: description.trim(),
      whyLove: whyLove.trim(),
      favoriteDetail: favoriteDetail.trim(),
      rating
    };

    onAdd(newThing);
    onClose();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allThings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "thingsILove.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#faf8f5] dark:bg-[#121316] border border-stone-300 dark:border-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center justify-center">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Add to Things I Love
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Log an object, habit, song, book, or ritual that brings you joy.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
              Title / Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Chemex 6-cup pour over, Leica M6, 'Invisible Cities'"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                Badge / Tag
              </label>
              <input
                type="text"
                placeholder="e.g. Daily Ritual, Analog, Grail, Heirloom"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
              Description & Sensory Details
            </label>
            <textarea
              rows="3"
              placeholder="Describe it with texture, scent, acoustic details, or memory..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
              Why I Love It
            </label>
            <input
              type="text"
              placeholder="e.g. It turns chaotic mornings into an intentional, slow meditation."
              value={whyLove}
              onChange={(e) => setWhyLove(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                Favorite Nuance / Detail
              </label>
              <input
                type="text"
                placeholder="e.g. The brass patina after 6 months."
                value={favoriteDetail}
                onChange={(e) => setFavoriteDetail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div>
              <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                Rating / Tier
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="Essential">Essential</option>
                <option value="Daily Driver">Daily Driver</option>
                <option value="All-Time">All-Time</option>
                <option value="Grail">Grail</option>
                <option value="Heirloom">Heirloom</option>
                <option value="Soul Food">Soul Food</option>
                <option value="Timeless">Timeless</option>
                <option value="Guiding Light">Guiding Light</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-stone-200 dark:border-stone-800">
            <button
              type="button"
              onClick={handleExportJSON}
              className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1.5 transition-colors"
              title="Download entire Things I Love collection as JSON file"
            >
              <Download className="w-4 h-4" />
              Export JSON ({allThings.length} items)
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Save Thing
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
