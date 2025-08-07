import React from 'react';

export default function CardImg({ img, title }) {
  return (
    <section className="w-full rounded-xl shadow-lg overflow-hidden">
  <div className="relative w-full h-full group rounded-xl">
    <img
      src={img || '/fallback.jpg'}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
    />
    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black via-transparent to-transparent">
      <h5 className="text-lg md:text-2xl font-bold tracking-tight text-white">
        {title}
      </h5>
    </div>
  </div>
</section>

  );
}
