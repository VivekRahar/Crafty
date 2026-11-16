import React from 'react';
import { ShieldCheck, Activity, Search, Database, Sparkles } from 'lucide-react';

/**
 * ScanningAnimation Component
 * Demonstrates Unit II & III:
 * - Dynamic SVG animations and progress rendering
 * - State-driven status feedback during async processing
 */
export const ScanningAnimation = ({ progress, currentStepText, image }) => {
  const steps = [
    { label: 'Surface Matrix & Weave Density', threshold: 30, icon: Activity },
    { label: 'Heritage Motif Geometry Check', threshold: 60, icon: Search },
    { label: 'Natural Dye & Chromatic Spectrum', threshold: 80, icon: Sparkles },
    { label: 'Official ODOP Registry Cross-Reference', threshold: 95, icon: Database },
  ];

  return (
    <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-stone-800">
      {/* Background Mandala Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
            AI Computer Vision Pipeline Active
          </div>
          <h3 className="text-2xl font-bold font-serif text-white tracking-tight">
            Scanning Handicraft Specimen
          </h3>
          <p className="text-stone-400 text-sm mt-1 max-w-md mx-auto">
            Comparing micro-structural characteristics against verified Geographical Indication master archives.
          </p>
        </div>

        {/* Central Visual Inspection HUD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
          {/* Left: Scanned Image with Laser Line */}
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden border-2 border-orange-500/50 bg-black/60 shadow-inner group">
            {image ? (
              <img
                src={image}
                alt="Scanning target"
                className="w-full h-full object-cover filter contrast-125 brightness-95"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-600">
                <span>Specimen Matrix</span>
              </div>
            )}

            {/* Scanning Laser Beam */}
            <div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_15px_#f97316] animate-scan"
            />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Corner Target Markers */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-orange-400" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-orange-400" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-orange-400" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-orange-400" />

            <div className="absolute top-3 right-3 bg-black/80 px-2.5 py-1 rounded-md text-[10px] font-mono text-orange-400 border border-orange-500/40">
              FRAME // 60 FPS
            </div>
          </div>

          {/* Right: Step-by-Step Status Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 pb-2 border-b border-stone-800">
              <span>PIPELINE PROGRESS</span>
              <span className="text-orange-400 font-bold text-base">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-stone-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_#ea580c]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-orange-300 font-mono italic animate-pulse">
              {currentStepText}
            </p>

            {/* Steps List */}
            <div className="space-y-2.5 pt-2">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = progress >= step.threshold;
                const isCurrent = progress < step.threshold && (idx === 0 || progress >= steps[idx - 1].threshold);

                return (
                  <div
                    key={step.label}
                    className={`flex items-center gap-3 p-2.5 rounded-xl text-xs transition-colors border ${
                      isCompleted
                        ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                        : isCurrent
                        ? 'bg-orange-950/40 border-orange-700/80 text-orange-200'
                        : 'bg-stone-900 border-stone-800/80 text-stone-500'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isCurrent
                          ? 'bg-orange-500/20 text-orange-400 animate-pulse'
                          : 'bg-stone-800 text-stone-600'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium flex-1">{step.label}</span>
                    <span className="font-mono text-[10px]">
                      {isCompleted ? '✓ VERIFIED' : isCurrent ? 'SCANNING...' : 'PENDING'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
