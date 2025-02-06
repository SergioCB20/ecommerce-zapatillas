export interface Product {
    id: string;
    name: string;
    price: number;
    brand: string;
    category: string;
    imageUrl: string;
    hasDiscount: boolean;
    discountPorcentage?: number;
    stock: number;
  }
  
export interface CartItem extends Product {
    quantity: number;
}
  