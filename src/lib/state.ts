import { create } from "zustand";


interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface ProductDetails {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  returnPolicy: string;
  warrantyInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  images: string[];
}

export interface Cart{
  id: number,
  image: string,
  title: string,
  price: number,
  quantity: number

}

 interface Store {
  products: ProductDetails[];
  setProducts: (products: ProductDetails[]) => void;
  cart: Cart[],
  setCart: (cart: Cart[]) => void
  
}
// now i want to update the quatity for the cart

export const useStore =  create<Store>((set)=> ({

  products: [],
  setProducts: (products: ProductDetails[]) => set({ products }),

  cart: [],
  setCart: (cart: Cart[]) => set({ cart }),
// now i want to update the quatity for the cart
  
}));