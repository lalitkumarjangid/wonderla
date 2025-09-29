'use client';

import { 
  X, 
  MapPin, 
  Building2, 
  Gift, 
  Clock, 
  Users, 
  Headphones, 
  MapIcon, 
  Info, 
  Link, 
  Phone,
  ChevronDown 
} from 'lucide-react';

const sideMenuItems = [
  {
    id: 'parks',
    title: 'Parks',
    description: 'Explore your favourite Wonderla Park',
    icon: MapPin,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
    hasDropdown: true,
    borderStyle: 'border-b border-gray-100',
  },
  {
    id: 'resorts',
    title: 'Resorts',
    description: 'Get a rejuvenating experience',
    icon: Building2,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100',
    hasDropdown: true,
    borderStyle: 'border-b border-gray-100',
  },
  {
    id: 'offers',
    title: 'Offers & Combos',
    description: 'Plan The Perfect Day',
    icon: Gift,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-100',
    hasDropdown: false,
    borderStyle: 'border-b border-gray-100',
  },
  {
    id: 'timings',
    title: 'Timings And Guidelines',
    description: 'Know The Timings',
    icon: Clock,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    hasDropdown: false,
    borderStyle: 'border-b border-gray-100',
  },
  {
    id: 'group-booking',
    title: 'Group Booking',
    description: 'Reach Out To Wonderla Team',
    icon: Users,
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    hasDropdown: false,
    borderStyle: 'bg-yellow-50 rounded-xl border border-yellow-200',
    hoverStyle: 'hover:bg-yellow-100',
  },
  {
    id: 'tour-operator',
    title: 'Tour Operator Portal',
    description: 'Reach Out To Wonderla Team',
    icon: Headphones,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
    hasDropdown: false,
    borderStyle: 'bg-blue-50 rounded-xl border border-blue-200',
    hoverStyle: 'hover:bg-blue-100',
  },
  {
    id: 'how-to-reach',
    title: 'How To Reach',
    description: 'Directions, Routes & Travel',
    icon: MapIcon,
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    hasDropdown: false,
    borderStyle: 'bg-yellow-50 rounded-xl border border-yellow-200',
    hoverStyle: 'hover:bg-yellow-100',
  },
  {
    id: 'about-us',
    title: 'About Us',
    description: 'Know All About Wonderla',
    icon: Info,
    iconColor: 'text-gray-600',
    bgColor: 'bg-gray-100',
    hasDropdown: false,
    borderStyle: 'border-b border-gray-100',
  },
  {
    id: 'quick-links',
    title: 'Quick Links',
    description: 'Explore all other relevant info',
    icon: Link,
    iconColor: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    hasDropdown: true,
    borderStyle: 'border-b border-gray-100',
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    description: '',
    icon: Phone,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    hasDropdown: false,
    borderStyle: '',
  },
];

export default function SidePanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Transparent Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      ></div>
      
      {/* Side Panel */}
      <div className="fixed top-0 right-0 h-full w-[30%] bg-white z-50 overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <img 
            src="/logo.webp" 
            alt="Wonderla Parks and Resorts" 
            className="h-8 w-auto"
          />
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-3">
          {sideMenuItems.map((item) => {
            const IconComponent = item.icon;
            const baseClasses = "flex items-center space-x-3 py-3 cursor-pointer rounded-lg px-2";
            const itemClasses = item.borderStyle.includes('bg-') 
              ? `${baseClasses} ${item.borderStyle} ${item.hoverStyle || ''}`
              : `${baseClasses} ${item.borderStyle} hover:bg-gray-50`;

            return (
              <div key={item.id} className={itemClasses}>
                <div className={`w-10 h-10 ${item.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base text-gray-900">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-gray-500 truncate">{item.description}</p>
                  )}
                </div>
                {item.hasDropdown && (
                  <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}