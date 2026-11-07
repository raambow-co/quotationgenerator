import React from 'react';

export default function Watermark() {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden" 
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Subtle circular watermark ring */}
        <div className="w-[430px] h-[430px] rounded-full border-[10px] border-slate-900/[0.025] flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="" 
            className="w-[280px] h-[280px] object-contain opacity-[0.045] grayscale brightness-90 transform -rotate-12"
          />
        </div>
        <span className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-900/[0.04] select-none">
          JAYARAMS SOLAR SOLUTIONS &bull; OFFICIAL DOCUMENT
        </span>
      </div>
    </div>
  );
}

