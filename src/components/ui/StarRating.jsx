import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating = 5, reviewsCount, size = 'sm', showCount = true }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 12;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-forest">
        {[...Array(5)].map((_, i) => {
          const isFilled = i < fullStars || (i === fullStars && hasHalf);
          return (
            <Star
              key={i}
              size={iconSize}
              className={`${
                isFilled
                  ? 'fill-forest text-forest'
                  : 'fill-transparent text-stone-light'
              }`}
            />
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs text-stone font-medium">
          {rating.toFixed(1)} {reviewsCount ? `(${reviewsCount})` : ''}
        </span>
      )}
    </div>
  );
}
