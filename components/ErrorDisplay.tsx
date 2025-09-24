
import React from 'react';
import { AlertTriangleIcon } from './Icons';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg flex items-center gap-4">
    <AlertTriangleIcon className="w-6 h-6 text-red-400 flex-shrink-0" />
    <div>
      <h4 className="font-bold">An Error Occurred</h4>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);
