import React from 'react';

export const DecorativeOrbs: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="orb-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.2)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </radialGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="30" result="coloredBlur" />
          </filter>
        </defs>
        <g filter="url(#glow-filter)">
          {/* Top-left orb */}
          <circle cx="15%" cy="20%" r="300" fill="url(#orb-gradient)" />
          {/* Bottom-right orb */}
          <circle cx="80%" cy="85%" r="400" fill="url(#orb-gradient)" />
        </g>
      </svg>
    </div>
  );
};