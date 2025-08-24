import React from 'react';

export const AwaitingInstructionsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="planet-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    {/* Central Planet */}
    <circle cx="100" cy="100" r="30" fill="url(#planet-gradient)" filter="url(#glow)" />
    
    {/* Orbital Paths */}
    <ellipse cx="100" cy="100" rx="60" ry="60" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    <ellipse cx="100" cy="100" rx="80" ry="40" transform="rotate(-30 100 100)" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    
    {/* Orbiting data points */}
    <g>
      <circle cx="160" cy="100" r="5" fill="currentColor" />
      <animateMotion dur="8s" repeatCount="indefinite" path="M0,0 A60,60 0 1,1 0,-0.01 Z" />
    </g>
    <g>
      <rect x="73" y="54" width="6" height="6" rx="2" fill="currentColor" opacity="0.8" />
      <animateMotion dur="12s" repeatCount="indefinite">
        <mpath xlinkHref="#orbit2" />
      </animateMotion>
    </g>

    <path id="orbit2" d="M 100, 100 m -80, -20 a 80,40 -30 1,1 160,40 a 80,40 -30 1,1 -160,-40" fill="none" />
  </svg>
);