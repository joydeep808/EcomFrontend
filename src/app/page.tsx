"use client"
import { useEffect, useState } from 'react';

import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {Navbar} from '@/components/navbar';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetails, useStore } from '@/lib/state';


// Sample Product Data for Home Page


interface IHomePageProducts {
  id: number;
  name: string;
  image: string;
  price: number;
}

// Product Card Component



// Home Page Component
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data , setData ] = useState<ProductDetails[]>([]);
  const store = useStore();
  const [isFetched , setIsfetched] = useState(false)


useEffect(()=>{
  if (store.products.length === 0) {
      async function fetchProductData() {
        const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      store.setProducts(data.products);
      setData(data.products)
      
      setIsfetched(true)

      }
      fetchProductData()
  }
  else {setData(store.products)
     setIsfetched(false)}
} , [])

 
  return (
    <div  className="dark:bg-gray-900 bg-gray-50 min-h-screen">
      <Navbar>
        
      </Navbar>


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
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 dark:text-white">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map(product => {
            return (
              <ProductCard 
                key={product.id}
                product={product}
              />
            )
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePage;