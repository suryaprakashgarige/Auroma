import { MenuItem } from "@/types";

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Oat Milk Lavender Latte",
    description: "Our signature espresso pulled over steamed oat milk and house-made lavender syrup.",
    price: 6.50,
    category: "Signatures",
    imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop",
    dietaryTags: ["Vegan", "Dairy-Free"],
    roastLevel: "Medium"
  },
  {
    id: "2",
    name: "Ethiopian Yirgacheffe Pour Over",
    description: "Bright and floral with notes of jasmine, bergamot, and blueberry.",
    price: 5.50,
    category: "Pour Over",
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop",
    dietaryTags: ["Vegan"],
    roastLevel: "Light"
  },
  {
    id: "3",
    name: "Double Espresso",
    description: "A perfectly extracted double shot of our seasonal Auroma reserve blend.",
    price: 3.50,
    category: "Espresso Bar",
    imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1000&auto=format&fit=crop",
    dietaryTags: ["Vegan"],
    roastLevel: "Dark"
  },
  {
    id: "4",
    name: "Almond Croissant",
    description: "Twice-baked butter croissant filled with sweet almond frangipane.",
    price: 4.75,
    category: "Pastries",
    imageUrl: "https://images.unsplash.com/photo-1530610476181-d83430b64dcb?q=80&w=1000&auto=format&fit=crop",
    dietaryTags: ["Vegetarian"],
  }
];
