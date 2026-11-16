import { getCraftById } from '../data/odopCrafts';

/**
 * AI-Based Handicraft Authenticity Comparator Engine
 *
 * Simulates a computer vision & feature-matching pipeline designed for ODOP verification:
 * 1. Surface Texture & Weave Analysis (35% weight)
 * 2. Heritage Motif Geometry Adherence (25% weight)
 * 3. Chromatic Spectrum & Natural Dye Signature (20% weight)
 * 4. ODOP & GI Registry Cross-Reference (20% weight)
 *
 * Demonstrates:
 * - Pure functional design
 * - Weighted mathematical aggregations using reduce
 * - Comprehensive diagnostic generation
 * - Explainable AI output for viva presentation
 */

// Generate unique verification certificate ID
export const generateCertificateId = (craftId) => {
  const prefix = "PRM";
  const year = new Date().getFullYear();
  const randomPart = Math.floor(10000 + Math.random() * 90000);
  const craftCode = (craftId || "CRAFT").substring(0, 3).toUpperCase();
  return `${prefix}-${craftCode}-${year}-${randomPart}`;
};

/**
 * Run verification comparison on image & craft metadata
 * @param {Object} input - { image, craftId, claimedDistrict, giTagInput, sampleData }
 * @returns {Promise<Object>} Verification Analysis Report
 */
export const runAiVerification = async (input) => {
  const { image, craftId, claimedDistrict, giTagInput, sampleData } = input;
  const craft = getCraftById(craftId);

  if (!craft) {
    throw new Error(`Craft with ID "${craftId}" not found in ODOP registry.`);
  }

  // If user ran a pre-calibrated sample test case with ground truth, use its authentic parameters with simulated variance
  if (sampleData && sampleData.groundTruth) {
    return simulatePreCalibratedVerification(craft, sampleData, giTagInput);
  }

  // Otherwise, run dynamic heuristic analysis on user's custom uploaded handicraft image
  return analyzeCustomHandicraft(craft, { image, claimedDistrict, giTagInput });
};

/**
 * Evaluates pre-calibrated sample test cases
 */
const simulatePreCalibratedVerification = (craft, sample, giTagInput) => {
  const { groundTruth, isAuthentic, claimedPrice } = sample;

  // Check if user entered a custom GI tag that matches or fails
  let giScore = groundTruth.giRegistryScore;
  let giStatusNotes = [];

  if (giTagInput && giTagInput.trim() !== '') {
    const isTagMatching = giTagInput.toLowerCase().includes(craft.id.substring(0, 2)) ||
                          giTagInput.includes(craft.giNumber.split('-')[2]);
    if (isTagMatching) {
      giScore = Math.min(100, giScore + 5);
      giStatusNotes.push(`Entered GI code matches registered pattern for ${craft.district}.`);
    } else {
      giScore = Math.max(15, giScore - 20);
      giStatusNotes.push(`Entered GI code does not match ${craft.name} registry sequence.`);
    }
  }

  const overallScore = Math.round(
    (groundTruth.weaveIntegrityScore * 0.35) +
    (groundTruth.motifGeometryScore * 0.25) +
    (groundTruth.chromaticSpectrumScore * 0.20) +
    (giScore * 0.20)
  );

  const status = determineStatus(overallScore);

  return {
    verificationId: generateCertificateId(craft.id),
    timestamp: new Date().toISOString(),
    craft: { ...craft },
    isAuthentic,
    scores: {
      overall: overallScore,
      weaveIntegrity: groundTruth.weaveIntegrityScore,
      motifGeometry: groundTruth.motifGeometryScore,
      chromaticSpectrum: groundTruth.chromaticSpectrumScore,
      giRegistry: giScore
    },
    status,
    verdict: groundTruth.verdict,
    keyFindings: groundTruth.keyFindings,
    giMetadata: {
      officialGiNumber: craft.giNumber,
      giClass: craft.giClass,
      registeredDistrict: craft.district,
      state: craft.state,
      artisanGuild: craft.artisanGuild,
      registeredYear: craft.registeredYear,
      hologramValid: isAuthentic,
      registryStatus: isAuthentic ? "Active & Verified" : "Unverified / Non-Compliant"
    },
    comparisonPoints: generateComparisonPoints(craft, isAuthentic),
    inspectionBadges: generateInspectionBadges(craft, isAuthentic, overallScore),
    recommendations: generateBuyerGuidance(craft, isAuthentic)
  };
};

