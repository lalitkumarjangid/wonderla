'use client';

import { useState, useEffect } from 'react';
import CategorySidebar from './CategorySidebar';
import RideCard from './RideCard';
import CarouselControls from './CarouselControls';
import ridesData from '../data/ridesData.json';

export default function RidesSection() {
  const [activeCategory, setActiveCategory] = useState('land');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredRides, setFilteredRides] = useState([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const ridesPerSlide = 4;
  const autoScrollInterval = 2000; // 1 second
  
  // Filter rides based on active category
  useEffect(() => {
    const filtered = ridesData.rides.filter(ride => ride.category === activeCategory);
    setFilteredRides(filtered);
    setCurrentSlide(0); // Reset slide when category changes
  }, [activeCategory]);

  // Auto-scroll functionality (Bonus requirement)
  useEffect(() => {
    if (!isAutoPlaying || filteredRides.length <= 4) return;

    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => {
        const maxSlides = filteredRides.length - 4; // Can scroll until last 4 cards are visible
        return prevSlide >= maxSlides ? 0 : prevSlide + 1;
      });
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredRides.length, autoScrollInterval]);

  // Carousel navigation
  const maxSlides = Math.max(0, filteredRides.length - 4); // Can scroll until last 4 cards are visible
  const canGoPrevious = currentSlide > 0;
  const canGoNext = currentSlide < maxSlides;

  const handlePrevious = () => {
    if (canGoPrevious) {
      setCurrentSlide(currentSlide - 1);
      setIsAutoPlaying(false); // Pause auto-scroll on manual interaction
      // Resume auto-scroll after 3 seconds
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentSlide(currentSlide + 1);
      setIsAutoPlaying(false); // Pause auto-scroll on manual interaction
      // Resume auto-scroll after 3 seconds
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  };

  const handleSlideClick = (slideIndex) => {
    setCurrentSlide(slideIndex);
    setIsAutoPlaying(false); // Pause auto-scroll on manual interaction
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Get rides for current slide - show 4 cards at a time
  const startIndex = currentSlide;
  const currentRides = filteredRides.slice(startIndex, startIndex + 4); // Show 4 cards at a time

  // Dynamic gradient based on active category
  const getGradientConfig = () => {
    switch(activeCategory) {
      case 'land':
        return {
          direction: { x1: '0%', y1: '0%', x2: '100%', y2: '0%' }, // horizontal gradient for top
          colors: [
            { offset: '0%', color: '#fff' },   // yellow start
            { offset: '50%', color: '#fde047' },  // white middle  
            { offset: '100%', color: '#fde047' }  // yellow end
          ]
        };
      case 'water':
        return {
          direction: { x1: '100%', y1: '00%', x2: '0%', y2: '0%' }, // diagonal gradient for right
          colors: [
            { offset: '0%', color: '#fff' },   // yellow start
            { offset: '50%', color: '#fde047' },  // white middle
            { offset: '100%', color: '#fff' }  // yellow end
          ]
        };
      case 'kids':
        return {
          direction: { x1: '100%', y1: '0%', x2: '0%', y2: '00%' }, // vertical gradient for bottom
          colors: [
            { offset: '0%', color: '#fff' },   // white start
            { offset: '50%', color: '#fde047' },  // yellow middle
            { offset: '100%', color: '#fde047' }  // white end
          ]
        };
      default:
        return {
          direction: { x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
          colors: [
            { offset: '0%', color: '#fde047' },
            { offset: '50%', color: '#ffffff' },
            { offset: '100%', color: '#fde047' }
          ]
        };
    }
  };

  const gradientConfig = getGradientConfig();

  return (

    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-slate-800 relative overflow-hidden">
      {/* Circular Progress Bar */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[36rem] h-[36rem] z-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background Circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
          />
          
          {/* Progress Circle - 100% complete */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="24"
            strokeLinecap="round"
            strokeDasharray="440"
            strokeDashoffset="0"
            className="transition-all duration-1000"
          />
          
          <defs>
            <linearGradient 
              id="progressGradient" 
              x1={gradientConfig.direction.x1}
              y1={gradientConfig.direction.y1}
              x2={gradientConfig.direction.x2}
              y2={gradientConfig.direction.y2}
            >
              {gradientConfig.colors.map((stop, index) => (
                <stop 
                  key={index}
                  offset={stop.offset} 
                  style={{stopColor: stop.color, stopOpacity: 1}} 
                />
              ))}
            </linearGradient>
          </defs>
        </svg>
        
        {/* Land Category - Large circular container on the circle */}
        <div
          onClick={() => setActiveCategory('land')}
          className="absolute top-30 right-14 cursor-pointer transition-all duration-300  z-50"
          style={{ transform: 'translate(50%, -50%)' }}
        >
          <div className="flex items-center space-x-4">
            {/* Large circular icon container */}
            <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              activeCategory === 'land' 
                ? 'bg-white border-[12px] border-yellow-300' 
                : 'bg-transparent'
            }`}>
              <svg viewBox="0 0 24 24" className={`w-16 h-16 transition-colors duration-300 ${
                activeCategory === 'land' ? 'text-blue-500' : 'text-blue-500'
              }`} fill="currentColor">
                {/* Ferris Wheel Icon */}
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <circle cx="12" cy="12" r="1.5"/>
                <circle cx="12" cy="6" r="1"/>
                <circle cx="18" cy="12" r="1"/>
                <circle cx="12" cy="18" r="1"/>
                <circle cx="6" cy="12" r="1"/>
                <circle cx="15.36" cy="8.64" r="1"/>
                <circle cx="15.36" cy="15.36" r="1"/>
                <circle cx="8.64" cy="15.36" r="1"/>
                <circle cx="8.64" cy="8.64" r="1"/>
              </svg>
            </div>
            {/* Category label and count */}
            <div className="flex flex-col">
              <h3 className="text-white text-xl mb-0">Land</h3>
              <span className="bg-indigo-400 text-white px-1  rounded-full text-sm ">
                {ridesData.rides.filter(ride => ride.category === 'land').length} Rides
              </span>
            </div>
          </div>
        </div>        {/* Water Category - Large circular container on the right side */}
        <div
          onClick={() => setActiveCategory('water')}
          className="absolute top-1/2 right-0 cursor-pointer transition-all duration-300  z-50"
          style={{ transform: 'translate(50%, -50%)' }}
        >
          <div className="flex items-center space-x-4">
            {/* Large circular icon container */}
            <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              activeCategory === 'water' 
                ? 'bg-white border-[12px] border-yellow-300' 
                : 'bg-transparent'
            }`}>
              <svg viewBox="0 0 24 24" className={`w-16 h-16 transition-colors duration-300 ${
                activeCategory === 'water' ? 'text-blue-500' : 'text-blue-500'
              }`} fill="currentColor">
                {/* Water Slides Icon */}
                <path d="M2 17h20v2H2v-2zM3.15 12.95L4 14l.85-1.05.85 1.05L6.55 13 5.7 12.15 6.55 11.3 5.7 10.45 5.7 10.45 6.55 9.6 5.7 8.75 4.85 9.6 4 8.75 3.15 9.6 4 10.45 3.15 11.3 4 12.15 3.15 12.95z"/>
                <path d="M14 4v8l-2 2-2-2V4h4z"/>
                <rect x="10" y="2" width="4" height="2"/>
                <path d="M8 14c0 1.1.9 2 2 2s2-.9 2-2"/>
                <path d="M14 14c0 1.1.9 2 2 2s2-.9 2-2"/>
                <path d="M18 14c0 1.1.9 2 2 2s2-.9 2-2"/>
              </svg>
            </div>
            {/* Category label and count */}
            <div className="flex flex-col">
              <h3 className="text-white text-xl mb-0">Water</h3>
              <span className="bg-indigo-400 text-white px-1  rounded-full text-sm ">
                {ridesData.rides.filter(ride => ride.category === 'land').length} Rides
              </span>
            </div>
          </div>
        </div>

        {/* Kids Category - Large circular container on the bottom */}
        <div
          onClick={() => setActiveCategory('kids')}
          className="absolute  top-1/2 bottom-14 right-10 cursor-pointer transition-all duration-300  z-50"
          style={{ transform: 'translate(30%, 50%)' }}
        >
          <div className="flex items-center space-x-4">
            {/* Large circular icon container */}
            <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              activeCategory === 'kids' 
                ? 'bg-white border-[12px] border-yellow-300' 
                : 'bg-transparent'
            }`}>
              <svg viewBox="0 0 24 24" className={`w-16 h-16 transition-colors duration-300 ${
                activeCategory === 'kids' ? 'text-blue-500' : 'text-blue-500'
              }`} fill="currentColor">
                {/* Carousel/Merry-go-round Icon */}
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="12" cy="12" r="2"/>
                <path d="M12 2L14 8L12 12L10 8Z"/>
                <path d="M22 12L16 14L12 12L16 10Z"/>
                <path d="M12 22L10 16L12 12L14 16Z"/>
                <path d="M2 12L8 10L12 12L8 14Z"/>
                <circle cx="12" cy="6" r="1"/>
                <circle cx="18" cy="12" r="1"/>
                <circle cx="12" cy="18" r="1"/>
                <circle cx="6" cy="12" r="1"/>
              </svg>
            </div>
            {/* Category label and count */}
            <div className="flex flex-col">
              <h3 className="text-white text-xl mb-0">Kids</h3>
             <span className="bg-indigo-400 text-white px-1  rounded-full text-sm ">
                {ridesData.rides.filter(ride => ride.category === 'land').length} Rides
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen">
        {/* Header and Carousel Controls in same row */}
        <div className="flex items-center pt-12 mb-8 px-8">
          {/* Left spacer */}
          <div className="flex-1"></div>
          
          {/* Centered title */}
          <h1 className="text-5xl font-bold text-white text-center">
            OUR ICONIC RIDES
          </h1>
          
          {/* Right side with carousel controls */}
          <div className="flex-1 flex justify-end">
            <CarouselControls
              onPrevious={handlePrevious}
              onNext={handleNext}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
            />
          </div>
        </div>

        {/* Main Flex Row Layout - Circular Navigation and Ride Cards side by side */}
        <div className="flex flex-row items-center px-8 gap-16">
          {/* Left Side - Space for Circular Navigation */}
          <div className="flex-shrink-0 w-[400px]">
            {/* Circular navigation is absolutely positioned, this reserves space */}
          </div>

          {/* Right Side - Ride Cards */}
          <div className="flex-1">
            {/* Rides Grid with Smooth Transitions */}
            <div className="mb-8 overflow-hidden">
              <div 
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (280 + 24)}px)` // 280px card width + 24px gap
                }}
              >
                {currentRides.map((ride, index) => (
                  <div 
                    key={ride.id} 
                    className="transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <RideCard ride={ride} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Explore All Rides Button - Centered */}
        <div className="flex justify-center mt-8">
          <button className="bg-yellow-300 hover:bg-yellow-300 text-slate-800 font-bold py-4 px-12 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Explore All Rides!
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
