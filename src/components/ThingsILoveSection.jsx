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
            {group.items.map((item, idx) => {
              const isLink = typeof item === 'object' && item !== null && item.url;
              const title = isLink ? item.title : item;
              const url = isLink ? item.url : null;

              return (
                <li
                  key={idx}
                  className="font-serif italic text-sm sm:text-[14.5px] text-[#3c3c3c] leading-relaxed"
                >
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black underline underline-offset-4 decoration-[#dddddd] hover:decoration-black transition-colors inline-flex items-center gap-1"
                    >
                      <span>{title}</span>
                      <span className="font-sans not-italic text-[10px] text-[#888888]">↗</span>
                    </a>
                  ) : (
                    title
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
