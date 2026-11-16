import { z } from 'zod';

/**
 * Zod Validation Schemas for Pramaan
 *
 * Demonstrates Unit IV:
 * - Declarative schema validation
 * - Custom error messages
 * - Regex pattern validation
 * - Numeric range checks
 * - Enum selections
 * - safeParse error mapping
 */

// Schema 1: Verification Studio Quick Submission
export const craftUploadSchema = z.object({
  craftId: z.string({ required_error: 'Please select an ODOP craft category' })
    .min(1, 'Please select an ODOP craft'),
  claimedDistrict: z.string()
    .min(2, 'District must be at least 2 characters')
    .max(50, 'District name is too long')
    .optional()
    .or(z.literal('')),
  giTagInput: z.string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      // Format: GI-XX-0000-XXXX or GI-IN-XXXX
      return /^GI-[A-Z]{2}-\d{4}(-[A-Z0-9]{4})?$/i.test(val.trim());
    }, {
      message: 'GI code format should be like GI-JK-0046-8821 or GI-IN-0099'
    })
});

// Schema 2: Deep Artisan & Buyer Physical Inspection Checklist Form
export const inspectionChecklistSchema = z.object({
  craftId: z.string().min(1, 'Please select an ODOP craft'),
  sellerName: z.string().min(2, 'Seller / Store name is required'),
  claimedPrice: z.coerce.number({ invalid_type_error: 'Price must be a valid number' })
    .positive('Claimed price must be greater than ₹0')
    .max(1000000, 'Price exceeds standard handicraft limits'),
  giTagHologram: z.string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      return /^GI-[A-Z]{2}-\d{4}-[A-Z0-9]{4}$/i.test(val.trim());
    }, {
      message: 'Hologram must follow official format: GI-XX-0000-XXXX (e.g. GI-JK-0046-8821)'
    }),
  burnTestObservation: z.enum([
    'burnt_hair_ash',       // Authentic protein animal fiber (Pashmina, pure silk)
    'plastic_hard_bead',    // Synthetic acrylic / polyester
    'paper_cellulose_ash',  // Cotton / Rayon
    'not_applicable'        // Non-textiles like pottery / wood / metal
  ], {
    errorMap: () => ({ message: 'Please select a valid burn test observation' })
  }),
  tactileFeel: z.enum([
    'warm_organic_irregular', // Handloom/natural feel
    'cold_synthetic_smooth',  // Machine-extruded polymer
    'heavy_crisp_drape',      // Pure silk zari
    'rigid_stiff_resin',      // Synthetic plastic resin
    'natural_crazed_ceramic', // Quartz glass frit
    'unknown'
  ], {
    errorMap: () => ({ message: 'Please select a tactile feel observation' })
  }),
  hasSilkMarkOrCraftMark: z.boolean().default(false),
  buyerNotes: z.string()
    .min(10, 'Please provide at least 10 characters describing the purchase context or seller claims')
    .max(500, 'Notes cannot exceed 500 characters')
});

// Schema 3: GI Tag Quick Registry Search
export const giRegistrySearchSchema = z.object({
  giQuery: z.string()
    .min(2, 'Search query must be at least 2 characters')
    .max(60, 'Query is too long')
});
