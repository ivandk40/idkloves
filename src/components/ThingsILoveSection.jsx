import React from 'react';

export default function ThingsILoveSection({ categories = [] }) {
  return (
    <div className="max-w-md mx-auto space-y-6 py-2">
      {categories.map((group) => (
        <section key={group.category} className="space-y-1">
          <h2 className="text-[10px] font-sans uppercase tracking-widest text-[#999999] border-b border-[#f0f0f0] pb-1">
            {group.category}
          </h2>
          <ul className="space-y-0.5">
            {group.items.map((item, idx) => (
              <li
                key={idx}
                className="font-serif italic text-sm sm:text-[14.5px] text-[#3c3c3c] leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
