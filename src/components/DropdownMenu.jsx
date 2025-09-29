'use client';

export default function DropdownMenu({ items, className = "" }) {
  return (
    <div className={`absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ${className}`}>
      <div className="p-4 space-y-3">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden mr-4 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                {item.name}
              </h3>
              {item.location && (
                <p className="text-sm text-gray-600">{item.location}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}