import React from 'react';
import Hero from '../components/home/Hero';
import CategoryCards from '../components/home/CategoryCards';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandStory from '../components/home/BrandStory';
import GearFinderBanner from '../components/home/GearFinderBanner';
import FinalCTA from '../components/home/FinalCTA';

export default function HomePage({
  onNavigate,
  onAddToCart,
  onSelectProduct,
  onOpenGearFinder,
  onOpenEmailPreview,
  lang = 'en'
}) {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <Hero
        onExploreClick={() => onNavigate('shop')}
        onDiscoverClick={() => {
          const story = document.getElementById('brand-story');
          if (story) story.scrollIntoView({ behavior: 'smooth' });
        }}
        lang={lang}
      />

      {/* 2. Featured Category Cards */}
      <CategoryCards
        onSelectCategory={(categoryId) => onNavigate('shop', { category: categoryId })}
        lang={lang}
      />

      {/* 3. Essential Gear (Featured Products) */}
      <FeaturedProducts
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        onNavigateToShop={() => onNavigate('shop')}
        lang={lang}
      />

      {/* 4. Brand Philosophy / Editorial Story */}
      <BrandStory
        onStoryClick={() => onNavigate('shop')}
        lang={lang}
      />

      {/* 5. Interactive Gear Finder Promotion Banner */}
      <GearFinderBanner
        onOpenGearFinder={onOpenGearFinder}
        lang={lang}
      />

      {/* 6. Final CTA */}
      <FinalCTA
        onExploreClick={() => onNavigate('shop')}
        onOpenEmailPreview={onOpenEmailPreview}
        lang={lang}
      />
    </div>
  );
}
