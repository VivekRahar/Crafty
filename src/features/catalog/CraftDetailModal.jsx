import React from 'react';
import { MapPin, Award, ShieldAlert, CheckCircle, Flame, ExternalLink } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

/**
 * CraftDetailModal Component
 * Demonstrates Unit II: Modal composition, deep object destructuring, and semantic specs layout
 */
export const CraftDetailModal = ({ craft, isOpen, onClose, onVerifyThisCraft }) => {
  if (!craft) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={craft.name}
      subtitle={`${craft.district}, ${craft.state} • ${craft.giNumber}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Hero Photo & Quick Stats */}
        <div className="relative h-64 rounded-2xl overflow-hidden bg-stone-100">
          <img
            src={craft.heroImage}
            alt={craft.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
              {craft.category} • Registered {craft.registeredYear}
            </span>
            <h3 className="text-2xl font-bold font-serif">{craft.name}</h3>
            <p className="text-xs text-stone-300 font-mono mt-0.5">{craft.vernacularName}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-stone-700 leading-relaxed">
          {craft.description}
        </p>

        {/* GI Registration Info */}
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-700" />
            <h4 className="font-bold font-serif text-slate-900 text-sm">
              Geographical Indications Registry Specifications
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
            <div>
              <span className="text-[10px] font-bold uppercase text-stone-400 block">GI Application</span>
              <span className="font-mono font-bold text-amber-900 text-sm">{craft.giNumber}</span>
              <span className="block text-stone-500">{craft.giClass}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-stone-400 block">Nodal Guild</span>
              <span className="font-semibold text-stone-800">{craft.artisanGuild}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-stone-400 block">Price Range</span>
              <span className="font-semibold text-stone-800">{craft.priceRange}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-stone-400 block">Hologram Code Pattern</span>
              <span className="font-mono text-stone-800">{craft.giHologramFormat}</span>
            </div>
          </div>
        </div>

        {/* Key Authentic Identifiers */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Official Identifying Characteristics</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {craft.keyIndicators.map((ind) => (
              <div key={ind.name} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                <span className="font-bold text-stone-900 block mb-0.5">{ind.name}</span>
                <p className="text-stone-600 mb-1 leading-relaxed">{ind.expected}</p>
                <span className="text-[10px] text-amber-800 font-medium block">
                  Method: {ind.technique}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Counterfeit Warning Signs */}
        <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-5">
          <h4 className="font-bold text-rose-900 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Counterfeit & Imitation Red Flags</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-rose-800">
            {craft.counterfeitAlerts.map((alert, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>{alert}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Consumer Home Tests */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-600" />
            <span>Buyer Physical Tests</span>
          </h4>
          <div className="space-y-2.5">
            {craft.buyerPhysicalTests.map((t, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                <span className="font-bold text-stone-900 block">{t.testName}</span>
                <p className="text-stone-600 my-1">{t.procedure}</p>
                <span className="text-[10px] text-emerald-800 font-medium">Why it matters: {t.significance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onClose();
              onVerifyThisCraft(craft);
            }}
          >
            Launch AI Verification for this Craft
          </Button>
        </div>
      </div>
    </Modal>
  );
};
