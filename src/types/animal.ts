

export type Animal = {
  id: number;
  name: string;
  category: "small" | "medium" | "large" | "bird";
  price: number;
  isSpecial: boolean;
  seedLikes: number;
  img: string;
  description: string;
  stock: number;
};