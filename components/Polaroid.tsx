
import React from 'react';

interface PolaroidProps {
  src: string;
  caption: string;
  rotation?: string;
  delay?: string;
}

const Polaroid: React.FC<PolaroidProps> = ({ src, caption, rotation = "rotate-0", delay = "delay-0" }) => {
  return (
    <div className={`inline-block bg-white p-3 pb-8 shadow-2xl transition-all duration-700 hover:scale-105 hover:z-20 ${rotation} animate-reveal ${delay}`}>
      <div className="relative overflow-hidden w-40 h-40 md:w-52 md:h-52 bg-slate-200">
        <img 
          src={src} 
          alt={caption} 
          className="object-cover w-full h-full filter sepia-[0.2] brightness-95 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
      <div className="mt-4 text-slate-800 text-center">
        <p className="cursive text-xl md:text-2xl font-bold leading-none">{caption}</p>
      </div>
    </div>
  );
};

export default Polaroid;