/**
 * Dynamic analysis for custom uploaded user images
 */
const analyzeCustomHandicraft = (craft, { claimedDistrict, giTagInput }) => {
  // Check if claimed district matches official ODOP district
  const districtMatched = claimedDistrict
    ? craft.district.toLowerCase().includes(claimedDistrict.toLowerCase()) ||
      claimedDistrict.toLowerCase().includes(craft.district.toLowerCase())
    : true;

  // GI Tag check
  const giValid = giTagInput
    ? /^GI-[A-Z]{2}-\d{4}/i.test(giTagInput)
    : false;

  // Realistic feature simulation
  const weaveScore = districtMatched ? 88 + Math.floor(Math.random() * 8) : 55;
  const motifScore = 86 + Math.floor(Math.random() * 9);
  const dyeScore = 85 + Math.floor(Math.random() * 10);
  const giScore = giValid ? 92 : (districtMatched ? 75 : 40);

  const overallScore = Math.round(
    (weaveScore * 0.35) +
    (motifScore * 0.25) +
    (dyeScore * 0.20) +
    (giScore * 0.20)
  );

  const isAuthentic = overallScore >= 70;
  const status = determineStatus(overallScore);

  const findings = [
    `Micro-structure texture analysis exhibits characteristic ${craft.keyIndicators[0].name.toLowerCase()} properties.`,
    `Visual motifs align with traditional ${craft.district} heritage iconography (${craft.keyIndicators[2].expected.slice(0, 45)}...).`,
    `Spectral saturation levels are consistent with traditional mineral/vegetable dyeing techniques.`,
    districtMatched
      ? `Geographical origin aligned with official ODOP district: ${craft.district}, ${craft.state}.`
      : `Geographical mismatch: Claimed origin differs from verified ODOP district (${craft.district}).`
  ];

  return {
    verificationId: generateCertificateId(craft.id),
    timestamp: new Date().toISOString(),
    craft: { ...craft },
    isAuthentic,
    scores: {
      overall: overallScore,
      weaveIntegrity: weaveScore,
      motifGeometry: motifScore,
      chromaticSpectrum: dyeScore,
      giRegistry: giScore
    },
    status,
    verdict: isAuthentic
      ? `Verified Genuine: High Consistency with ${craft.name} ODOP Reference Standards`
      : `Warning: Anomalies Detected Against Official ${craft.name} Reference Specs`,
    keyFindings: findings,
    giMetadata: {
      officialGiNumber: craft.giNumber,
      giClass: craft.giClass,
      registeredDistrict: craft.district,
      state: craft.state,
      artisanGuild: craft.artisanGuild,
      registeredYear: craft.registeredYear,
      hologramValid: giValid,
      registryStatus: isAuthentic ? "Active & Authenticated" : "Requires Physical Verification"
    },
    comparisonPoints: generateComparisonPoints(craft, isAuthentic),
    inspectionBadges: generateInspectionBadges(craft, isAuthentic, overallScore),
    recommendations: generateBuyerGuidance(craft, isAuthentic)
  };
};

/**
 * Status categorization
 */
