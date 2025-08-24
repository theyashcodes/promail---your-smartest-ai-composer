import React from 'react';

export const ProcessingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="processing-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    {/* Outer spinner */}
    <path
      d="M 50,5 A 45,45 0 1 1 49.99,5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.5"
      strokeDasharray="141.37"
      strokeDashoffset="80"
      className="processing-spinner"
    />
    
    {/* Inner pulsing core */}
    <circle
      cx="50"
      cy="50"
      r="15"
      fill="currentColor"
      filter="url(#processing-glow)"
      className="processing-core"
    />

    {/* Vertical scan line */}
    <rect 
      x="49"
      y="30"
      width="2"
      height="40"
      fill="white"
      fillOpacity="0.7"
      rx="1"
      className="processing-scanner"
      filter="url(#processing-glow)"
    />
  </svg>
);