import React, { useState } from 'react';
import { Check, X, Info, ZoomIn, ShieldCheck, ArrowRightLeft } from 'lucide-react';

/**
 * SideBySideComparator Component
 * Demonstrates Unit II: Component composition, conditional styling, and interactive comparison
 */
export const SideBySideComparator = ({ userImage, craft, comparisonPoints, isAuthentic }) => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-orange-600" />
            <h3 className="text-xl font-bold font-serif text-slate-900">
              Visual Characteristics Comparison
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Side-by-side comparison of user submitted specimen vs. official {craft.name} GI Reference Master
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
            GI Tag: {craft.giNumber}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
            {craft.district}, {craft.state}
          </span>
        </div>
      </div>

      {/* Visual Side-by-Side Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* User Specimen */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-300 bg-stone-100 flex flex-col">
          <div className="p-3 bg-stone-900 text-white flex items-center justify-between text-xs font-semibold">
            <span>User Submitted Specimen</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                isAuthentic ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}
            >
              {isAuthentic ? 'High Authenticity' : 'Potential Imitation'}
            </span>
          </div>
          <div className="relative h-64 overflow-hidden bg-stone-200">
            {userImage ? (
              <img
                src={userImage}
                alt="User submitted specimen"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs">
                No user image available
              </div>
            )}
          </div>
          <div className="p-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-600">
            <span className="font-semibold block text-stone-800">Analyzed Micro-Texture:</span>
            <span>{isAuthentic ? 'Organic handcraft micro-variations detected' : 'Rigid mechanical spacing observed'}</span>
          </div>
        </div>

        {/* Master GI Reference */}
        <div className="relative rounded-2xl overflow-hidden border border-amber-300 bg-amber-50/50 flex flex-col">
          <div className="p-3 bg-amber-900 text-amber-50 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Verified Master Reference (GI Archive)</span>
            </div>
            <span className="bg-amber-800 text-amber-100 px-2 py-0.5 rounded text-[10px] font-mono">
              STANDARDIZED
            </span>
          </div>
          <div className="relative h-64 overflow-hidden bg-amber-100">
            <img
              src={craft.macroTextureImage || craft.heroImage}
              alt={craft.name + ' Verified Reference'}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 bg-amber-50 border-t border-amber-200 text-xs text-amber-900">
            <span className="font-semibold block text-amber-950">Artisan Master Standard:</span>
            <span>{craft.keyIndicators[0].expected}</span>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold uppercase tracking-wider text-stone-700">
          Inspection Attribute Breakdown
        </h4>

        <div className="divide-y divide-stone-200 border border-stone-200 rounded-2xl overflow-hidden text-xs">
          {comparisonPoints.map((item, index) => (
            <div
              key={item.feature}
              className={`grid grid-cols-1 md:grid-cols-12 p-4 gap-3 items-center ${
                index % 2 === 0 ? 'bg-white' : 'bg-stone-50/60'
              }`}
            >
              {/* Feature Title (3 cols) */}
              <div className="md:col-span-3 font-semibold text-slate-900 flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white ${
                    item.match ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                >
                  {item.match ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </span>
                <span>{item.feature}</span>
              </div>

              {/* Master Expected (4 cols) */}
              <div className="md:col-span-4 text-stone-600">
                <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">
                  GI Reference Specification
                </span>
                <p className="leading-relaxed">{item.masterReference}</p>
              </div>

              {/* Observed in Sample (5 cols) */}
              <div className="md:col-span-5">
                <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">
                  Observed in Submitted Specimen
                </span>
                <p
                  className={`leading-relaxed font-medium ${
                    item.match ? 'text-emerald-900' : 'text-rose-900'
                  }`}
                >
                  {item.sampleObserved}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
