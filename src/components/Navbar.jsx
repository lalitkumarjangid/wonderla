"use client";
import { useState } from "react";
import {
  ChevronDown,
  MapPin,
  Building2,
  Gift,
  FerrisWheel,
  Utensils,
  Calendar,
  User,
  Menu,
  Zap,
} from "lucide-react";
import { navbarData } from "../data/navbarData";
import DropdownMenu from "./DropdownMenu";
import SidePanel from "./SidePanel";

const iconMap = {
  Gift,
  FerrisWheel,
  Utensils,
  Calendar,
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-slate-800 pt-4 px-4">
      <nav className="bg-white shadow-lg relative z-50 rounded-2xl max-w-7xl mx-auto">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <img
                src="/logo.webp"
                alt="Wonderla Parks and Resorts"
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* PARK Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-neutral-500 hover:text-neutral-900 font-bold text-sm uppercase tracking-wide transition-colors py-2">
                <MapPin className="h-4 w-4 mr-1.5 text-neutral-500" />
                PARK
                <ChevronDown className="h-3.5 w-3.5 ml-1 text-neutral-400 group-hover:rotate-180 transition-transform" />
              </button>
              <DropdownMenu items={navbarData.parkLocations} />
            </div>

            {/* RESORTS Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-neutral-500 hover:text-neutral-900 font-bold text-sm uppercase tracking-wide transition-colors py-2">
                <Building2 className="h-4 w-4 mr-1.5 text-neutral-500" />
                RESORTS
                <ChevronDown className="h-3.5 w-3.5 ml-1 text-neutral-400 group-hover:rotate-180 transition-transform" />
              </button>
              <DropdownMenu items={navbarData.resorts} />
            </div>

            {/* Dynamic Navigation Items */}
            {navbarData.navigationItems.map((item) => {
              const IconComponent = iconMap[item.icon];
              return (
                <div key={item.id} className="flex items-center text-neutral-500 hover:text-neutral-900 font-bold text-sm uppercase tracking-wide cursor-pointer transition-colors py-2">
                  <IconComponent className="h-4 w-4 mr-1.5 text-neutral-500" />
                  {item.label}
                </div>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* LOGIN */}
            <button className="flex items-center text-neutral-500 hover:text-blue-800 font-bold text-sm uppercase tracking-wide transition-colors py-2">
              <User
                className="h-4 w-4 mr-1.5 text-blue-700"
                fill="currentColor"
              />
              LOGIN
            </button>

            {/* BOOK TICKETS Button */}
            <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-700 font-bold px-4 py-2 rounded-lg transition-all duration-200 flex items-center text-sm uppercase tracking-wide shadow-sm hover:shadow-md">
              BOOK TICKETS
              <Zap className="ml-1.5 h-4 w-4" fill="currentColor" />
            </button>

            {/* Hamburger Menu Icon */}
            <div className="flex items-center ml-2">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col justify-center space-y-1 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-6 h-0.5 bg-blue-700 rounded-full transition-all duration-300"></div>
                <div className="w-6 h-0.5 bg-blue-700 rounded-full transition-all duration-300"></div>
                <div className="w-6 h-0.5 bg-blue-700 rounded-full transition-all duration-300"></div>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-600 hover:text-neutral-900 p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 py-4 bg-white">
            <div className="flex flex-col space-y-4">
              <button className="flex items-center text-neutral-500 hover:text-neutral-900 font-bold text-sm text-left px-2 py-1 uppercase tracking-wide">
                <MapPin className="h-4 w-4 mr-2 text-neutral-500" />
                PARK
                <ChevronDown className="h-3 w-3 ml-1 text-neutral-400" />
              </button>
              <button className="flex items-center text-neutral-500 hover:text-neutral-900 font-bold text-sm text-left px-2 py-1 uppercase tracking-wide">
                <Building2 className="h-4 w-4 mr-2 text-neutral-500" />
                RESORTS
                <ChevronDown className="h-3 w-3 ml-1 text-neutral-400" />
              </button>
              
              {/* Dynamic Mobile Menu Items */}
              {navbarData.navigationItems.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <button key={item.id} className="flex items-center text-neutral-500 hover:text-neutral-900 font-bold text-sm text-left px-2 py-1 uppercase tracking-wide">
                    <IconComponent className="h-4 w-4 mr-2 text-neutral-500" />
                    {item.label}
                  </button>
                );
              })}

              <div className="border-t border-neutral-200 pt-4 flex flex-col space-y-3 px-2">
                <button className="flex items-center text-blue-600 hover:text-blue-800 font-bold text-sm text-left uppercase tracking-wide">
                  <User className="h-4 w-4 mr-2" />
                  LOGIN
                </button>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-bold px-4 py-2 rounded-full transition-colors duration-200 w-fit flex items-center text-sm uppercase tracking-wide">
                  BOOK TICKETS
                  <Zap className="ml-1.5 h-4 w-4" fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </nav>

      {/* Side Panel Component */}
      <SidePanel 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </div>
  );
}
