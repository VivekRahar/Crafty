import React, { useState } from 'react';
import { ClipboardCheck, AlertCircle, CheckCircle2, ShieldCheck, Flame, Tag, HelpCircle } from 'lucide-react';
import { ODOP_CRAFTS } from '../../data/odopCrafts';
import { inspectionChecklistSchema } from '../../schemas/verificationSchema';
import { Button } from '../../components/common/Button';

/**
 * ArtisanChecklist Component
 * Demonstrates Unit IV:
 * - Controlled components pattern
 * - Schema-based validation using Zod
 * - Real-time error state mapping
 * - Accessible form labels and error descriptions
 */
export const ArtisanChecklist = ({ onNavigateToStudio }) => {
  const [formData, setFormData] = useState({
    craftId: ODOP_CRAFTS[0].id,
    sellerName: '',
    claimedPrice: '',
    giTagHologram: '',
    burnTestObservation: 'untested',
    tactileFeel: 'warm_organic_irregular',
    hasSilkMarkOrCraftMark: false,
    buyerNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedReport, setSubmittedReport] = useState(null);

  // Generic controlled input change handler (demonstrates immutability and functional update)
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    // Clear field-level error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate with Zod
    const validation = inspectionChecklistSchema.safeParse({
      ...formData,
      claimedPrice: formData.claimedPrice === '' ? undefined : Number(formData.claimedPrice)
    });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      setSubmittedReport(null);
      return;
    }

    setErrors({});
    const data = validation.data;
    const craft = ODOP_CRAFTS.find(c => c.id === data.craftId);

    // Compute composite physical inspection score
    let score = 50;
    const reasons = [];

    // Burn test
    if (data.burnTestObservation === 'burnt_hair_ash') {
      score += 25;
      reasons.push('Protein fiber confirmed (ash with burnt-hair smell matches pure silk/cashmere).');
    } else if (data.burnTestObservation === 'plastic_hard_bead') {
      score -= 35;
      reasons.push('Synthetic alarm: Fiber melted into hard plastic bead (indicates acrylic or polyester).');
    }

    // Tactile feel
    if (data.tactileFeel === 'warm_organic_irregular' || data.tactileFeel === 'heavy_crisp_drape') {
      score += 15;
      reasons.push('Tactile characteristics match traditional handloom/artisan texture.');
    } else if (data.tactileFeel === 'cold_synthetic_smooth' || data.tactileFeel === 'rigid_stiff_resin') {
      score -= 20;
      reasons.push('Surface feels unnaturally slippery/rigid, indicative of machine extrusion.');
    }

    // GI Hologram
    if (data.giTagHologram && data.giTagHologram.trim() !== '') {
      score += 15;
      reasons.push(`Official GI Hologram format verified (${data.giTagHologram}).`);
    }

    // Craft Mark / Silk Mark
    if (data.hasSilkMarkOrCraftMark) {
      score += 10;
      reasons.push('Statutory Silk Mark / Handloom Mark tag affixed.');
    }

    // Price sanity check
    if (data.claimedPrice < 2500 && (data.craftId === 'pashmina-kashmir' || data.craftId === 'banarasi-brocade' || data.craftId === 'kancheepuram-silk')) {
      score -= 25;
      reasons.push(`Suspicious low price (₹${data.claimedPrice}): Genuine ${craft?.name} standard minimum market cost is generally higher.`);
    }

    score = Math.max(10, Math.min(100, score));

    setSubmittedReport({
      score,
      craft,
      data,
      isAuthentic: score >= 70,
      reasons
    });
  };

  const selectedCraft = ODOP_CRAFTS.find(c => c.id === formData.craftId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200 text-xs font-semibold">
          <ClipboardCheck className="w-3.5 h-3.5 text-orange-600" />
          <span>Unit IV: Form Handling & Zod Schema Validation</span>
        </div>
        <h2 className="text-3xl font-black font-serif text-slate-900 tracking-tight">
          Artisan & Consumer Physical Inspection Form
        </h2>
        <p className="text-stone-600 text-sm max-w-xl mx-auto">
          Perform a multi-point physical audit (burn test, tactile texture, GI hologram serial code, and price benchmark) validated with Zod.
        </p>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Craft Selection */}
          <div>
            <label htmlFor="craftId" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Select Craft to Inspect <span className="text-orange-600">*</span>
            </label>
            <select
              id="craftId"
              value={formData.craftId}
              onChange={(e) => handleChange('craftId', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              {ODOP_CRAFTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.district}, {c.state} ({c.giNumber})
                </option>
              ))}
            </select>
          </div>

          {/* Seller Name & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sellerName" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Seller / Store / Weaver Name <span className="text-orange-600">*</span>
              </label>
              <input
                id="sellerName"
                type="text"
                value={formData.sellerName}
                onChange={(e) => handleChange('sellerName', e.target.value)}
                placeholder="e.g. Varanasi Weavers Co-op / Retailer"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                  errors.sellerName ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-300 focus:ring-orange-500'
                }`}
              />
              {errors.sellerName && (
                <p className="text-xs text-rose-600 mt-1">{errors.sellerName[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="claimedPrice" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Purchase Price (₹ INR) <span className="text-orange-600">*</span>
              </label>
              <input
                id="claimedPrice"
                type="number"
                value={formData.claimedPrice}
                onChange={(e) => handleChange('claimedPrice', e.target.value)}
                placeholder="e.g. 18500"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                  errors.claimedPrice ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-300 focus:ring-orange-500'
                }`}
              />
              {errors.claimedPrice && (
                <p className="text-xs text-rose-600 mt-1">{errors.claimedPrice[0]}</p>
              )}
              {selectedCraft && (
                <p className="text-[11px] text-stone-500 mt-1">
                  Expected Authentic Market Range: <strong className="text-stone-700">{selectedCraft.priceRange}</strong>
                </p>
              )}
            </div>
          </div>

          {/* GI Hologram Code */}
          <div>
            <label htmlFor="giTagHologram" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              GI Tag Hologram Serial Code (If affixed on tag)
            </label>
            <input
              id="giTagHologram"
              type="text"
              value={formData.giTagHologram}
              onChange={(e) => handleChange('giTagHologram', e.target.value)}
              placeholder="e.g. GI-JK-0046-8821"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 ${
                errors.giTagHologram ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-300 focus:ring-orange-500'
              }`}
            />
            {errors.giTagHologram && (
              <p className="text-xs text-rose-600 mt-1">{errors.giTagHologram[0]}</p>
            )}
            <p className="text-[11px] text-stone-500 mt-1">
              Follows pattern: GI-[State Code]-[4 digits]-[4 alphanumeric] (e.g. GI-UP-0099-4102)
            </p>
          </div>

          {/* Physical Tests: Burn Test & Tactile Feel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label htmlFor="burnTestObservation" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-600" />
                <span>Thread Burn Test Observation</span>
              </label>
              <select
                id="burnTestObservation"
                value={formData.burnTestObservation}
                onChange={(e) => handleChange('burnTestObservation', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="untested">Not Yet Tested / Untested</option>
                <option value="burnt_hair_ash">Burnt-Hair Smell + Crumbly Dark Ash (Pure Animal Silk / Cashmere)</option>
                <option value="plastic_hard_bead">Chemical Acrid Odor + Hard Melted Plastic Bead (Synthetic Acrylic)</option>
                <option value="paper_cellulose_ash">Burnt-Paper Smell + Grey Ash (Cotton or Rayon)</option>
                <option value="not_applicable">Not Applicable (Pottery / Woodcraft / Metalware)</option>
              </select>
              {errors.burnTestObservation && (
                <p className="text-xs text-rose-600 mt-1">{errors.burnTestObservation[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="tactileFeel" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Tactile Surface & Weight Feel
              </label>
              <select
                id="tactileFeel"
                value={formData.tactileFeel}
                onChange={(e) => handleChange('tactileFeel', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="warm_organic_irregular">Warm, soft organic feel with subtle handloom irregularity</option>
                <option value="heavy_crisp_drape">Heavy, dense fall with crisp metallic bullion zari fall</option>
                <option value="cold_synthetic_smooth">Unnaturally slippery, glossy, and cold plastic feel</option>
                <option value="rigid_stiff_resin">Stiff synthetic plastic or printed glue backing</option>
                <option value="natural_crazed_ceramic">Cool quartz stone feel with micro-crazed glaze</option>
                <option value="unknown">Uncertain / Other</option>
              </select>
            </div>
          </div>

          {/* Statutory Mark Checkbox */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
            <input
              id="hasSilkMarkOrCraftMark"
              type="checkbox"
              checked={formData.hasSilkMarkOrCraftMark}
              onChange={(e) => handleChange('hasSilkMarkOrCraftMark', e.target.checked)}
              className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            />
            <label htmlFor="hasSilkMarkOrCraftMark" className="text-xs text-stone-700 cursor-pointer">
              <strong>Govt Statutory Mark Affixed:</strong> Product bears an official Silk Mark, Handloom Mark, or GI India registered tag with verifiable serial number.
            </label>
          </div>

          {/* Buyer Notes */}
          <div>
            <label htmlFor="buyerNotes" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Inspection Context & Seller Claims <span className="text-orange-600">*</span>
            </label>
            <textarea
              id="buyerNotes"
              rows={3}
              value={formData.buyerNotes}
              onChange={(e) => handleChange('buyerNotes', e.target.value)}
              placeholder="e.g. Purchased in Varanasi Chowk, seller claimed pure mulberry silk with real silver zari..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors.buyerNotes ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-300 focus:ring-orange-500'
              }`}
            />
            {errors.buyerNotes && (
              <p className="text-xs text-rose-600 mt-1">{errors.buyerNotes[0]}</p>
            )}
            <p className="text-[11px] text-stone-500 mt-1">Minimum 10 characters required for Zod schema validation.</p>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500">
              Validates inputs with Zod and computes a weighted physical compliance score.
            </span>
            <Button type="submit" variant="primary" size="lg" icon={CheckCircle2}>
              Calculate Authenticity Score
            </Button>
          </div>
        </form>
      </div>

      {/* Submission Result Report Card */}
      {submittedReport && (
        <div
          className={`rounded-3xl p-6 sm:p-8 border shadow-md transition-all ${
            submittedReport.isAuthentic
              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
              : 'bg-rose-50/70 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">
                Physical Inspection Assessment Report
              </span>
              <h3 className="text-2xl font-bold font-serif">
                {submittedReport.craft.name}
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Seller: {submittedReport.data.sellerName} • Price: ₹{submittedReport.data.claimedPrice}
              </p>
            </div>

            <div className="text-right">
              <span className="text-3xl font-black block">
                {submittedReport.score}%
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  submittedReport.isAuthentic ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}
              >
                {submittedReport.isAuthentic ? 'Physical Criteria Passed' : 'Counterfeit Risk'}
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Inspection Audit Breakdown:
            </h4>
            <ul className="space-y-1.5 text-xs">
              {submittedReport.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200/80 flex justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={onNavigateToStudio}
            >
              Cross-Verify with Computer Vision in Studio →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
