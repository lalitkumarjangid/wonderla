'use client';

import { FerrisWheel, Waves, Baby } from 'lucide-react';

export default function CategorySidebar({ categories, activeCategory, onCategoryChange }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ferris-wheel':
        return <FerrisWheel className="h-8 w-8" />;
      case 'waves':
        return <Waves className="h-8 w-8" />;
      case 'baby':
        return <Baby className="h-8 w-8" />;
      default:
        return <FerrisWheel className="h-8 w-8" />;
    }
  };

  return (
    <div className="flex flex-col space-y-8 py-8">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex flex-col items-center p-6 rounded-full cursor-pointer transition-all duration-300 ${
            activeCategory === category.id
              ? 'bg-yellow-400 text-gray-900 shadow-lg transform scale-105'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {/* Icon Circle */}
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/20 mb-4">
            {getIcon(category.icon)}
          </div>
          
          {/* Category Name */}
          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
          
          {/* Ride Count Badge */}
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
            activeCategory === category.id
              ? 'bg-gray-900 text-yellow-400'
              : 'bg-blue-600 text-white'
          }`}>
            {category.count} Rides
          </div>
        </div>
      ))}
    </div>
  );
}
