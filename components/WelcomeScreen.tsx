
import React from 'react';
import { ImageUploader } from './ImageUploader';
import { ZapIcon, PaintBrushIcon, RocketIcon } from './Icons';

interface WelcomeScreenProps {
  onImageSelect: (file: File) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-slate-700/30 p-4 rounded-lg flex items-start gap-4">
    <div className="text-purple-400 mt-1">{icon}</div>
    <div>
      <h3 className="font-semibold text-slate-200">{title}</h3>
      <p className="text-slate-400 text-sm">{children}</p>
    </div>
  </div>
);


export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onImageSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-slate-100">AI-Powered Photo Editing</h2>
        <p className="mt-2 text-lg text-slate-400 max-w-2xl mx-auto">
          Start by uploading an image, then use simple text prompts to perform powerful edits with the Nano Banana model.
        </p>
      </div>
      
      <div className="w-full max-w-2xl">
          <ImageUploader onImageSelect={onImageSelect} />
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <FeatureCard icon={<ZapIcon className="w-6 h-6" />} title="Instant Edits">
            Describe your changes in plain English and see the results in seconds.
        </FeatureCard>
        <FeatureCard icon={<PaintBrushIcon className="w-6 h-6" />} title="Creative Freedom">
            Change styles, add objects, alter backgrounds, and let your imagination run wild.
        </FeatureCard>
        <FeatureCard icon={<RocketIcon className="w-6 h-6" />} title="Cutting-Edge AI">
            Powered by Google's latest generative image model for high-quality results.
        </FeatureCard>
      </div>
    </div>
  );
};
