import React from 'react';

interface DataInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
}

export const DataInput: React.FC<DataInputProps> = ({ id, label, value, onChange, placeholder, rows = 10 }) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-xl ring-1 ring-white/10">
      <label htmlFor={id} className="block text-lg font-semibold text-slate-200 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-sm font-mono bg-gray-900 text-slate-300 placeholder-slate-500"
      />
    </div>
  );
};