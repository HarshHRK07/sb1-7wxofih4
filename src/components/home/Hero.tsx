import React from 'react';

export default function Hero() {
  return (
    <div className="relative bg-gray-900 h-[600px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80"
          alt="Art Gallery"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Discover Unique Digital Art Prints
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Explore our curated collection of premium digital artwork. From contemporary abstracts to classic illustrations, find the perfect piece for your space.
        </p>
        <div className="mt-10">
          <a
            href="/shop"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100"
          >
            Shop Collection
          </a>
        </div>
      </div>
    </div>
  );
}