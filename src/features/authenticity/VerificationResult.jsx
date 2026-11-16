import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck, AlertTriangle, XCircle, Award, CheckCircle2,
  FileText, RefreshCw, ExternalLink, Sparkles, Check, ChevronRight,
  Flame, Eye, Layers, MapPin
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SideBySideComparator } from './SideBySideComparator';
import { PramaanCertificate } from './PramaanCertificate';

/**
 * VerificationResult Component
 * Demonstrates Unit II: Dynamic styling, component orchestration, conditional rendering
 * Demonstrates Unit III: Triggering side effect (confetti) on genuine craft verification
 */
export const VerificationResult = ({ result, userImage, onReset, onOpenChecklist }) => {
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  useEffect(() => {
    // If product is authentic with score > 80, fire a celebratory confetti burst!
    if (result && result.isAuthentic && result.scores.overall >= 80) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ea580c', '#f59e0b', '#10b981', '#3b82f6']
        });
      } catch (e) {
        // Safe fallback if canvas-confetti is not loaded
      }
    }
  }, [result]);

  if (!result) return null;

  const { verificationId, craft, scores, status, verdict, keyFindings, giMetadata, comparisonPoints, recommendations } = result;

  const isGenuine = result.isAuthentic;
  const score = scores.overall;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Hero Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-sm transition-all ${
          isGenuine
            ? 'bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/50 border-emerald-200'
            : 'bg-gradient-to-br from-rose-50/90 via-white to-rose-50/50 border-rose-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left: Verdict and Craft Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isGenuine
                    ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20'
                    : 'bg-rose-600 text-white shadow-xs shadow-rose-500/20'
                }`}
              >
                {isGenuine ? (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Authentic ODOP GI Product
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    High Counterfeit Risk Detected
                  </>
                )}
              </span>
              <span className="text-xs text-stone-600 font-mono">
                ID: {verificationId}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 tracking-tight">
              {craft.name}
            </h2>

            <p className="text-sm font-medium text-stone-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>{craft.district}, {craft.state}</span>
              <span className="text-stone-300">•</span>
              <span className="font-mono text-xs text-amber-900 font-semibold">{craft.giNumber}</span>
            </p>

            <p className="text-sm text-stone-700 leading-relaxed max-w-2xl pt-1">
              {verdict}
            </p>
          </div>

          {/* Right: Circular / Radial Authenticity Gauge */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white shadow-md border border-stone-200 shrink-0 self-center lg:self-auto w-full sm:w-auto">
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Radial Progress SVG */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={isGenuine ? '#059669' : '#e11d48'}
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * score) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900 leading-none">
                  {score}%
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mt-1">
                  Confidence
                </span>
              </div>
            </div>

            <span className="text-xs font-semibold text-stone-700 mt-2">
              Authenticity Index
            </span>
          </div>
        </div>

        {/* Action Buttons in Banner */}
        <div className="mt-6 pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={Award}
              onClick={() => setIsCertificateOpen(true)}
            >
              View Official Certificate
            </Button>

            <Button
              variant="outline"
              size="sm"
              icon={FileText}
              onClick={onOpenChecklist}
            >
              Run Artisan Checklist
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            icon={RefreshCw}
            onClick={onReset}
          >
            Verify Another Craft
          </Button>
        </div>
      </div>

      {/* 4-Pillar Score Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weave / Surface */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Surface Weave
            </span>
            <span className="text-xs font-bold text-stone-900">{scores.weaveIntegrity}%</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-orange-500 rounded-full"
              style={{ width: `${scores.weaveIntegrity}%` }}
            />
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isGenuine
              ? 'Handloom organic micro-irregularities verified.'
              : 'Machine powerloom continuous uniformity detected.'}
          </p>
        </div>

        {/* Motif Geometry */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Motif Geometry
            </span>
            <span className="text-xs font-bold text-stone-900">{scores.motifGeometry}%</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${scores.motifGeometry}%` }}
            />
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isGenuine
              ? `Authentic ${craft.keyIndicators[2].name} traditional patterns matched.`
              : 'Industrial stencil pattern with mechanical edges.'}
          </p>
        </div>

        {/* Dye Spectrum */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Dye & Pigment
            </span>
            <span className="text-xs font-bold text-stone-900">{scores.chromaticSpectrum}%</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${scores.chromaticSpectrum}%` }}
            />
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isGenuine
              ? 'Vegetal/mineral natural absorption curves observed.'
              : 'Flat synthetic azo chemical dye spectrum detected.'}
          </p>
        </div>

        {/* GI Registry Status */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              GI Database
            </span>
            <span className="text-xs font-bold text-stone-900">{scores.giRegistry}%</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${scores.giRegistry}%` }}
            />
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isGenuine
              ? `Cross-referenced with ${craft.district} ODOP cluster.`
              : 'Registry mismatch or uncertified manufacturer tag.'}
          </p>
        </div>
      </div>

      {/* AI Key Findings & Diagnostics */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold font-serif text-slate-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-orange-600" />
          <span>Explainable AI Diagnostic Insights</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyFindings.map((finding, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isGenuine
                  ? 'bg-emerald-50/40 border-emerald-200/70 text-emerald-950'
                  : 'bg-rose-50/40 border-rose-200/70 text-rose-950'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-xs ${
                  isGenuine ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              >
                {isGenuine ? '✓' : '!'}
              </span>
              <p className="text-xs font-medium leading-relaxed">{finding}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Visual Comparison Component */}
      <SideBySideComparator
        userImage={userImage}
        craft={craft}
        comparisonPoints={comparisonPoints}
        isAuthentic={isGenuine}
      />

      {/* Official ODOP & GI Metadata Card */}
      <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/40 rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-700" />
          <h3 className="text-lg font-bold font-serif text-amber-950">
            Official Geographical Indication (GI) Registry Record
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-amber-950">
          <div className="bg-white/80 p-4 rounded-2xl border border-amber-200/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
              GI Registration Number
            </span>
            <span className="text-base font-bold font-mono text-slate-900">
              {giMetadata.officialGiNumber}
            </span>
            <span className="text-stone-500 block mt-0.5">{giMetadata.giClass}</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-amber-200/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
              Registered District & State
            </span>
            <span className="text-base font-bold text-slate-900">
              {giMetadata.registeredDistrict}, {giMetadata.state}
            </span>
            <span className="text-stone-500 block mt-0.5">Year of GI Tag: {giMetadata.registeredYear}</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-amber-200/60 sm:col-span-2 lg:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
              Nodal Artisan Guild
            </span>
            <span className="font-semibold text-slate-900 block leading-tight">
              {giMetadata.artisanGuild}
            </span>
            <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200/60 text-amber-900">
              Status: {giMetadata.registryStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Buyer Physical Inspection Tests (Home Tests) */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-bold font-serif text-slate-900">
            Recommended Physical Verification Tests for Consumers
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          Simple non-destructive or micro-thread tests you can perform at home to confirm authenticity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {craft.buyerPhysicalTests.map((test, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block mb-1">
                  Test #{index + 1}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">
                  {test.testName}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  {test.procedure}
                </p>
              </div>
              <div className="pt-2 border-t border-stone-200 text-[11px] font-medium text-amber-800">
                <span className="font-semibold text-stone-700">Significance: </span>
                {test.significance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Certificate Modal */}
      <PramaanCertificate
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        result={result}
      />
    </div>
  );
};
