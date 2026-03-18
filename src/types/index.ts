export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Espresso Bar' | 'Pour Over' | 'Signatures' | 'Pastries';
  imageUrl: string;
  dietaryTags: string[];
  roastLevel?: 'Light' | 'Medium' | 'Dark';
}

export interface CartItem extends MenuItem {
  quantity: number;
}
