import React from 'react';
import { Award, Printer, Download, CheckCircle, Shield, X, MapPin } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

/**
 * PramaanCertificate Component
 * Demonstrates Unit II: Modal rendering, semantic print layouts, and props display
 */
export const PramaanCertificate = ({ isOpen, onClose, result }) => {
  if (!result) return null;

  const { verificationId, timestamp, craft, scores, verdict, isAuthentic, giMetadata } = result;
  const formattedDate = new Date(timestamp).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pramaan Authenticity Certificate"
      subtitle={`Official Verification Record #${verificationId}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Printable Certificate Frame */}
        <div
          id="printable-certificate"
          className="relative bg-gradient-to-br from-amber-50/40 via-white to-amber-50/30 p-8 sm:p-12 rounded-3xl border-4 border-double border-amber-700/60 shadow-xl overflow-hidden text-center"
        >
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="font-serif font-black text-[220px] text-amber-900 select-none">
              प्र
            </span>
          </div>

          {/* Top Emblem */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-center shadow-md mb-2">
              <Award className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-800">
              Government of India • ODOP Verification Initiative
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 tracking-tight mt-1">
              Certificate of Authenticity
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mt-2" />
          </div>

          {/* Verification Statement */}
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed mb-6">
            This document certifies that the handicraft specimen referenced below has undergone multi-factor computer vision analysis against verified master records maintained by the Geographical Indications Registry of India.
          </p>

          {/* Product Details Box */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-amber-200/90 p-6 shadow-sm mb-6 max-w-xl mx-auto text-left">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-600 uppercase font-bold text-[10px] block">
                  Product / Craft:
                </span>
                <span className="text-base font-serif font-bold text-slate-900">
                  {craft.name}
                </span>
                <span className="text-[11px] text-stone-500 block">{craft.vernacularName}</span>
              </div>

              <div>
                <span className="text-stone-600 uppercase font-bold text-[10px] block">
                  Geographical Origin:
                </span>
                <span className="font-semibold text-slate-900 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  {craft.district}, {craft.state}
                </span>
                <span className="text-[11px] text-stone-500 block">ODOP District Cluster</span>
              </div>

              <div>
                <span className="text-stone-600 uppercase font-bold text-[10px] block">
                  GI Registration Number:
                </span>
                <span className="font-mono font-bold text-amber-900 text-sm">
                  {craft.giNumber}
                </span>
                <span className="text-[10px] text-stone-500 block">{craft.giClass}</span>
              </div>

              <div>
                <span className="text-stone-600 uppercase font-bold text-[10px] block">
                  Overall Authenticity Index:
                </span>
                <span
                  className={`text-base font-black ${
                    isAuthentic ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {scores.overall}% — {isAuthentic ? 'Authentic ODOP' : 'Imitation Risk'}
                </span>
              </div>
            </div>

            {/* Score Grid */}
            <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-4 gap-2 text-center">
              <div className="p-1.5 rounded-lg bg-stone-50">
                <span className="text-[9px] text-stone-500 block">Surface Weave</span>
                <span className="font-bold text-stone-800 text-xs">{scores.weaveIntegrity}%</span>
              </div>
              <div className="p-1.5 rounded-lg bg-stone-50">
                <span className="text-[9px] text-stone-500 block">Motif Geometry</span>
                <span className="font-bold text-stone-800 text-xs">{scores.motifGeometry}%</span>
              </div>
              <div className="p-1.5 rounded-lg bg-stone-50">
                <span className="text-[9px] text-stone-500 block">Dye Spectrum</span>
                <span className="font-bold text-stone-800 text-xs">{scores.chromaticSpectrum}%</span>
              </div>
              <div className="p-1.5 rounded-lg bg-stone-50">
                <span className="text-[9px] text-stone-500 block">GI Database</span>
                <span className="font-bold text-stone-800 text-xs">{scores.giRegistry}%</span>
              </div>
            </div>
          </div>

          {/* Certificate Footer Meta */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 max-w-xl mx-auto pt-4 border-t border-amber-200/80 gap-4">
            <div className="text-left">
              <span className="block font-mono text-[10px] text-stone-400">CERTIFICATE ID</span>
              <span className="font-mono font-bold text-stone-800">{verificationId}</span>
              <span className="block text-[10px] text-stone-400 mt-0.5">Date: {formattedDate}</span>
            </div>

            {/* Digital Seal Simulation */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-dashed border-amber-600 bg-amber-50 text-amber-900">
              <Shield className="w-5 h-5 text-amber-700" />
              <div className="text-left">
                <span className="text-[9px] font-bold uppercase tracking-wider block">
                  DIGITALLY VERIFIED
                </span>
                <span className="text-[10px] font-serif font-bold text-amber-800">
                  Pramaan Engine v1.0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePrint} icon={Printer}>
            Print / Save as PDF
          </Button>
        </div>
      </div>
    </Modal>
  );
};
