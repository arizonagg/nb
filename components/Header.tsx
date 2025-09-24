
import React from 'react';
import { BananaIcon, UploadIcon } from './Icons';

interface HeaderProps {
  onNewImage: () => void;
  showNewImageButton: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onNewImage, showNewImageButton }) => (
  <header className="w-full max-w-7xl mx-auto mb-6 flex justify-between items-center">
    <div className="flex items-center gap-3">
      <BananaIcon className="w-8 h-8 text-yellow-300" />
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
        Nano Banana <span className="text-slate-400 font-normal">Photo Editor</span>
      </h1>
    </div>
    {showNewImageButton && (
      <button 
        onClick={onNewImage}
        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        <UploadIcon className="w-5 h-5" />
        New Image
      </button>
    )}
  </header>
);
