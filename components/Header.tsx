import React from 'react';

interface HeaderProps {
  onTitleClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onTitleClick }) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-20">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <h1 
          onClick={onTitleClick}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 cursor-pointer select-none"
          title="Try clicking me a few times!"
        >
          ProMail
        </h1>
        <p className="text-slate-400 mt-1">
          Your smartest AI Composer
        </p>
      </div>
    </header>
  );
};