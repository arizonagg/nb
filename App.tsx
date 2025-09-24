
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { PromptControls } from './components/PromptControls';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';
import { WelcomeScreen } from './components/WelcomeScreen';
import { editImage } from './services/geminiService';
import { GemIcon } from './components/Icons';

const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      if (!base64) {
        reject(new Error("Failed to read file as base64."));
        return;
      }
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = (error) => reject(error);
  });
};

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setEditedImageUrl(null);
    setError(null);
    setResponseText(null);
    setPrompt('');
  };

  const handleEditImage = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please upload an image and enter an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);
    setResponseText(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage);
      const result = await editImage(base64, mimeType, prompt);
      
      if (result.base64Image) {
        setEditedImageUrl(`data:image/png;base64,${result.base64Image}`);
      } else {
        setError("The model did not return an edited image. Try a different prompt.");
      }
      
      if (result.text) {
        setResponseText(result.text);
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  const handleDownload = useCallback(() => {
    if (!editedImageUrl) return;

    const link = document.createElement('a');
    link.href = editedImageUrl;
    link.download = 'nano-banana-edit.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [editedImageUrl]);

  const resetState = () => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setEditedImageUrl(null);
    setPrompt('');
    setIsLoading(false);
    setError(null);
    setResponseText(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col p-4 sm:p-6 lg:p-8">
      {isLoading && <Loader />}
      <Header onNewImage={resetState} showNewImageButton={!!originalImage} />
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
        <div className="w-full bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl shadow-slate-950/50 p-6 md:p-8 border border-slate-700">
          {!originalImageUrl ? (
            <WelcomeScreen onImageSelect={handleImageUpload} />
          ) : (
            <div className="flex flex-col gap-8">
              <ImageDisplay
                originalUrl={originalImageUrl}
                editedUrl={editedImageUrl}
                isLoading={isLoading}
                onDownload={handleDownload}
              />
              {error && <ErrorDisplay message={error} />}
              {responseText && !error && (
                 <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 text-slate-300 italic flex items-start gap-3">
                   <GemIcon className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                   <p>{responseText}</p>
                 </div>
              )}
              <PromptControls
                prompt={prompt}
                onPromptChange={setPrompt}
                onSubmit={handleEditImage}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </main>
      <footer className="text-center text-slate-500 mt-8 text-sm">
        <p>Powered by Google Gemini's Nano Banana Model</p>
      </footer>
    </div>
  );
};

export default App;
