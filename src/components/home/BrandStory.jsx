import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BrandStory({ onStoryClick }) {
  return (
    <section id="brand-story" className="py-20 sm:py-28 bg-[#F7F5F0] border-t border-stone-light/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left: Large Mountain / Explorer Photograph */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden border border-stone-light/40 group">
            <img
              src="/images/philosophy.jpg"
              alt="Hiker standing on alpine summit overlooking sea of clouds"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            
            {/* Coordinate Overlay */}
            <div className="absolute bottom-6 left-6 text-white/80 text-[10px] uppercase tracking-brand font-mono">
              DOLOMITES, NORTHERN ITALY • 46.4102° N, 11.8441° E
            </div>
          </div>

          {/* Right: Editorial Brand Philosophy Content */}
          <div className="lg:col-span-5 bg-beige/50 border border-stone-light/40 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Category / Section Tag */}
              <div>
                <span className="text-xs uppercase tracking-brand-wide font-bold text-forest">
                  OUR PHILOSOPHY
                </span>
                <div className="w-8 h-[2px] bg-forest mt-2" />
              </div>

              {/* Serif Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal leading-[1.15]">
                THE JOURNEY <br />
                IS THE DESTINATION.
              </h2>

              {/* Philosophy Body */}
              <p className="text-sm sm:text-base text-charcoal-light font-sans font-light leading-relaxed">
                VIA ALTO was created for those who choose the longer path. From the first step to the highest summit, every piece of gear is designed to help you move further, explore deeper, and go beyond.
              </p>

              <p className="text-xs sm:text-sm text-stone font-sans leading-relaxed">
                Rooted in European alpine tradition, we believe equipment should be an extension of your resolve: lightweight, indestructible, and quietly beautiful.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button
                onClick={onStoryClick}
                className="inline-flex items-center gap-3 bg-forest text-offwhite px-6 py-3 text-xs uppercase tracking-brand font-semibold hover:bg-forest-light transition-all cursor-pointer group shadow-xs"
              >
                <span>OUR STORY</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
