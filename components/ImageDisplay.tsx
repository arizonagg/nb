
import React from 'react';
import { DownloadIcon } from './Icons';

interface ImageDisplayProps {
  originalUrl: string | null;
  editedUrl: string | null;
  isLoading: boolean;
  onDownload: () => void;
}

const ImageBox: React.FC<{ url: string | null; title: string; isLoading?: boolean, onDownload?: () => void }> = ({ url, title, isLoading = false, onDownload }) => (
    <div className="w-full rounded-lg bg-slate-900/50 flex flex-col border border-slate-700 shadow-md overflow-hidden">
        <div className="flex justify-between items-center bg-slate-800 text-slate-400 font-semibold border-b border-slate-700 px-4">
            <h3 className="py-2">{title}</h3>
            {onDownload && url && !isLoading && (
              <button
                onClick={onDownload}
                className="p-1 text-slate-400 rounded-md transition-colors hover:bg-slate-700 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Download edited image"
                title="Download edited image"
              >
                <DownloadIcon className="w-5 h-5" />
              </button>
            )}
        </div>
        <div className="aspect-square w-full p-2">
            {isLoading ? (
                <div className="w-full h-full bg-slate-700 animate-pulse rounded-md"></div>
            ) : url ? (
                <img src={url} alt={title} className="w-full h-full object-contain" />
            ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center rounded-md">
                   <p className="text-slate-500">AI edited image will appear here</p>
                </div>
            )}
        </div>
    </div>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalUrl, editedUrl, isLoading, onDownload }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <ImageBox url={originalUrl} title="Original" />
      <div className={`transition-opacity duration-500 ${editedUrl || isLoading ? 'opacity-100' : 'opacity-50'}`}>
         <ImageBox url={editedUrl} title="Edited" isLoading={isLoading && !editedUrl} onDownload={onDownload} />
      </div>
    </div>
  );
};
