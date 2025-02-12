export interface Product {
    id: string;
    name: string;
    price: number;
    brand: string;
    category: string;
    imageUrl: string;
    hasDiscount: boolean;
    discountPercentage?: number;
    stock: number;
  }
  