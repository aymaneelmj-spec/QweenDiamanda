import React from 'react';

export const DiamondSVG: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Glow effect underneath */}
      <div className="absolute inset-0 bg-gold-400/20 blur-[60px] rounded-full scale-150 transform -translate-y-4" />
      
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] diamond-3d"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E5AB" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA8A12" />
          </linearGradient>
          <linearGradient id="goldFacet1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E6C27A" />
            <stop offset="100%" stopColor="#AA8A12" />
          </linearGradient>
          <linearGradient id="goldFacet2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6A0B" />
          </linearGradient>
          <linearGradient id="goldFacet3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F3E5AB" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>

        {/* Top Flat Crown */}
        <polygon points="60,40 140,40 160,80 40,80" fill="url(#goldTop)" strokeWidth="0.5" stroke="#FFFFFF" />
        <polygon points="60,40 100,40 100,80 40,80" fill="rgba(255,255,255,0.1)" />

        {/* Crown Facets (top sides) */}
        <polygon points="60,40 100,60 40,80" fill="url(#goldFacet3)" strokeWidth="0.5" stroke="#FFFFFF" />
        <polygon points="140,40 160,80 100,60" fill="url(#goldFacet2)" strokeWidth="0.5" stroke="#FFFFFF" />
        <polygon points="60,40 140,40 100,60" fill="url(#goldTop)" strokeWidth="0.5" stroke="#FFFFFF" />

        {/* Pavilion (bottom point) */}
        <polygon points="40,80 160,80 100,180" fill="url(#goldFacet1)" strokeWidth="0.5" stroke="#FFFFFF" />
        
        {/* Pavilion Facets */}
        <polygon points="40,80 100,100 100,180" fill="url(#goldFacet2)" opacity="0.9" strokeWidth="0.5" stroke="#FFFFFF" />
        <polygon points="160,80 100,100 100,180" fill="url(#goldFacet3)" opacity="0.8" strokeWidth="0.5" stroke="#FFFFFF" />
        <polygon points="40,80 160,80 100,100" fill="#E6C27A" opacity="0.5" strokeWidth="0.5" stroke="#FFFFFF" />
        
        {/* Edge highlights */}
        <polyline points="40,80 160,80" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
        <polyline points="60,40 140,40" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
        <polyline points="60,40 40,80" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
        <polyline points="140,40 160,80" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
        <polyline points="100,180 40,80" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5" />
        <polyline points="100,180 160,80" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5" />
      </svg>
    </div>
  );
};
