
import React from 'react';
import { MagicWandIcon } from './Icons';

interface PromptControlsProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptControls: React.FC<PromptControlsProps> = ({ prompt, onPromptChange, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };
    
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-4">
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., add a party hat, make it a watercolor painting, turn the dog into a cat..."
        disabled={isLoading}
        rows={2}
        className="flex-grow bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none disabled:opacity-50"
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt.trim()}
        className="flex items-center justify-center gap-3 bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-600 transform hover:scale-105 disabled:scale-100"
      >
        <MagicWandIcon className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
        <span>{isLoading ? 'Editing...' : 'Edit Image'}</span>
      </button>
    </div>
  );
};
