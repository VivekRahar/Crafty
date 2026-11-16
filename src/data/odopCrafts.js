/**
 * ODOP & GI Verified Handicrafts Registry Dataset
 *
 * Demonstrates:
 * - Block-scoped variables using const
 * - Object data structures with deep nested metadata
 * - ES Module export
 * - Functional array helpers compatibility
 */

export const ODOP_CRAFTS = [
  {
    id: "pashmina-kashmir",
    name: "Kashmiri Pashmina",
    vernacularName: "कश्मीरी पश्मीना / پشمینہ",
    category: "Textiles",
    district: "Srinagar",
    state: "Jammu & Kashmir",
    giNumber: "GI-IN-0046",
    giClass: "Class 24 (Textiles and Textile Goods)",
    registeredYear: 2005,
    artisanGuild: "Tahafuz Artisan Society & Crafts Development Institute Srinagar",
    description: "Hand-spun and hand-woven luxury fabric derived from the fine undercoat of Changthangi goats (Capra hircus). Celebrated for its warmth, microscopic fiber fineness (12-16 microns), and traditional diamond-shaped twill weave known as 'Chashm-e-Bulbul'.",
    heroImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    macroTextureImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
    keyIndicators: [
      {
        name: "Fiber Fineness",
        expected: "12 to 16 microns (hair-like microscopic lightness)",
        technique: "Hand-carding & Charkha spinning"
      },
      {
        name: "Weave Structure",
        expected: "Chashm-e-Bulbul (Bird's Eye / Diamond twill) or plain weave with irregular organic warp-weft tension",
        technique: "Traditional Kashmiri Wooden Handloom"
      },
      {
        name: "Motif Style",
        expected: "Chinar leaf, Paisley (Badam), Floral creeper, Cypress pine",
        technique: "Sozni needle embroidery or Kani twill-tapestry"
      },
      {
        name: "Dye Characteristics",
        expected: "Vegetal & natural mineral dyes with subtle soft tonality; no synthetic chemical odor",
        technique: "Traditional vat dyeing by Rangrez"
      }
    ],
    counterfeitAlerts: [
      "Powerloom synthetic acrylic or polyester blends pretending to be Pashmina",
      "Perfect, rigid mechanical weave without handloom weft variations",
      "Fibers thicker than 19 microns with coarse tickle against skin",
      "Synthetic chemical burnt-plastic odor upon microscopic thread combustion"
    ],
    buyerPhysicalTests: [
      {
        testName: "The Ring Test",
        procedure: "An authentic pure Pashmina shawl smoothly glides through a normal metal finger ring due to extreme micron fineness.",
        significance: "Confirms authentic low-micron fiber fineness."
      },
      {
        testName: "Thread Burn Test",
        procedure: "Burn one stray fringe thread: Authentic Pashmina smells like burnt hair and turns into crumbly ash, while synthetic fibers melt into hard plastic beads.",
        significance: "Differentiates protein fiber from synthetic acrylic."
      },
      {
        testName: "Static Electricity Test",
        procedure: "Rub the shawl vigorously: Authentic animal cashmere builds zero static electricity and will not attract hair or paper bits.",
        significance: "Proves absence of synthetic polyester polymers."
      }
    ],
    giHologramFormat: "GI-JK-0046-XXXX",
    priceRange: "₹8,000 - ₹1,50,000"
  },
  {
    id: "banarasi-brocade",
    name: "Banarasi Brocade & Silk",
    vernacularName: "बनारसी ज़री और रेशम",
    category: "Textiles",
    district: "Varanasi",
    state: "Uttar Pradesh",
    giNumber: "GI-IN-0099",
    giClass: "Class 24 & 25 (Fabrics & Clothing)",
    registeredYear: 2007,
    artisanGuild: "Banaras Bunkar Samiti & Human Welfare Association",
    description: "World-renowned ancient opulent textile craft from Varanasi, crafted on pit looms using pure mulberry silk (Katan), real gold and silver metallic threads (Zari), and complex Jacquard or Naksha jala harnesses. Notable for its dense foliage, jaal, and mina work.",
    heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    macroTextureImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    keyIndicators: [
      {
        name: "Zari Composition",
        expected: "Silver alloy core coated with pure gold; distinctive matte metallic sheen that doesn't tarnish rapidly",
        technique: "Kalabattun spinning on pure silk thread"
      },
      {
        name: "Weave Reverse Side",
        expected: "Floating extra-weft threads (Khaddi / Kadhwa) with hand-clipped floats, or interlocking tapestry mina joints",
        technique: "Phekwa or Kadhwa handloom weaving"
      },
      {
        name: "Signature Motifs",
        expected: "Kalka (Paisley), Shikargah (Hunting scenes), Beldar creepers, Latifa Buti, and Mughal floral bouquets",
        technique: "Naksha Patra graph plotting"
      },
      {
        name: "Fabric Lustre & Fall",
        expected: "Heavy natural drape with crisp dual-tone lustre; no synthetic oily shimmer",
        technique: "Pure Katan degummed mulberry silk"
      }
    ],
    counterfeitAlerts: [
      "Powerloom machine imitation using plastic/polyester metallic lurex instead of real zari",
      "Smooth, uniform computer-stitched backing without hand-clipped floats",
      "Lightweight synthetic art-silk or rayon fabric prone to static cling",
      "Stiff gold foil sticker printing simulating brocade motifs"
    ],
    buyerPhysicalTests: [
      {
        testName: "Reverse Float Inspection",
        procedure: "Check the back of the motifs: Authentic hand-woven Banarasi shows hand-clipped floating threads or individual kadhwa knots.",
        significance: "Powerloom copies have a continuous, sealed web of machine threads."
      },
      {
        testName: "Zari Scratch Test",
        procedure: "Gently scrape a metallic thread with your fingernail: Real zari exposes a silver/white core under gold wrap; counterfeit plastic reveals white plastic filament.",
        significance: "Exposes plastic imitation lurex."
      },
      {
        testName: "Silk Mark & GI Seal Check",
        procedure: "Look for the combined Silk Mark India and GI certified handloom tags sewn with serial tracking.",
        significance: "Statutory government assurance."
      }
    ],
    giHologramFormat: "GI-UP-0099-XXXX",
    priceRange: "₹12,000 - ₹3,00,000"
  },
  {
    id: "jaipur-blue-pottery",
    name: "Jaipur Blue Pottery",
    vernacularName: "जयपुर ब्लू पॉटरी",
    category: "Pottery & Ceramics",
    district: "Jaipur",
    state: "Rajasthan",
    giNumber: "GI-IN-0066",
    giClass: "Class 21 (Household Ceramics)",
    registeredYear: 2006,
    artisanGuild: "Jaipur Blue Pottery Craft Guild & Kripal Kumbh",
    description: "Unique traditional pottery developed under Maharaja Sawai Ram Singh II. Unlike regular pottery, it uses NO CLAY; it is composed of Egyptian paste made of ground quartz stone, Fuller's earth (Multani Mitti), glass frit, katira gum, and natural soda water, fired once at low temperatures.",
    heroImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    macroTextureImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    keyIndicators: [
      {
        name: "Body Material",
        expected: "Clay-free, translucent crystalline quartz dough; pale granular core visible at unglazed base",
        technique: "Open mold press with quartz frit paste"
      },
      {
        name: "Glaze & Palette",
        expected: "Cobalt oxide (royal blue), Copper oxide (turquoise/green), and iron oxide (yellow/brown) under clear glass glaze",
        technique: "Low-heat single firing (800-850°C)"
      },
      {
        name: "Painting Style",
        expected: "Freehand brushwork with subtle brushstroke line variations; Persian rosettes, peacocks, floral vines",
        technique: "Squirrel-hair brush detailing"
      },
      {
        name: "Tactile Texture",
        expected: "Subtle organic surface crazing (fine micro-crackle in glaze) and cool quartz feel to touch",
        technique: "Natural glaze contraction during cooling"
      }
    ],
    counterfeitAlerts: [
      "Standard earthenware/terracotta red or white clay coated with blue spray paint",
      "Decal paper or digital transfer prints with flawless dot matrix patterns",
      "Glossy epoxy or synthetic resin coatings instead of fired glass frit glaze",
      "Heavy clay density that fails to exhibit quartz lightness"
    ],
    buyerPhysicalTests: [
      {
        testName: "Unglazed Base Inspection",
        procedure: "Inspect the bottom rim: Authentic Blue Pottery reveals a grainy, pale-grey or off-white quartz mixture with tiny glass particles, NEVER red or brown clay.",
        significance: "Proves absence of red pottery clay."
      },
      {
        testName: "Cold Touch & Crazing Test",
        procedure: "Touch the surface: Genuine quartz pottery stays naturally cooler than room temperature. Under angled light, fine micro-cracks (crazing) are visible in the glaze.",
        significance: "Identifies traditional low-temperature glass frit glaze."
      },
      {
        testName: "Weight-to-Volume Ratio",
        procedure: "Compare weight: Quartz frit items are noticeably lighter than conventional ceramic or porcelain items of the same size.",
        significance: "Confirms non-clay quartz composition."
      }
    ],
    giHologramFormat: "GI-RJ-0002-XXXX",
    priceRange: "₹450 - ₹25,000"
  },
  {
    id: "madhubani-painting",
    name: "Madhubani Painting (Mithila)",
    vernacularName: "मधुबनी / मिथिला चित्रकला",
    category: "Painting",
    district: "Madhubani",
    state: "Bihar",
    giNumber: "GI-IN-0037",
    giClass: "Class 16 (Paintings and Works of Art)",
    registeredYear: 2005,
    artisanGuild: "Mithila Hastshilp Samiti & All India Handicrafts Board",
    description: "Ancient folk art form practiced by women of Mithila region in Bihar. Characterized by eye-catching geometrical patterns, line drawings with double outlines, fish, lotus, peacock motifs, and complete absence of empty space (filled with birds, flowers, and geometric patterns).",
    heroImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    macroTextureImage: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=800&q=80",
    keyIndicators: [
      {
        name: "Line Work Style",
        expected: "Kachni (fine line hatching) or Bharni (solid color fill) executed with double outlines and cross-hatching",
        technique: "Bamboo twig nibs (kalam) wrapped with raw cotton"
      },
      {
        name: "Pigment Composition",
        expected: "100% natural pigments: Lampblack/kajal (black), turmeric (yellow), indigo (blue), madder (red), bilwa tree juice",
        technique: "Vegetable and mineral extracts mixed with goat milk/gum"
      },
      {
        name: "Substrate Base",
        expected: "Handmade paper treated with cow dung wash (giving pale amber warmth) or pure Tussar/Mulberry silk",
        technique: "Gobar-lipai paper preparation"
      },
      {
        name: "Compositional Density",
        expected: "Horror Vacui (fear of empty space) - every void is adorned with flora, fauna, and geometric filler lines",
        technique: "Traditional Mithila folk iconography"
      }
    ],
    counterfeitAlerts: [
      "Digital screen-printed or offset-printed posters sold as original paintings",
      "Synthetic chemical poster colors or acrylics showing plastic shine",
      "Single-line computer vectors with mechanical thickness and no ink flow pooling",
      "Standard bleached white factory paper lacking natural texture and fiber pulp"
    ],
    buyerPhysicalTests: [
      {
        testName: "Nib Pressure & Ink Flow Check",
        procedure: "Use a magnifying glass to inspect lines: Authentic paintings show micro-variations where the bamboo nib dipped in ink deposited small pools and slight irregularities.",
        significance: "Differentiates hand-drawn bamboo lines from digital laser prints."
      },
      {
        testName: "Water Droplet Natural Pigment Test",
        procedure: "Moisten a cotton swab and touch a tiny corner dot of color: Natural turmeric/indigo will lightly tint the swab, whereas synthetic waterproof ink remains inert.",
        significance: "Confirms non-synthetic natural vegetal dyes."
      },
      {
        testName: "Paper Fiber Texture",
        procedure: "Hold paper against backlight: Authentic handmade paper displays scattered raw plant fibers and uneven pulp density.",
        significance: "Identifies traditional handmade substrate."
      }
    ],
    giHologramFormat: "GI-BR-0074-XXXX",
    priceRange: "₹1,200 - ₹85,000"
  },
  {
    id: "channapatna-toys",
    name: "Channapatna Wooden Toys",
    vernacularName: "ಚನ್ನಪಟ್ಟಣದ ಗೊಂಬೆಗಳು / चन्नापटन खिलौने",
    category: "Woodcraft",
    district: "Ramanagara",
    state: "Karnataka",
    giNumber: "GI-IN-0023",
    giClass: "Class 28 (Toys & Games)",
    registeredYear: 2005,
    artisanGuild: "Channapatna Craft Park & Karnataka State Handicrafts Development Corp",
    description: "Traditional turned-wood craft originating from Tipu Sultan's era, earned Channapatna the title 'Gombegala Ooru' (Town of Toys). Made exclusively from sustainably sourced Wrightia tinctoria (Aale mara / Ivory Wood) and colored with 100% non-toxic vegetable dyes and lac.",
    heroImage: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80",
    macroTextureImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    keyIndicators: [
      {
        name: "Wood Type",
        expected: "Wrightia tinctoria (Ivory Wood / Aale mara) - soft, fine-grained, splinter-free, pale cream timber",
        technique: "Seasoned natural lathe-turning"
      },
      {
        name: "Coloring Agent",
        expected: "Natural lacquer pigmented with turmeric (yellow), indigo (blue), katha (brown), and kumkum (red)",
        technique: "Friction-heat lacquer application on lathe"
      },
      {
        name: "Polishing & Finish",
        expected: "Glass-like high buff shine achieved naturally without artificial varnish; completely child-safe and edible-grade non-toxic",
        technique: "Talipot palm leaf (screwworm leaf) dry burnishing"
      },
      {
        name: "Safety & Edges",
        expected: "Zero sharp edges; all contours turned smooth with radiused fillets",
        technique: "Hand-lathe gouge chisel rounding"
      }
    ],
    counterfeitAlerts: [
      "Plastic toys painted with high-gloss chemical paint",
      "Toxic lead-based chemical oil paints or spray enamels applied to cheap pine wood",
      "Splintering rough wood or MDF/plywood cores with glued joints",
      "Unpolished rough edges showing machine CNC circular step marks"
    ],
    buyerPhysicalTests: [
      {
        testName: "Non-Toxic Saliva / Scratch Test",
        procedure: "Rub the colorful surface with a damp white tissue: The natural lac-dyed surface does not bleed color and possesses a subtle organic shellac fragrance.",
        significance: "Confirms non-toxic natural lacquer vs chemical paint."
      },
      {
        testName: "Wood Grain & Lathe Centering Mark",
        procedure: "Check the top and bottom center: Genuine Channapatna toys show subtle center dimples where the wood was gripped on the lathe.",
        significance: "Proves artisan lathe-turned authenticity."
      },
      {
        testName: "Sound & Drop Resonance",
        procedure: "Gently tap two pieces together: Solid ivory wood produces a resonant, solid woody 'clack' rather than a hollow plastic rattle.",
        significance: "Differentiates solid turned wood from hollow molded plastic."
      }
    ],
    giHologramFormat: "GI-KA-0003-XXXX",
    priceRange: "₹300 - ₹12,000"
  },
  {
    id: "kancheepuram-silk",
    name: "Kancheepuram Silk Sari",
    vernacularName: "காஞ்சிபுரம் பட்டு / कांचीपुरम रेशम",
    category: "Textiles",
    district: "Kanchipuram",
    state: "Tamil Nadu",
    giNumber: "GI-IN-0015",
    giClass: "Class 24 & 25 (Silk Textiles)",
    registeredYear: 2004,
    artisanGuild: "Kancheepuram Weavers Cooperative Society",
    description: "Renowned as the queen of South Indian handlooms, woven with three-ply heavy mulberry silk twisted with silver/gold zari. Distinguished by its heavy weight, contrast borders attached using the intricate Korvai interlocking technique, and temple gopuram motifs.",
    heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    macroTextureImage: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
    keyIndicators: [
      {
        name: "Korvai Interlocking Joint",
        expected: "Jagged tooth or stepped interlocking line joining border and body, requiring two weavers at the pit loom",
        technique: "Three-shuttle Korvai hand-weaving"
      },
      {
        name: "Silk Ply & Weight",
        expected: "Heavy gauge fabric woven from 3-ply twisted mulberry silk threads (Murukku pattu), weighing 600g to 1000g+",
        technique: "High-density reed count (warp/weft)"
      },
      {
        name: "Zari Certification",
        expected: "Traditional zari contains 57% silver and 0.6% pure gold over a silk core (Brahmin Zari standard)",
        technique: "Electroplated pure bullion zari"
      },
      {
        name: "Pallu Connection (Petni)",
        expected: "Distinct zigzag interlocking joint where the pallu is woven separately and integrated into the body",
        technique: "Petni handloom interweaving"
      }
    ],
    counterfeitAlerts: [
      "Single-shuttle powerloom saris where border and body colors are printed rather than hand-interlocked",
      "Synthetic art-silk weighing less than 400 grams",
      "Plastic metallic foil threads imitating pure gold zari",
      "Printed temple triangular borders lacking genuine woven korvai ridge"
    ],
    buyerPhysicalTests: [
      {
        testName: "Korvai Ridge Inspection",
        procedure: "Feel the boundary between the sari body and the contrast border: A genuine Kancheepuram has a noticeable tactile ridge where the three shuttles interlocked.",
        significance: "Handloom Korvai technique cannot be replicated by single-shuttle powerlooms."
      },
      {
        testName: "Zari Red Core Burn Test",
        procedure: "Tease out a microscopic zari thread: Authentic gold zari will reveal a reddish-yellow pure silk thread inside when gently separated.",
        significance: "Powerloom fake zari uses white polyester filament cores."
      },
      {
        testName: "Overall Weight Verification",
        procedure: "Weigh the sari on a kitchen scale: An authentic bridal Kanchipuram weighs between 650 grams to 1.2 kg due to heavy three-ply twisted silk and silver.",
        significance: "Detects lightweight polyester and synthetic imitation."
      }
    ],
    giHologramFormat: "GI-TN-0026-XXXX",
    priceRange: "₹15,000 - ₹2,80,000"
  },
  {
    id: "bastar-dhokra",
    name: "Bastar Dhokra Bell Metal",
    vernacularName: "बस्तर ढोकरा कला",
    category: "Metalware",
    district: "Bastar",
    state: "Chhattisgarh",
    giNumber: "GI-IN-0083",
    giClass: "Class 14 & 21 (Metal Artefacts)",
    registeredYear: 2007,
    artisanGuild: "Ghadwa Artisan Federation & Bastar Shilp Samiti",
    description: "Ancient lost-wax hollow casting technique (cire perdue) practiced for over 4,000 years since the Mohenjo-daro Dancing Girl. Tribal artisans of Bastar hand-mold beeswax filaments into organic animal figures, tribal deities, and lamps before casting in bell metal alloy.",
    heroImage: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    macroTextureImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
    keyIndicators: [
      {
        name: "Filament Wire Detailing",
        expected: "Organic, hand-coiled wire-like textures covering the surface with subtle hand-pressed variations",
        technique: "Beeswax & resin (Jhuna) hand-extrusion"
      },
      {
        name: "Metal Alloy Composition",
        expected: "Traditional bell metal (Kansa: 78% Copper, 22% Tin) or recycled brass alloy giving rich antique tone",
        technique: "Clay kiln pit casting"
      },
      {
        name: "Core Construction",
        expected: "Hollow inside with residual baked red/black ant-hill clay core audible or visible inside figures",
        technique: "Two-stage clay core and mold preparation"
      },
      {
        name: "Surface Finish",
        expected: "Warm golden-brown antique patina with natural casting textures, never mirror-polished or machine-sanded",
        technique: "River sand buffing and mustard oil wash"
      }
    ],
    counterfeitAlerts: [
      "Solid zinc-aluminum alloy die-cast items with fake brass spray paint",
      "Identical machine-molded multiples lacking unique lost-wax singular identity",
      "Seamless hollow pipes showing modern welding seams",
      "Mirror-chrome electroplated surfaces without rustic casting porosity"
    ],
    buyerPhysicalTests: [
      {
        testName: "Internal Clay Core Check",
        procedure: "Shake or inspect interior cavities: Authentic Dhokra contains traces of burnt red clay from the original core, and no two sculptures are ever 100% identical.",
        significance: "Lost-wax molds are broken to release the casting; every piece is unique."
      },
      {
        testName: "Coil Wire Tactile Feel",
        procedure: "Run fingers over decorative lines: Authentic pieces feel like individually placed wires of wax that merged during casting.",
        significance: "Eliminates machined CNC stamped patterns."
      },
      {
        testName: "Magnet Non-Adherence Test",
        procedure: "Test with a refrigerator magnet: Genuine bronze/brass is non-magnetic and will not attract the magnet.",
        significance: "Disproves cheap iron-core fake castings."
      }
    ],
    giHologramFormat: "GI-CG-0083-XXXX",
    priceRange: "₹950 - ₹45,000"
  },
  {
    id: "kolhapuri-chappal",
    name: "Kolhapuri Chappals",
    vernacularName: "कोल्हापुरी चप्पल / కొల్హాపురి చెప్పులు",
    category: "Leather Craft",
    district: "Kolhapur",
    state: "Maharashtra",
    giNumber: "GI-IN-0169",
    giClass: "Class 25 (Footwear)",
    registeredYear: 2009,
    artisanGuild: "LIDCOM & Kolhapur Charmakar Sanghatana",
    description: "Handcrafted open-toed leather footwear made using vegetable-tanned buffalo and goat leather. Stitched entirely with leather cord (no iron nails or chemical adhesives), seasoned with mustard and castor oils, and decorated with delicate leather braids and pompoms.",
    heroImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    macroTextureImage: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80",
    keyIndicators: [
      {
        name: "Tanning Method",
        expected: "Vegetable tanning with Babul bark (Acacia nilotica) and Harda (Myrobalan) nuts",
        technique: "Traditional bag tanning pit"
      },
      {
        name: "Stitching Medium",
        expected: "Braided raw leather thongs (Khara) securing sole to upper; completely free of metal nails or chemical glue",
        technique: "Awl piercing and hand-cord pulling"
      },
      {
        name: "Sole Structure",
        expected: "Multi-layered buffalo hide compressed with wooden mallet, yielding characteristic creaking sound (Kar-Kar)",
        technique: "Wet compression and sun-curing"
      },
      {
        name: "Aroma & Seasoning",
        expected: "Distinctive earthy, rich vegetable-oil and leather aroma from castor/mustard oil treatment",
        technique: "Oil bath soaking for flexibility"
      }
    ],
    counterfeitAlerts: [
      "PU / PVC faux leather or synthetic vinyl that cracks after minor wear",
      "Machine-stitched nylon threads or metal staples visible along sole edge",
      "Chemical rubber soles with artificial printed leather grain texture",
      "Pungent synthetic petroleum or solvent odor instead of earthy babul bark"
    ],
    buyerPhysicalTests: [
      {
        testName: "No-Nails Sole Inspection",
        procedure: "Inspect the perimeter of the sole: Authentic Kolhapuri footwear uses leather cords looped through hand-punched holes; no metal nails or chemical glue lines exist.",
        significance: "Sole constructed purely through indigenous leather interlock."
      },
      {
        testName: "Water Absorption & Bark Aroma",
        procedure: "Smell the leather: Genuine vegetable-tanned leather has a warm earthy aroma and gently absorbs a water drop rather than letting it bead like synthetic plastic.",
        significance: "Confirms authentic vegetal bark tanning."
      },
      {
        testName: "Audible Sole Resonance",
        procedure: "Walk in dry conditions: Traditional hand-compressed leather layers produce a legendary gentle creak ('Kar-Kar') prized by connoisseurs.",
        significance: "Sign of multi-layer vegetable-cured buffalo hide."
      }
    ],
    giHologramFormat: "GI-MH-0028-XXXX",
    priceRange: "₹850 - ₹12,000"
  },
  ...[
    ['bagru-print','Bagru Hand Block Print','Bagru, Jaipur','Rajasthan','Textiles',183,2009,'Hand block printing on cloth with carved wooden blocks and earthy natural dyes. Look for repeated hand-printed motifs and small variations between impressions.','https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
    ['kota-doria','Kota Doria','Kaithoon, Kota','Rajasthan','Textiles',12,2004,'Lightweight cotton-silk fabric woven with a distinctive fine square-check pattern called khat. Look for airy checks and a delicate handloom texture.','https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80'],
    ['sanganeri-print','Sanganeri Hand Block Printing','Sanganer, Jaipur','Rajasthan','Textiles',147,2008,'Hand block printed textiles known for delicate floral and botanical motifs. Look for fine outlines, balanced repeats and hand-print variation.','https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80'],
    ['molela-clay','Molela Clay Work','Molela, Rajsamand','Rajasthan','Pottery',67,2006,'Terracotta plaques and figures shaped and painted by hand. Look for a fired clay body, raised forms and vivid painted details.','https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'],
    ['thewa-art','Thewa Art Work','Pratapgarh','Rajasthan','Metalwork',244,2011,'Intricate openwork gold-sheet designs fused onto coloured glass. Look for detailed motifs framed by a fine gold lattice.','https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80'],
    ['pokaran-pottery','Pokaran Pottery','Pokaran, Jaisalmer','Rajasthan','Pottery',519,2015,'Distinctive local pottery shaped and fired by artisans. Look for hand-formed profiles, local clay character and individual surface finish.','https://images.unsplash.com/photo-1565193298595-6c7b7b8a9e5d?auto=format&fit=crop&w=800&q=80'],
    ['sojat-mehndi','Sojat Mehndi','Sojat, Pali','Rajasthan','Natural dye',628,2018,'GI-registered henna from the Sojat region. This is an agricultural product; visual checks alone cannot confirm origin or quality.','https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80'],
    ['jodhpur-bandhej','Jodhpur Bandhej Craft','Jodhpur','Rajasthan','Textiles',751,2021,'Tie-dyed textiles made by carefully tying small sections before dyeing. Look for characteristic dotted patterns and colour transitions.','https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
    ['makrana-marble','Makrana Marble','Makrana, Nagaur','Rajasthan','Stone craft',405,2013,'Natural marble from Makrana, used in celebrated architecture and carving. The GI listing identifies the stone origin; appearance is not enough to authenticate it.','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'],
    ['udaipur-koftgari','Udaipur Koftgari Metal Craft','Udaipur','Rajasthan','Metalwork',747,2021,'Decorative metal inlay work involving fine wire or sheet inlaid into a darker metal surface. Look for carefully chased, flush-set ornament.','https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80'],
    ['orissa-pattachitra','Orissa Pattachitra','Puri, Odisha','Odisha','Painting',88,2007,'Traditional narrative painting on prepared cloth, with confident outlines, dense ornament and natural-looking colour.','https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80'],
    ['bidriware','Bidriware','Bidar','Karnataka','Metalwork',20,2005,'Dark alloy objects decorated with silver inlay. Look for fine metallic patterns set into a deep charcoal surface.','https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80'],
    ['kullu-shawl','Kullu Shawl','Kullu','Himachal Pradesh','Textiles',19,2004,'Woven wool shawls, often finished with colourful geometric borders. Look for a substantial woollen weave and crisp patterned bands.','https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'],
    ['phulkari','Phulkari','Punjab','Punjab','Embroidery',27,2005,'Embroidery worked on the reverse of cloth so the front shows bold satin-stitch motifs. Look for dense, hand-worked geometric florals.','https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80'],
    ['pochampally-ikat','Pochampally Ikat','Bhoodan Pochampally, Yadadri Bhuvanagiri','Telangana','Textiles',4,2003,'Resist-dyed yarns are woven into characteristic ikat patterns. Look for softly feathered pattern edges formed by the yarn-dyeing process.','https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80']
  ].map(([id,name,place,state,category,giNumber,registeredYear,description,heroImage]) => ({
    id, name, vernacularName: name, district: place.split(',').slice(-1)[0].trim(), state, category,
    giNumber: `GI-${giNumber}`, giClass: 'Registered Geographical Indication', registeredYear,
    artisanGuild: 'See the official GI Registry for registered producer details', description, heroImage,
    macroTextureImage: heroImage,
    keyIndicators: [{ name: 'Craft character', expected: description, technique: 'Visual reference only' }],
    counterfeitAlerts: ['Visual features are not proof of origin; confirm with an authorised source.'], buyerPhysicalTests: []
  }))
];

// Helper: Filter by Category (Demonstrating ES6 filter and pure functions)
export const getCraftsByCategory = (category) => {
  if (!category || category === "All") return ODOP_CRAFTS;
  return ODOP_CRAFTS.filter((craft) => craft.category === category);
};

// Helper: Find Craft by ID
export const getCraftById = (id) => {
  return ODOP_CRAFTS.find((craft) => craft.id === id) || null;
};

// Helper: Extract unique categories for filter tabs (Demonstrates Set, spread operator, map)
export const getCategories = () => {
  const categories = ODOP_CRAFTS.map((craft) => craft.category);
  return ["All", ...new Set(categories)];
};

// Helper: Extract unique states
export const getStates = () => {
  const states = ODOP_CRAFTS.map((craft) => craft.state);
  return ["All States", ...new Set(states)];
};
