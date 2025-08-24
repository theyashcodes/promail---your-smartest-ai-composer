import React from 'react';
import { Users, Package } from './icons/InfoIcons';
import { AwaitingInstructionsIcon } from './icons/AwaitingInstructionsIcon';

export const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 p-8">
      <AwaitingInstructionsIcon className="w-40 h-40 mb-4 text-cyan-400" />
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Awaiting Instructions</h2>
      <p className="max-w-md mb-6">
        Your AI-generated email campaigns will materialize here. 
        Provide the necessary data, define your goal, and let the AI work its magic.
      </p>
      <div className="flex flex-col md:flex-row gap-8 text-left">
          <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-gray-700 rounded-full ring-1 ring-white/10">
                <Users className="w-6 h-6 text-cyan-400"/>
              </div>
              <div>
                  <h3 className="font-semibold text-slate-200">Customer Segments</h3>
                  <p className="text-sm">Define your audience for hyper-personalization.</p>
              </div>
          </div>
          <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-gray-700 rounded-full ring-1 ring-white/10">
                <Package className="w-6 h-6 text-cyan-400"/>
              </div>
              <div>
                  <h3 className="font-semibold text-slate-200">Product Catalog</h3>
                  <p className="text-sm">Inform the AI about the products to promote.</p>
              </div>
          </div>
      </div>
    </div>
  );
};