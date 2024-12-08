import type { MetaFunction } from "@remix-run/node";
import { useViewTransitionState } from "@remix-run/react";
import { useMemo, useState, useTransition } from "react";
import { ProductCard } from "~/components/current/ProductCard";
import { RenderProducts } from "~/components/current/RenderProducts";
import { Button } from "~/components/ui/button";
import { useStore } from "~/store/state";
import { Navbar } from "~/util/Navbar";
import { Cart, ProductDetails } from "~/util/types";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {


//   const [searchQuery, setSearchQuery] = useState('');
//   const [data , setData ] = useState<ProductDetails[]>([]);
//   const store = useStore();
//   const [isFetched , setIsfetched] = useState(false)


// useMemo(()=>{
//   if (store.products.length === 0) {
//       async function fetchProductData() {
//         const res = await fetch('https://dummyjson.com/products');
//       const data = await res.json();
//       store.setProducts(data.products);
//       setData(data.products)
      
//       setIsfetched(true)

//       }
//       fetchProductData()
//   }
//   else {setData(store.products)
//      setIsfetched(false)}
// } , [])
  return <div  className="dark:bg-gray-900 bg-gray-50 min-h-screen">
 

  {/* Hero Section */}
  <header  className="container mx-auto px-4 py-16 text-center">
    <h2 className="text-4xl font-bold mb-4 dark:text-white">
      Discover Amazing Products
    </h2>
    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
      Browse our latest collection of high-quality items
    </p>
    <div className="flex justify-center space-x-4">
      <Button onClick={()=> console.log("Shop Now")}>Shop Now</Button>
      <Button variant="outline">Learn More</Button>
    </div>
  </header>

  {/* Product Grid */}
    <RenderProducts  details={{mainText:"Featured Products" , url:"/products"}}/>
</div>
}
