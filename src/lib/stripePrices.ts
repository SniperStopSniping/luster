export const STRIPE_PRICES = {
  // ============================================
  // LEGACY: Builder in a Jar (tier-only, for homepage compatibility)
  // ============================================
  jar_sample: "PLACEHOLDER_jar_sample",
  jar_studio: "PLACEHOLDER_jar_studio",
  jar_refill: "PLACEHOLDER_jar_refill",

  // ============================================
  // LEGACY: Builder in a Bottle (tier-only, for homepage compatibility)
  // ============================================
  bottle_sample: "PLACEHOLDER_bottle_sample",
  bottle_standard: "PLACEHOLDER_bottle_standard",
  bottle_studio: "PLACEHOLDER_bottle_studio",

  // ============================================
  // JAR: Per-shade price IDs (12 total)
  // ============================================
  // Clear Structure - Jar
  clear_jar_sample: "PLACEHOLDER_clear_jar_sample",
  clear_jar_studio: "PLACEHOLDER_clear_jar_studio",
  clear_jar_refill: "PLACEHOLDER_clear_jar_refill",

  // Milky Structure - Jar
  milky_jar_sample: "PLACEHOLDER_milky_jar_sample",
  milky_jar_studio: "PLACEHOLDER_milky_jar_studio",
  milky_jar_refill: "PLACEHOLDER_milky_jar_refill",

  // Nude Structure - Jar
  nude_jar_sample: "PLACEHOLDER_nude_jar_sample",
  nude_jar_studio: "PLACEHOLDER_nude_jar_studio",
  nude_jar_refill: "PLACEHOLDER_nude_jar_refill",

  // Sheer Structure - Jar
  sheer_jar_sample: "PLACEHOLDER_sheer_jar_sample",
  sheer_jar_studio: "PLACEHOLDER_sheer_jar_studio",
  sheer_jar_refill: "PLACEHOLDER_sheer_jar_refill",

  // ============================================
  // BOTTLE: Per-shade price IDs (9 total)
  // ============================================
  // Clear Structure - Bottle
  clear_bottle_sample: "PLACEHOLDER_clear_bottle_sample",
  clear_bottle_standard: "PLACEHOLDER_clear_bottle_standard",
  clear_bottle_studio: "PLACEHOLDER_clear_bottle_studio",

  // Milky Structure - Bottle
  milky_bottle_sample: "PLACEHOLDER_milky_bottle_sample",
  milky_bottle_standard: "PLACEHOLDER_milky_bottle_standard",
  milky_bottle_studio: "PLACEHOLDER_milky_bottle_studio",

  // Nude Structure - Bottle
  nude_bottle_sample: "PLACEHOLDER_nude_bottle_sample",
  nude_bottle_standard: "PLACEHOLDER_nude_bottle_standard",
  nude_bottle_studio: "PLACEHOLDER_nude_bottle_studio",
} as const;

export type StripePriceKey = keyof typeof STRIPE_PRICES;
