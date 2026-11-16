import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { ODOP_CRAFTS } from '../../data/odopCrafts';
import { SAMPLE_UPLOADS } from '../../data/sampleUploads';
import { Button } from '../../components/common/Button';
import { craftUploadSchema } from '../../schemas/verificationSchema';

/**
 * ImageUploader Component
 * Demonstrates Unit IV: Form controls, Zod schema validation, drag-and-drop event handling
 * Demonstrates Unit III: File preview object URL cleanup with useEffect
 */
export const ImageUploader = ({ onStartVerification, isScanning }) => {
  const [selectedCraftId, setSelectedCraftId] = useState(ODOP_CRAFTS[0].id);
  const [claimedDistrict, setClaimedDistrict] = useState('');
  const [giTagInput, setGiTagInput] = useState('');
  const [previewImage, setPreviewImage] = useState(SAMPLE_UPLOADS[0].imageUrl);
  const [activeSampleId, setActiveSampleId] = useState(SAMPLE_UPLOADS[0].id);
  const [validationErrors, setValidationErrors] = useState({});
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);
  const createdBlobUrlRef = useRef(null);

  // Clean up any generated blob URLs when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (createdBlobUrlRef.current) {
        URL.revokeObjectURL(createdBlobUrlRef.current);
      }
    };
  }, []);

  // Set active craft details when craft selection changes
  const handleCraftChange = (e) => {
    const newCraftId = e.target.value;
    setSelectedCraftId(newCraftId);
    const craft = ODOP_CRAFTS.find(c => c.id === newCraftId);
    if (craft) {
      setClaimedDistrict(craft.district);
    }
    setActiveSampleId(null);
  };

  // Select a pre-calibrated sample
  const handleSelectSample = (sample) => {
    setActiveSampleId(sample.id);
    setSelectedCraftId(sample.craftId);
    setPreviewImage(sample.imageUrl);
    setClaimedDistrict(sample.district.split(',')[0]);
    setGiTagInput(sample.giTagCode || '');
    setValidationErrors({});

    if (createdBlobUrlRef.current) {
      URL.revokeObjectURL(createdBlobUrlRef.current);
      createdBlobUrlRef.current = null;
    }
  };

  // Handle local file upload
  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setValidationErrors({ image: ['Please upload a valid image file (JPEG, PNG, WEBP)'] });
      return;
    }

    if (createdBlobUrlRef.current) {
      URL.revokeObjectURL(createdBlobUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    createdBlobUrlRef.current = objectUrl;
    setPreviewImage(objectUrl);
    setActiveSampleId(null);
    setValidationErrors({});
  };

  // Drag and drop event handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Form submission with Zod validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate using Zod schema
    const validation = craftUploadSchema.safeParse({
      craftId: selectedCraftId,
      claimedDistrict: claimedDistrict.trim(),
      giTagInput: giTagInput.trim()
    });

    if (!validation.success) {
      const flattened = validation.error.flatten().fieldErrors;
      setValidationErrors(flattened);
      return;
    }

    setValidationErrors({});

    // Find if we are testing a calibrated sample
    const sampleData = SAMPLE_UPLOADS.find(s => s.id === activeSampleId);

    onStartVerification({
      image: previewImage,
      craftId: selectedCraftId,
      claimedDistrict: claimedDistrict.trim(),
      giTagInput: giTagInput.trim(),
      sampleData
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8">
      {/* Sample Quick Selector Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            Quick Test Specimens (Viva & Evaluation Samples):
          </label>
          <span className="text-xs text-stone-600">Click to instantly load</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SAMPLE_UPLOADS.map((sample) => {
            const isSelected = activeSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className={`flex flex-col text-left p-2 rounded-xl border text-xs transition-all duration-150 ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/80 ring-2 ring-orange-400/40 shadow-xs'
                    : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/70 hover:border-stone-300'
                }`}
              >
                <div className="relative w-full h-16 rounded-lg overflow-hidden mb-1.5 bg-stone-200">
                  <img
                    src={sample.thumbnail}
                    alt={sample.title}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-1 right-1 text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      sample.isAuthentic
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {sample.isAuthentic ? 'Genuine' : 'Fake'}
                  </span>
                </div>
                <span className="font-semibold text-stone-900 truncate w-full">
                  {sample.craftName}
                </span>
                <span className="text-[10px] text-stone-500 truncate w-full">
                  {sample.isAuthentic ? 'GI Handloom' : 'Industrial Copy'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image Dropzone & Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex-1 min-h-[300px] rounded-2xl border-2 border-dashed p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-orange-500 bg-orange-50/60 scale-[1.01]'
                  : previewImage
                  ? 'border-stone-300 bg-stone-900/5 hover:border-orange-400'
                  : 'border-stone-300 bg-stone-50 hover:bg-stone-100 hover:border-stone-400'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files?.[0])}
                className="hidden"
              />

              {previewImage ? (
                <div className="relative w-full h-full min-h-[280px] rounded-xl overflow-hidden group">
                  <img
                    src={previewImage}
                    alt="Handicraft Preview"
                    className="w-full h-full object-cover max-h-[360px]"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                    <RefreshCw className="w-4 h-4" />
                    <span>Click or Drag to Change Image</span>
                  </div>
                  {activeSampleId && (
                    <div className="absolute bottom-2 left-2 right-2 bg-stone-900/85 backdrop-blur-xs text-white text-xs p-2 rounded-lg">
                      <span className="font-bold text-amber-300">Test Specimen Loaded: </span>
                      <span>{SAMPLE_UPLOADS.find(s => s.id === activeSampleId)?.title}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">
                    Upload Handicraft Specimen Image
                  </h4>
                  <p className="text-xs text-stone-500 mb-4 max-w-xs">
                    Drag and drop your close-up photo (Pashmina weave, Banarasi brocade, Blue Pottery, Madhubani lines)
                  </p>
                  <span className="inline-block px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs font-semibold text-stone-700 shadow-xs">
                    Browse Local Photo
                  </span>
                </div>
              )}
            </div>

            {validationErrors.image && (
              <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.image[0]}
              </p>
            )}
          </div>

          {/* Right Column: Craft Details & Metadata Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Craft Selection Dropdown */}
              <div>
                <label
                  htmlFor="craft-select"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Select ODOP Craft Category <span className="text-orange-600">*</span>
                </label>
                <select
                  id="craft-select"
                  value={selectedCraftId}
                  onChange={handleCraftChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-xs"
                >
                  {ODOP_CRAFTS.map((craft) => (
                    <option key={craft.id} value={craft.id}>
                      {craft.name} — {craft.district}, {craft.state} ({craft.giNumber})
                    </option>
                  ))}
                </select>
                {validationErrors.craftId && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    {validationErrors.craftId[0]}
                  </p>
                )}
              </div>

              {/* District & State Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="claimed-district"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
                  >
                    Claimed District / Town
                  </label>
                  <input
                    id="claimed-district"
                    type="text"
                    value={claimedDistrict}
                    onChange={(e) => setClaimedDistrict(e.target.value)}
                    placeholder="e.g. Srinagar, Varanasi, Jaipur"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {validationErrors.claimedDistrict && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      {validationErrors.claimedDistrict[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="gi-tag-input"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
                  >
                    GI Tag Hologram Code (Optional)
                  </label>
                  <input
                    id="gi-tag-input"
                    type="text"
                    value={giTagInput}
                    onChange={(e) => setGiTagInput(e.target.value)}
                    placeholder="e.g. GI-JK-0046-8821"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {validationErrors.giTagInput && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      {validationErrors.giTagInput[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Verified Reference Markers Box */}
              {selectedCraftId && (
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                      Verified Reference Markers to be Inspected:
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-amber-950">
                    <div className="bg-white/80 p-2 rounded-lg border border-amber-200/60">
                      <span className="font-semibold block text-stone-600">Surface Texture:</span>
                      <span className="truncate block">
                        {ODOP_CRAFTS.find(c => c.id === selectedCraftId)?.keyIndicators[0].name}
                      </span>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg border border-amber-200/60">
                      <span className="font-semibold block text-stone-600">Motif Geometry:</span>
                      <span className="truncate block">
                        {ODOP_CRAFTS.find(c => c.id === selectedCraftId)?.keyIndicators[2].name}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                <span className="font-semibold text-stone-700">4-Stage Pipeline:</span> Surface Matrix • Motif Geometry • Dye Spectrum • GI Registry
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isScanning}
                disabled={!previewImage}
                className="w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Verify Authenticity with AI</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
