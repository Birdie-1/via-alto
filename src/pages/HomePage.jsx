import React from 'react';
import Hero from '../components/home/Hero';
import CategoryCards from '../components/home/CategoryCards';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandStory from '../components/home/BrandStory';
import FinalCTA from '../components/home/FinalCTA';

export default function HomePage({
  onNavigate,
  onAddToCart,
  onSelectProduct
}) {
  const handleExploreClick = () => {
    onNavigate('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDiscoverClick = () => {
    const philosophySection = document.getElementById('brand-story');
    if (philosophySection) {
      philosophySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryId) => {
    onNavigate('shop', { category: categoryId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStoryClick = () => {
    const philosophySection = document.getElementById('brand-story');
    if (philosophySection) {
      philosophySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <Hero
        onExploreClick={handleExploreClick}
        onDiscoverClick={handleDiscoverClick}
      />

      {/* 2. Featured Categories (EXPLORE THE TRAIL) */}
      <CategoryCards onSelectCategory={handleSelectCategory} />

      {/* 3. Featured Products (ESSENTIAL GEAR) */}
      <FeaturedProducts
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        onNavigateToShop={handleExploreClick}
      />

      {/* 4. Brand Story / Philosophy Section */}
      <BrandStory onStoryClick={handleStoryClick} />

      {/* 5. Final CTA Section (READY TO GO BEYOND?) */}
      <FinalCTA onExploreGearClick={handleExploreClick} />
    </div>
  );
}
