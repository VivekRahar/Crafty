/**
 * Sample Test Cases for Verification Studio
 *
 * Demonstrates:
 * - Real-world authentic ODOP specimens vs synthetic/counterfeit imitations
 * - Pre-configured visual feature parameters for explainable AI evaluation
 * - Helps students easily demonstrate the system in a college viva without searching for images
 */

export const SAMPLE_UPLOADS = [
  {
    id: "sample-pashmina-authentic",
    title: "Authentic Kashmir Pashmina Shawl",
    craftId: "pashmina-kashmir",
    craftName: "Kashmiri Pashmina",
    district: "Srinagar, Jammu & Kashmir",
    isAuthentic: true,
    thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
    claimedPrice: 22000,
    giTagCode: "GI-JK-0046-8821",
    artisanGuild: "Tahafuz Artisan Society",
    testNotes: "Registered handloom Pashmina from downtown Srinagar with classic Chashm-e-Bulbul diamond twill.",
    groundTruth: {
      overallScore: 96,
      weaveIntegrityScore: 98,
      motifGeometryScore: 95,
      chromaticSpectrumScore: 94,
      giRegistryScore: 98,
      status: "AUTHENTIC_ODOP",
      verdict: "High-Confidence Authentic Kashmiri Pashmina (GI Tag Verified)",
      keyFindings: [
        "Diamond twill (Chashm-e-Bulbul) weave detected with handloom yarn count variation",
        "Micro-fiber fineness conforms to 13.8 micron Changthangi cashmere standard",
        "Natural vegetal dye absorption curve with organic chromic gradient",
        "GI Hologram ID GI-JK-0046-8821 verified in Srinagar District Registry"
      ]
    }
  },
  {
    id: "sample-pashmina-fake",
    title: "Powerloom Acrylic 'Pashmina' Imitation",
    craftId: "pashmina-kashmir",
    craftName: "Kashmiri Pashmina",
    district: "Claimed Srinagar (Manufactured Surat)",
    isAuthentic: false,
    thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    claimedPrice: 1499,
    giTagCode: "FAKE-NO-GI-TAG",
    artisanGuild: "Generic Commercial Trader",
    testNotes: "Sold online as '100% Pure Kashmiri Pashmina' at ₹1,499 with no GI certification.",
    groundTruth: {
      overallScore: 24,
      weaveIntegrityScore: 18,
      motifGeometryScore: 32,
      chromaticSpectrumScore: 22,
      giRegistryScore: 10,
      status: "COUNTERFEIT_RISK",
      verdict: "Counterfeit Alert: High Likelihood of Synthetic Acrylic Machine Weave",
      keyFindings: [
        "Unnaturally rigid warp-weft alignment characteristic of industrial powerlooms",
        "Extruded synthetic fiber diameter estimated > 24 microns (acrylic polymer)",
        "Flat chemical azo dye signature with zero natural vegetable dye bleed",
        "Invalid / absent GI serial registration number"
      ]
    }
  },
  {
    id: "sample-banarasi-authentic",
    title: "Authentic Varanasi Katan Silk Brocade",
    craftId: "banarasi-brocade",
    craftName: "Banarasi Brocade & Silk",
    district: "Varanasi, Uttar Pradesh",
    isAuthentic: true,
    thumbnail: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    claimedPrice: 38500,
    giTagCode: "GI-UP-0099-4102",
    artisanGuild: "Banaras Bunkar Samiti",
    testNotes: "Traditional Kadhwa weave with real silver kalabattun zari and floral jaal.",
    groundTruth: {
      overallScore: 94,
      weaveIntegrityScore: 95,
      motifGeometryScore: 93,
      chromaticSpectrumScore: 92,
      giRegistryScore: 97,
      status: "AUTHENTIC_ODOP",
      verdict: "Authentic Handloom Banarasi Brocade (GI Certified)",
      keyFindings: [
        "Kadhwa hand-interlocking extra-weft floats verified on reverse inspection",
        "Pure silver-core bullion zari reflectance verified under chromatic illumination",
        "Traditional Kalka (Paisley) and Beldar foliage geometry matching Varanasi archives",
        "GI Hologram ID GI-UP-0099-4102 active in UP ODOP Registry"
      ]
    }
  },
  {
    id: "sample-banarasi-fake",
    title: "Synthetic Polyester Jacquard Banarasi Copy",
    craftId: "banarasi-brocade",
    craftName: "Banarasi Brocade & Silk",
    district: "Claimed Varanasi (Synthetic Mill Fabric)",
    isAuthentic: false,
    thumbnail: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
    claimedPrice: 2200,
    giTagCode: "BNR-PROMO-FAKE",
    artisanGuild: "Unregistered Wholesale Mill",
    testNotes: "Machine-woven plastic lurex sari marketed with a fake printed 'Varanasi Silk' sticker.",
    groundTruth: {
      overallScore: 31,
      weaveIntegrityScore: 28,
      motifGeometryScore: 40,
      chromaticSpectrumScore: 25,
      giRegistryScore: 15,
      status: "COUNTERFEIT_RISK",
      verdict: "Counterfeit Alert: Machine Jacquard with Synthetic Polyester Lurex",
      keyFindings: [
        "Back of fabric shows continuous mechanical thread floats without hand clipping",
        "Metallic threads are plastic polyester foil (lurex) rather than silver kalabattun",
        "Digital pixel-mapped floral borders lacking artisan jala irregularity",
        "Registration code fails GI database validation format"
      ]
    }
  },
  {
    id: "sample-bluepottery-authentic",
    title: "Jaipur Traditional Blue Pottery Floral Vase",
    craftId: "jaipur-blue-pottery",
    craftName: "Jaipur Blue Pottery",
    district: "Jaipur, Rajasthan",
    isAuthentic: true,
    thumbnail: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
    imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
    claimedPrice: 3200,
    giTagCode: "GI-RJ-0002-1205",
    artisanGuild: "Jaipur Blue Pottery Craft Guild",
    testNotes: "Authentic clay-free quartz paste vase with cobalt blue oxide and natural glass frit glaze.",
    groundTruth: {
      overallScore: 93,
      weaveIntegrityScore: 91,
      motifGeometryScore: 94,
      chromaticSpectrumScore: 96,
      giRegistryScore: 94,
      status: "AUTHENTIC_ODOP",
      verdict: "Authentic Jaipur Blue Pottery (GI Tag Verified)",
      keyFindings: [
        "Granular quartz crystal composition detected; absence of red/white terracotta clay",
        "Natural cobalt oxide and copper turquoise chromatic signatures with organic pooling",
        "Fine micro-crazing crackle pattern in low-temperature glass frit glaze layer",
        "Freehand squirrel-hair brushstrokes detected with micro line-thickness variance"
      ]
    }
  },
  {
    id: "sample-madhubani-authentic",
    title: "Original Mithila Madhubani on Handmade Paper",
    craftId: "madhubani-painting",
    craftName: "Madhubani Painting (Mithila)",
    district: "Madhubani, Bihar",
    isAuthentic: true,
    thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    claimedPrice: 7500,
    giTagCode: "GI-BR-0074-9021",
    artisanGuild: "Mithila Hastshilp Samiti",
    testNotes: "Hand-drawn with bamboo nib using soot lampblack, madder red, and turmeric yellow.",
    groundTruth: {
      overallScore: 95,
      weaveIntegrityScore: 94,
      motifGeometryScore: 96,
      chromaticSpectrumScore: 97,
      giRegistryScore: 95,
      status: "AUTHENTIC_ODOP",
      verdict: "Authentic Mithila Folk Art (GI Registered)",
      keyFindings: [
        "Double-outline bamboo nib line work with organic capillary ink pools",
        "Zero empty space composition (Horror Vacui) with traditional floral fillers",
        "Natural vegetal pigment absorption into cow-dung washed handmade cotton rag paper",
        "GI Registry matches approved Mithila Artisan cluster"
      ]
    }
  }
];
