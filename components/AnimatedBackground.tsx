import React from 'react';

interface AnimatedBackgroundProps {
  hyperspaceActive: boolean;
}

// Create a star layer
const createStars = (count: number, durationMin: number, durationMax: number, size: number) => {
  return Array.from({ length: count }).map((_, i) => {
    const cx = Math.random() * 200 - 50; // Start off-screen left
    const cy = Math.random() * 100;
    const duration = Math.random() * (durationMax - durationMin) + durationMin;
    const opacity = Math.random() * 0.5 + 0.2;

    return (
      <circle key={`star-${size}-${i}`} cx={cx} cy={`${cy}%`} r={size} fill="white" fillOpacity={opacity}>
        <animateMotion
          path={`M0,0 H${window.innerWidth + 200}`}
          dur={`${duration}s`}
          repeatCount="indefinite"
          begin={`${-duration * Math.random()}s`} // Stagger start times
        />
      </circle>
    );
  });
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ hyperspaceActive }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full -z-10 bg-gray-900 ${hyperspaceActive ? 'hyperspace-active' : ''}`}>
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        {/* Small, fast stars (closest) */}
        {createStars(50, 20, 40, 0.5)}
        {/* Medium, medium-speed stars */}
        {createStars(30, 40, 70, 1)}
        {/* Large, slow stars (farthest) */}
        {createStars(20, 70, 120, 1.5)}
      </svg>
    </div>
  );
};