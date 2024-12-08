import { create } from "zustand";
import { Cart, ProductDetails } from "~/util/types";


interface Store{
  products: ProductDetails[];
  setProducts: (products: ProductDetails[]) => void;
  cart: Cart[],
  setCart: (cart: Cart[]) => void
  updateCart: (cart:Cart)=>void
  
}
export const useStore =  create<Store>((set)=>({
  products: [],
  setProducts: (products: ProductDetails[]) => set({products}),
  cart: [],
  setCart: (cart: Cart[]) => set({cart}),
  updateCart:(cart:Cart)=>set({
    
  })
}))