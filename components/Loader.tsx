import React, { useState, useEffect } from 'react';
import { ProcessingIcon } from './icons/ProcessingIcon';

const messages = [
  "Analyzing customer data...",
  "Scanning product catalog...",
  "Identifying key segments...",
  "Crafting compelling subject lines...",
  "Personalizing email content...",
  "Generating header images...",
  "Generating strategic KPIs...",
  "Finalizing campaigns...",
];

export const Loader: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ProcessingIcon className="w-24 h-24 text-cyan-400" />
      <p className="mt-4 text-slate-300 font-semibold text-lg">AI is generating...</p>
      <p 
        key={currentMessageIndex} 
        className="mt-2 text-sm text-slate-400 h-5 loader-text-enter-active"
      >
        {messages[currentMessageIndex]}
      </p>
    </div>
  );
};