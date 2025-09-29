'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CarouselControls({ onPrevious, onNext, canGoPrevious, canGoNext }) {
  return (
    <div className="flex justify-end space-x-2 mb-6">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`p-3 rounded-full transition-all duration-200 ${
          canGoPrevious
            ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`p-3 rounded-full transition-all duration-200 ${
          canGoNext
            ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