const determineStatus = (score) => {
  if (score >= 85) {
    return {
      code: "AUTHENTIC_ODOP",
      label: "Authentic ODOP Product",
      badgeColor: "emerald",
      bgClass: "bg-emerald-50 text-emerald-800 border-emerald-300",
      description: "Sample exhibits authentic artisan handcraft indicators and complies with official GI specifications."
    };
  }
  if (score >= 65) {
    return {
      code: "PROBABLE_GENUINE",
      label: "Probable Genuine Handcraft",
      badgeColor: "amber",
      bgClass: "bg-amber-50 text-amber-800 border-amber-300",
      description: "Visual features show good handcraft markers, but secondary physical tests are advised for complete certification."
    };
  }
  return {
    code: "COUNTERFEIT_RISK",
    label: "Counterfeit Risk Detected",
    badgeColor: "rose",
    bgClass: "bg-rose-50 text-rose-800 border-rose-300",
    description: "Sample exhibits machine-made uniformities, synthetic fiber signatures, or invalid GI credentials."
  };
};

/**
 * Generate side-by-side comparison features
 */
const generateComparisonPoints = (craft, isAuthentic) => {
  return [
    {
      feature: "Fiber & Surface Matrix",
      masterReference: craft.keyIndicators[0].expected,
      sampleObserved: isAuthentic
        ? "Micro-organic weave with irregular artisan tension and expected low-micron diameter."
        : "Rigid mechanical spacing typical of commercial high-speed machine production.",
      match: isAuthentic
    },
    {
      feature: "Motif & Detailing",
      masterReference: craft.keyIndicators[2].expected,
      sampleObserved: isAuthentic
        ? "Traditional hand-guided curvature and organic lines matching heritage stencil archives."
        : "Standardized vector-like sharp repeats lacking artisan hand-drawn micro-variations.",
      match: isAuthentic
    },
    {
      feature: "Dye & Color Depth",
      masterReference: craft.keyIndicators[3].expected,
      sampleObserved: isAuthentic
        ? "Natural non-uniform dye absorption with soft matte lustre and zero synthetic glare."
        : "Uniform chemical azo coating with synthetic gloss sheen.",
      match: isAuthentic
    },
    {
      feature: "GI Registry Record",
      masterReference: `${craft.giNumber} (${craft.district}, ${craft.state})`,
      sampleObserved: isAuthentic
        ? `Compliant with ${craft.artisanGuild} registered artisan standards.`
        : "Unregistered batch code or mismatched regional manufacturing indicators.",
      match: isAuthentic
    }
  ];
};

/**
 * Inspection badges for rapid visual feedback
 */
const generateInspectionBadges = (craft, isAuthentic, score) => {
  if (isAuthentic) {
    return [
      { label: "Handloom / Handcrafted", status: "pass", detail: "Organic weave irregularities verified" },
      { label: "Natural Dye Spectrum", status: "pass", detail: "Vegetal/mineral absorption profile" },
      { label: "GI Territory Match", status: "pass", detail: `${craft.district}, ${craft.state}` },
      { label: "Heritage Motif Fidelity", status: "pass", detail: "Registered cultural motifs detected" }
    ];
  }

  return [
    { label: "Machine Weave Detected", status: "fail", detail: "Excessive mechanical uniformity" },
    { label: "Synthetic Dye Marker", status: "fail", detail: "Azo chemical dye signature detected" },
    { label: "GI Authenticity Gap", status: "warning", detail: "Missing or unverified GI serial tracking" },
    { label: "Motif Anomaly", status: "warning", detail: "Digitally replicated border motifs" }
  ];
};

/**
 * Practical tests for consumers
 */
const generateBuyerGuidance = (craft, isAuthentic) => {
  return {
    tests: craft.buyerPhysicalTests,
    advisory: isAuthentic
      ? `This product demonstrates high visual fidelity with authentic ${craft.name}. Always request a physical GI Hologram tag and Silk/Craft Mark from the artisan society.`
      : `Warning: This product shows significant markers of industrial imitation. Do not pay authentic handcraft premiums without requesting the artisan's GI registration certificate.`
  };
};
