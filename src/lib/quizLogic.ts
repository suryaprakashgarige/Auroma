export type Question = {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    // can add points/weight mapping here
    icon?: string;
  }[];
};

export type DrinkResult = {
  id: string;
  name: string;
  persona: string;
  tags: string[];
  description: string;
  whyThis: string;
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "How do you want to feel after this coffee?",
    options: [
      { id: "focused", text: "⚡ Sharp & Focused" },
      { id: "relaxed", text: "😌 Calm & Relaxed" },
      { id: "social", text: "🤝 Social & Energized" },
      { id: "grounded", text: "🌿 Gentle & Grounded" },
    ],
  },
  {
    id: "q2",
    text: "What's your flavor comfort zone?",
    options: [
      { id: "bright", text: "🍋 Bright & Fruity (light roast)" },
      { id: "smooth", text: "🍫 Smooth & Chocolatey (medium roast)" },
      { id: "bold", text: "🔥 Bold & Intense (dark roast)" },
      { id: "surprise", text: "🤷 Surprise me" },
    ],
  },
  {
    id: "q3",
    text: "What's your milk situation?",
    options: [
      { id: "dairy", text: "🥛 Full dairy (creamy classic)" },
      { id: "oat", text: "🌾 Oat milk (smooth, slightly sweet)" },
      { id: "almond", text: "🌰 Almond milk (light, nutty)" },
      { id: "black", text: "⬛ Black — no milk, no mercy" },
    ],
  },
  {
    id: "q4",
    text: "How sweet are we talking?",
    options: [
      { id: "zero", text: "Zero sugar (pure coffee)" },
      { id: "hint", text: "Just a hint" },
      { id: "medium", text: "Medium sweet" },
      { id: "dessert", text: "Dessert level" },
    ],
  },
  {
    id: "q5",
    text: "When are you having this?",
    options: [
      { id: "morning", text: "Morning kickstart (6am–10am)" },
      { id: "midday", text: "Midday focus (10am–2pm)" },
      { id: "afternoon", text: "Afternoon pick-me-up (2pm–5pm)" },
      { id: "evening", text: "Evening wind-down (after 5pm)" },
    ],
  },
];

export const RESULTS: Record<string, DrinkResult> = {
  ethiopian: {
    id: "ethiopian",
    name: "Ethiopian Yirgacheffe (Pour Over)",
    persona: "The Explorer",
    tags: ["Citrus", "Floral", "High Acid"],
    description: "You are looking for a vibrant, fruity flavor experience. Pour-overs give distinct brightness that highlights naturally wonderful notes.",
    whyThis: "Your comfort zone loves bright & fruity notes. A pour-over of single-origin Ethiopian brings out exactly that clean, tea-like clarity.",
  },
  espresso: {
    id: "espresso",
    name: "Double Espresso",
    persona: "The Productivity Seeker",
    tags: ["Bold", "Low Acid", "High Caffeine"],
    description: "You told us you want sharp focus and you mean business. No milk, no sugar — just clean, high-caffeine intensity. The Double Espresso is your weapon of choice.",
    whyThis: "Focused mind triggers full speed. Zero compromises means full concentration on performance targets.",
  },
  lavender: {
    id: "lavender",
    name: "Lavender Oat Latte",
    persona: "The Comfort Seeker",
    tags: ["Smooth", "Floral", "Comforting"],
    description: "Your nervous system called. It wants this. Creamy oat milk with floral lavender undertones that soothe the soul.",
    whyThis: "Calming effects with creamy oat smooth texture keeps the edge off while comforting focus sets in.",
  },
  macchiato: {
    id: "macchiato",
    name: "Caramel Macchiato",
    persona: "The Ritual Drinker",
    tags: ["Sweet", "Creamy", "Rich"],
    description: "Classic for a reason. Your reason. Warm caramel drizzle overlying creamy dairy with layers of espresso.",
    whyThis: "Social times call for sweet accessible profiles where caffeine merges seamlessly with layers of foam.",
  },
  coldbrew: {
    id: "coldbrew",
    name: "Cold Brew Vanilla",
    persona: "The Night Owl",
    tags: ["Chilled", "Sweet", "Smooth"],
    description: "Evening focus requires a cold, smooth edge that goes down easy with rich vanilla sweet layers.",
    whyThis: "Smooth cold brewing keeps acidity mild and supports keeping it light for night setups.",
  },
  matcha: {
    id: "matcha",
    name: "Matcha Espresso Fusion",
    persona: "The Adventurer",
    tags: ["Earthy", "Layered", "Unique"],
    description: "You are ready for a surprise. Earthy Matcha meet with Bold espresso over ice—a visual and flavor layered masterpiece.",
    whyThis: "Gentle grounding matcha merges with caffeine peak hits to support gentle focus hits correctly.",
  },
};

export function calculateResult(answers: Record<string, string>): DrinkResult {
  // Extract answers
  const q1 = answers["q1"]; // feel
  const q2 = answers["q2"]; // flavor
  const q3 = answers["q3"]; // milk
  const q4 = answers["q4"]; // sweet
  const q5 = answers["q5"]; // time

  // 1. Ethiopian: Bright/Fruity + any time
  if (q2 === "bright") {
    return RESULTS.ethiopian;
  }

  // 2. Double Espresso: Focused + Bold + Black + Morning/Midday
  if (q1 === "focused" && q2 === "bold" && q3 === "black" && (q5 === "morning" || q5 === "midday")) {
    return RESULTS.espresso;
  }

  // 3. Lavender Oat Latte: Calm + Oat milk + Low-medium sweet
  if (q1 === "relaxed" && q3 === "oat" && (q4 === "hint" || q4 === "medium")) {
    return RESULTS.lavender;
  }

  // 4. Caramel Macchiato: Social + Smooth + Dairy + Sweet
  if (q1 === "social" && q2 === "smooth" && q3 === "dairy" && (q4 === "medium" || q4 === "dessert")) {
    return RESULTS.macchiato;
  }

  // 5. Cold Brew Vanilla: Evening + Any + sweet
  if (q5 === "evening" && (q4 === "medium" || q4 === "dessert")) {
    return RESULTS.coldbrew;
  }

  // 6. Matcha Espresso Fusion: "Surprise me" on flavor OR Gentle & Grounded
  if (q2 === "surprise" || q1 === "grounded") {
    return RESULTS.matcha;
  }

  // Fallback defaults if logic tied or misses
  if (q2 === "bold") return RESULTS.espresso;
  if (q4 === "dessert") return RESULTS.macchiato;
  if (q1 === "relaxed") return RESULTS.lavender;
  
  return RESULTS.ethiopian; // Fallback default
}
