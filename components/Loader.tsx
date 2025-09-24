
import React from 'react';
import { BananaIcon } from './Icons';

export const Loader: React.FC = () => (
  <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
    <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 border-4 border-purple-500/50 rounded-full"></div>
        <div className="absolute w-24 h-24 border-t-4 border-purple-500 rounded-full animate-spin"></div>
        <BananaIcon className="w-12 h-12 text-yellow-300" />
    </div>
    <p className="text-slate-300 text-lg font-semibold mt-6">Conjuring AI Magic...</p>
    <p className="text-slate-400 mt-1">This can take a moment.</p>
  </div>
);
