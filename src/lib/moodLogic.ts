// lib/moodLogic.ts

export type MoodType = 'Chill' | 'Tense' | 'Tired' | 'Focused' | 'Neutral' | 'Creative';

export const moodData = {
  Chill: {
    emoji: '😌',
    tagline: 'Easy does it. You earned this.',
    drink: {
      name: 'Lavender Oat Latte',
      roast: 'Light',
      milk: 'Oat',
      strength: 'Single',
      temperature: 'Hot',
      tastingNotes: ['Floral', 'Creamy', 'Calming'],
      aroma: 'Like a lavender field decided to become a coffee shop',
      origin: 'Pacific Northwest · Craft',
      cupColor: '#C8B8D4',
      hasFoam: true,
      whyThisMatches: "When you're already relaxed, a light caffeine hit keeps the good vibes going without tipping into jitters. The lavender has mild anxiolytic properties, and oat milk's natural sugars give a slow, smooth energy curve — no crash, no drama. This is coffee as a reward, not a crutch.",
      science: "Caffeine at low doses enhances mood without raising cortisol. Lavender's linalool compound has clinically studied calming effects on the nervous system, making this the scientifically softest landing in our menu."
    }
  },
  Tense: {
    emoji: '😤',
    tagline: "Something warm. Something that fixes things.",
    drink: {
      name: 'Velvet Macchiato',
      roast: 'Medium',
      milk: 'Dairy',
      strength: 'Double',
      temperature: 'Hot',
      tastingNotes: ['Chocolate', 'Creamy', 'Balanced'],
      aroma: 'Warm, chocolatey, and somehow fixes everything',
      origin: 'Italy · Classic',
      cupColor: '#7D5A3C',
      hasFoam: true,
      whyThisMatches: "When you're tense, going too strong on caffeine spikes cortisol further — not helpful. A medium roast double macchiato hits the sweet spot: enough caffeine to shift your state, full dairy fat to slow absorption and smooth the edges. The chocolate notes trigger a mild dopamine response. It's not magic. It's close.",
      science: "Stress elevates cortisol. Moderate caffeine (not high) can improve mood without compounding cortisol elevation. Milk fat slows caffeine absorption, extending the calm curve rather than creating a spike-and-crash pattern."
    }
  },
  Tired: {
    emoji: '😴',
    tagline: "We see you. We got you.",
    drink: {
      name: 'Cold Brew Vanilla',
      roast: 'Medium',
      milk: 'Oat',
      strength: 'Double',
      temperature: 'Iced',
      tastingNotes: ['Smooth', 'Sweet', 'Low Bitterness'],
      aroma: 'Cool, vanilla-kissed, dangerously easy to drink',
      origin: 'New York · Cold Craft',
      cupColor: '#6B4C35',
      hasFoam: false,
      whyThisMatches: "Cold brew is steeped for 18 hours, extracting maximum caffeine with minimum acidity — which means it hits harder and smoother than hot coffee. When you're running on empty, you need a clean, sustained energy lift without the bitterness that an over-tired stomach can't handle. Vanilla oat adds a gentle sweetness that makes the caffeine feel like a wave, not a slap.",
      science: "Cold brew contains up to 65% more caffeine than drip coffee due to longer steep time and lower dilution. The cold temperature also reduces perceived bitterness, making it easier to consume quickly when you need fast effect."
    }
  },
  Focused: {
    emoji: '🎯',
    tagline: "In the zone. Stay there.",
    drink: {
      name: 'Double Espresso',
      roast: 'Dark',
      milk: 'None',
      strength: 'Triple',
      temperature: 'Hot',
      tastingNotes: ['Bold', 'Low Acid', 'High Caffeine'],
      aroma: 'Deep, rich, and completely unapologetic',
      origin: 'Italy · Classic Blend',
      cupColor: '#2C1A0E',
      hasFoam: false,
      whyThisMatches: "You're already in focus mode — we just need to maintain it. No milk to slow absorption. No sweetness to distract. High caffeine to sustain adenosine blockade during your peak cognitive window. The dark roast produces a lower-acid, smoother extraction so there's no gut discomfort to pull your attention. This is your weapon of choice.",
      science: "Caffeine blocks adenosine A2A receptors, which potentiates dopamine D2 signalling — directly reinforcing focus and working memory. Dark roasts are lower in chlorogenic acids, reducing gastrointestinal irritation during extended focus sessions."
    }
  },
  Neutral: {
    emoji: '😐',
    tagline: "Neutral is just undiscovered.",
    drink: {
      name: 'Smooth Oat Ritual',
      roast: 'Medium',
      milk: 'Oat',
      strength: 'Double',
      temperature: 'Hot',
      tastingNotes: ['Chocolate', 'Caramel', 'Smooth'],
      aroma: 'That exact coffee smell you dream about',
      origin: 'Brazil · Medium Roast',
      cupColor: '#8B6347',
      hasFoam: true,
      whyThisMatches: "When you're neutral, the best coffee is the one that doesn't demand anything from you — it just delivers. A medium roast oat latte is the universal coffee handshake: smooth enough to please any mood, strong enough to actually work, comforting enough to feel like a good decision. You might be neutral now. You won't be after this.",
      science: "Medium roast strikes the optimal balance between caffeine content (higher in lighter roasts) and flavour development (higher in darker roasts). Oat milk's beta-glucan content provides a stable energy co-substrate alongside caffeine."
    }
  },
  Creative: {
    emoji: '💡',
    tagline: "The muse is calling. Answer her.",
    drink: {
      name: 'Floral Ethiopian Pour Over',
      roast: 'Light',
      milk: 'None',
      strength: 'Double',
      temperature: 'Hot',
      tastingNotes: ['Jasmine', 'Apricot', 'Tea-like'],
      aroma: 'Bright, ethereal, and slightly wild',
      origin: 'Ethiopia · Gedeb',
      cupColor: '#E2B877',
      hasFoam: false,
      whyThisMatches: "Creativity requires divergent thinking, which is inhibited by over-caffeination. A complex, light-roast pour over provides the necessary alpha-wave boost while the delicate flavor profile keeps your brain engaged in 'discovery' mode rather than 'executive' mode. High acidity triggers neuro-sensory alertness without the heavy body of a latte.",
      science: "Chlorogenic acids in light roasts act as mild MAO-B inhibitors, theoretically prolonging dopamine availability in the prefrontal cortex — the engine room of creative synthesis."
    }
  }
};

export const detectMood = (expressions: any): MoodType => {
  if (!expressions) return 'Neutral';

  // face-api.js returns: neutral, happy, sad, angry, fearful, disgusted, surprised
  // Find the single highest scoring expression
  const entries = Object.entries(expressions) as [string, number][];
  const dominant = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
  const [topExpression, topScore] = dominant;

  // If confidence is very low across the board, return Neutral
  if (topScore < 0.15) return 'Neutral';

  // Map face-api expressions → Auroma moods
  switch (topExpression) {
    case 'happy':     return 'Chill';
    case 'angry':     return 'Tense';
    case 'disgusted': return 'Tense';
    case 'sad':       return 'Tired';
    case 'fearful':   return 'Tired';
    case 'surprised': return 'Focused';
    case 'neutral':
    default:
      // If neutral is dominant but happy is a close second (relaxed face),
      // nudge toward Chill
      if (expressions.happy > 0.15) return 'Chill';
      return 'Neutral';
  }
};


export const getMostFrequentMood = (moods: MoodType[]): MoodType | null => {
  if (moods.length === 0) return null;
  const counts = moods.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as MoodType;
};
