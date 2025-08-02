import React from 'react';

export default function CardImg({ img, title }) {
  return (
    <section className="w-full rounded-xl overflow-hidden">
      <div className="w-full h-full rounded-xl relative overflow-hidden group shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url(${img})` }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent">
          <h5 className="text-lg md:text-2xl font-bold tracking-tight text-white z-10">
            {title}
          </h5>
        </div>
      </div>
    </section>
  );
}
