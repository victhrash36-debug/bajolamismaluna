
import React from 'react';

const CrescentMoon: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-32 h-32 ${className}`}>
      {/* Outer Circle (The glow/silver) */}
      <div className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.4)] bg-gradient-to-br from-gray-100 to-gray-400"></div>
      {/* Inner Mask (The shadow creates the crescent) */}
      <div className="absolute inset-0 bg-[#020617] rounded-full translate-x-1/3 scale-95 origin-center"></div>
    </div>
  );
};

export default CrescentMoon;
