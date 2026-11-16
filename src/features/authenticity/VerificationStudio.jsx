import React, { useState } from 'react';
import { ShieldCheck, Sparkles, AlertCircle, Award } from 'lucide-react';
import { useCraftVerification } from '../../hooks/useCraftVerification';
import { ImageUploader } from './ImageUploader';
import { ScanningAnimation } from './ScanningAnimation';
import { VerificationResult } from './VerificationResult';

/**
 * VerificationStudio Component
 * Demonstrates Unit I & II:
 * - Feature-based architecture
 * - Conditional rendering strategies
 * - State synchronization through custom hooks
 */
export const VerificationStudio = ({ onOpenChecklist, onSelectCraftInExplorer }) => {
  const {
    status,
    progress,
    currentStepText,
    result,
    error,
    startVerification,
    resetVerification,
    isScanning
  } = useCraftVerification();

  const [currentUploadedImage, setCurrentUploadedImage] = useState(null);

  const handleStart = (input) => {
    setCurrentUploadedImage(input.image);
    startVerification(input);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>India ODOP Visual Authenticity Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight">
          Verify Handloom & Handicraft Authenticity
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Upload an image of an ODOP product (Pashmina, Banarasi silk, Blue Pottery, Madhubani). Our AI inspects weave density, motif geometry, and natural dye signatures against verified GI registry records.
        </p>
      </div>

      {/* Main Workflow: Upload -> Scan -> Result */}
      {status === 'scanning' && (
        <ScanningAnimation
          progress={progress}
          currentStepText={currentStepText}
          image={currentUploadedImage}
        />
      )}

      {status === 'complete' && result && (
        <VerificationResult
          result={result}
          userImage={currentUploadedImage}
          onReset={resetVerification}
          onOpenChecklist={onOpenChecklist}
        />
      )}

      {status === 'idle' && (
        <ImageUploader
          onStartVerification={handleStart}
          isScanning={isScanning}
        />
      )}

      {status === 'error' && (
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center max-w-md mx-auto space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-600 mx-auto" />
          <h3 className="text-lg font-bold text-rose-900">Verification Interrupted</h3>
          <p className="text-xs text-rose-700">{error}</p>
          <button
            onClick={resetVerification}
            className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
