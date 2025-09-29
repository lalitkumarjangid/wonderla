"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";

export default function RideCard({ ride }) {
  return (
    <div className="relative h-[400px] w-[280px] flex-shrink-0 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group ">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={ride.image}
          alt={ride.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300" />

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-end">
        {/* Card Content - Bottom Section */}
        <div className="pl-6 pr-6 pb-6 pt-4 space-y-3">
          {/* Ride Name */}
          <h3 className="text-2xl font-bold text-white leading-tight text-left">
            {ride.name}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-200">
            <span className="text-sm font-medium text-left">
              {ride.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-sm leading-relaxed line-clamp-2 text-left">
            {ride.description}
          </p>

          {/* Ride Details Button */}
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-sm uppercase tracking-wide text-left">
            RIDE DETAILS
          </button>
        </div>
      </div>
    </div>
  );
}
