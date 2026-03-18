export type RoastLevel = 'light' | 'medium' | 'dark' | 'extra_dark';
export type MilkType = 'dairy' | 'oat' | 'almond' | 'none';
export type Temperature = 'hot' | 'iced' | 'blended';
export type CupSize = 'S' | 'M' | 'L';
export type Syrup = 'vanilla' | 'caramel' | 'hazelnut' | 'none';

export const ROAST_NOTES: Record<RoastLevel, string> = {
  light: "Bright, citrus, floral — a morning in a garden",
  medium: "Smooth, chocolatey, balanced — crowd's favourite",
  dark: "Bold, roasty, intense — no apologies",
  extra_dark: "Espresso purist territory. Handle with respect.",
};

export const MILK_NOTES: Record<MilkType, string> = {
  dairy: "Classic creaminess, full body",
  oat: "Naturally sweet, silky smooth",
  almond: "Light, nutty, subtle",
  none: "Pure. Uncut. Respect.",
};

export const TEMP_NOTES: Record<Temperature, string> = {
  hot: "The classic. Warmth in every sip.",
  iced: "Cold, smooth, refreshing hit.",
  blended: "Creamy, thick, dessert-level indulgence.",
};

export const SYRUP_NOTES: Record<Syrup, string> = {
  vanilla: "Soft, sweet, universally loved",
  caramel: "Rich, buttery warmth",
  hazelnut: "Nutty depth, slightly smoky",
  none: "Let the coffee speak for itself",
};

export const TASTING_NOTES: Record<RoastLevel, string> = {
  light: "Citrus · Floral · Tea-like finish",
  medium: "Chocolate · Caramel · Smooth body",
  dark: "Smoky · Roasty · Bold finish",
  extra_dark: "Intense · Bitter edge · Espresso forward",
};

export const AROMA_NOTES: Record<RoastLevel, string> = {
  light: "Smells like a sunrise and a lemon orchard",
  medium: "That exact coffee smell you dream about",
  dark: "Deep, rich, and completely unapologetic",
  extra_dark: "Walks into the room before you do",
};

export const DRINK_NAMES: Record<RoastLevel, Record<MilkType, string>> = {
  light: {
    dairy: "Golden Bloom Latte",
    oat: "Citrus Oat Cloud",
    almond: "Sunrise Almond Mist",
    none: "The Bright Shot",
  },
  medium: {
    dairy: "Velvet Macchiato",
    oat: "Smooth Oat Ritual",
    almond: "Hazelnut Drift",
    none: "The Balanced Pull",
  },
  dark: {
    dairy: "Midnight Flat White",
    oat: "Dark Oat Storm",
    almond: "Shadow Almond",
    none: "The Dark Ritual",
  },
  extra_dark: {
    dairy: "Obsidian Latte",
    oat: "Black Oat Thunder",
    almond: "The Void",
    none: "Espresso Noir",
  },
};

export const BASE_PRICES: Record<CupSize, number> = {
  S: 5.00,
  M: 6.50,
  L: 8.00
};

export const PRESETS = [
  {
    name: "Bold & Brainy",
    roast: "dark" as RoastLevel,
    milk: "none" as MilkType,
    sweetness: 0,
    strength: 3,
    temperature: "hot" as Temperature,
    size: "M" as CupSize,
    syrup: "none" as Syrup,
    extraShot: true,
    tags: ["No Sugar", "Triple Shot", "Dark"],
  },
  {
    name: "Soft & Sweet",
    roast: "light" as RoastLevel,
    milk: "oat" as MilkType,
    sweetness: 3,
    strength: 1,
    temperature: "hot" as Temperature,
    size: "L" as CupSize,
    syrup: "vanilla" as Syrup,
    extraShot: false,
    tags: ["Oat Milk", "Sweet", "Vanilla"],
  },
  {
    name: "Citrus Explorer",
    roast: "light" as RoastLevel,
    milk: "none" as MilkType,
    sweetness: 0,
    strength: 2,
    temperature: "iced" as Temperature,
    size: "M" as CupSize,
    syrup: "none" as Syrup,
    extraShot: false,
    tags: ["Bright", "Double Shot", "Iced"],
  },
  {
    name: "Midnight Indulgence",
    roast: "extra_dark" as RoastLevel,
    milk: "dairy" as MilkType,
    sweetness: 2,
    strength: 2,
    temperature: "blended" as Temperature,
    size: "L" as CupSize,
    syrup: "caramel" as Syrup,
    extraShot: true,
    tags: ["Intense", "Sweet", "Blended"],
  },
];
