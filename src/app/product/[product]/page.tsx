"use client"
import { ShoppingCart, Heart, Star, AlertCircle, Truck, RefreshCw, CloudCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import { Cart, useStore } from '@/lib/state';
import { useParams } from 'next/navigation';
import { Loader } from '@/components/Loader';

// TypeScript Interfaces
interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

interface ProductDetails {
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
const ProductDetailPage = () => {
  const params:{product: string} = useParams();
  const productId = params.product;

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const store = useStore();

  // Check if the product is in the store
  useEffect(() => {
    const existingProduct = store.products.find((p) => p.id === parseInt(productId));

    if (existingProduct) {
      setProduct(existingProduct);
      setIsLoading(false);
    } else {
      // Fetch the product if it's not in the store
      async function fetchProductData() {
        try {
          const res = await fetch(`https://dummyjson.com/products/${productId}`);
          const data = await res.json();
          setProduct(data);  // Set the product state after fetching data
          setIsLoading(false);  // Set loading to false after data is fetched
        } catch (error) {
          console.error('Failed to fetch product data:', error);
          setIsLoading(false);  // Ensure loading is finished even in case of error
        }
      }

      fetchProductData();
    }
  }, [productId, store.products]); 
   // Dependencies: runs when productId or store.products change
  if (isLoading) {
    return (
      <Loader/>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Product not found</p>
      </div>
    );
  }


  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const averageRating = product.rating;
  const handleAddToCart = (product: ProductDetails) => {
    // Check if the product is already in the cart
    const isAddedAlready = store.cart.find(cart => cart.id === product.id);
  
    if (isAddedAlready) {
      // If the product is already in the cart, increase the quantity
      const updatedCart = store.cart.map(cartItem => 
        cartItem.id === product.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // Increase quantity
          : cartItem // Keep the other items unchanged
      );
  
      store.setCart(updatedCart);
      console.log(updatedCart);
    } else {
      // If the product is not in the cart, add it
      const newProduct: Cart = {
        id: product.id,
        image: product.images[0],
        title: product.title,
        price: discountedPrice * 50,
        quantity: 1, // Initial quantity is 1
      };
  
      const updatedCart = [...store.cart, newProduct]; // Create a new array with the new product
      store.setCart(updatedCart);
    }
  };
  

 

  


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="relative w-full h-[500px] mb-4">
            <Image
              src={product.images[0] || '/placeholder.jpg'}
              alt={product.title}
              width={500} height={500}
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                className="w-20 h-20 relative cursor-pointer"
                onClick={() => console.log('Image clicked')}
              >
                <Image
                  src={img || '/placeholder.jpg'}
                  alt={`${product.title} view ${index + 1}`}
                  width={100} height={100}
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">{product.title}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-gray-600">({product.reviews.length} reviews)</span>
            </div>
            <span className="text-sm text-green-600">{product.availabilityStatus}</span>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-primary mr-4">{(discountedPrice * 50).toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <div className="flex items-center">
                <span className="line-through text-gray-400 mr-2">{(product.price).toFixed(2) }</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                  {product.discountPercentage.toFixed(0)}% OFF
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <button
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-l"
            >
              -
            </button>
            <span className="px-4 py-1 bg-gray-100 dark:bg-gray-800">1</span>
            <button
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-r"
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <Button className="flex-1" size="lg" onClick={() => handleAddToCart(product)} >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <Heart className="mr-2 h-5 w-5" /> Wishlist
            </Button>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center">
              <Truck className="mr-2 text-primary" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center">
              <RefreshCw className="mr-2 text-primary" />
              <span>{product.returnPolicy}</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="mr-2 text-primary" />
              <span>{product.warrantyInformation}</span>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{review.reviewerName}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                <span className="text-sm text-gray-500 mt-2">{new Date(review.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
