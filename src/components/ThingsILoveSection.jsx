import React from 'react';

export default function ThingsILoveSection({ categories = [] }) {
  return (
    <div className="max-w-md mx-auto space-y-7 py-4">
      {categories.map((group) => (
        <section key={group.category} className="space-y-1.5">
          <h2 className="text-[11px] font-sans font-medium uppercase tracking-widest text-[#888888] border-b border-[#eeeeee] pb-1">
            {group.category}
          </h2>
          <ul className="space-y-1">
            {group.items.map((item, idx) => (
              <li
                key={idx}
                className="font-serif italic text-base sm:text-[17px] text-[#111111] leading-snug"
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
