import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import axios from "axios";
import { AlertCircle, Heart, RailSymbol, RefreshCw, ShoppingCart, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import ReviewCard from "~/components/current/ReviewCard";
import { Button } from "~/components/ui/button";
import { useStore } from "~/store/state";
import { Loader } from "~/util/Loader";
import { Cart, ProductDetails, Review } from "~/util/types";

export const loader = async ({
  params
}: LoaderFunctionArgs) => {
  const productId = params.id;
  const [productRes, ratingRes] = await Promise.all([
    fetch(`http://localhost:3000/api/v1/product/id?productId=${productId}`),
    fetch(`http://localhost:3000/api/v1/rating/get?page=0&id=${productId}`)
  ]);
  const product = await productRes.json();
  const rating = await ratingRes.json();
  
  return { product:product.data as ProductDetails, rating:rating as Review[]  , loding:false};
};

const ProductDetailPage = () => {
  const {product , rating , loding} = useLoaderData<typeof loader>();
  const [isLoading , setIsLoading] = useState(false)
  const store = useStore();

  // setIsLoading(loding)
  const [quantitySelector, setQuantitySelector] = useState(1);

  // Fetch product data only once
  
  // Cart management
  const updateCartQuantity = async (productInfo: ProductDetails, updateType: string) => {
    const cartIndex = store.cart.findIndex(c => c.id === productInfo.id);
    
    if (cartIndex === -1) {
      // Adding new item to cart
      const newItem: Cart = {
        id: product!.id,
        image: product!.images[0],
        title: product!.name,
        price: discountedPrice,
        quantity: 1,
      };
      
      const cartNewItem = {
        productId: product!.id,
        quantity: 1
      };

      try {
        const response = await axios.post("http://localhost:3000/api/v1/cart/add", cartNewItem, {
          withCredentials: true
        });
        
        store.setCart([...store.cart, newItem]);
        setQuantitySelector(1);
      } catch (error) {
        console.error('Failed to add to cart:', error);
      }
    } else {
      // Update existing cart item
      const updatedCart = store.cart.map((c, i) => 
        i === cartIndex 
          ? { 
              ...c, 
              quantity: updateType === "increment" 
                ? Math.max(1, c.quantity + 1)
                : Math.max(1, c.quantity - 1) 
            }
          : c
      );
      
      store.setCart(updatedCart);
      setQuantitySelector(updateType === "increment" 
        ? quantitySelector + 1 
        : Math.max(1, quantitySelector - 1)
      );
    }
  };

  // Early return for loading or no product
  if (isLoading) return <Loader />;
  if (!product) return <div className="flex justify-center items-center h-screen">Product not found</div>;

  // Calculations
  const discountedPrice = product.price * 0.95; // 5% discount
  const averageRating = product.rating || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <div className="relative w-full h-[500px] mb-4">
            <img
              src={product.images[0] || '/placeholder.jpg'}
              alt={product.name}
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">{product.name}</h1>

          {/* Rating Section */}
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-gray-600">({rating.length} reviews)</span>
            </div>
            <span className="text-sm text-green-600">Available</span>
          </div>

          {/* Pricing Section */}
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-primary mr-4">
              {(discountedPrice).toFixed(2)}
            </span>
            {product.price && (
              <div className="flex items-center">
                <span className="line-through text-gray-400 mr-2">
                  {product.price}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                  5% OFF
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <button 
              onClick={() => updateCartQuantity(product, "decrement")}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-l"
            >
              -
            </button>
            <span className="px-4 py-1 bg-gray-100 dark:bg-gray-800">{quantitySelector}</span>
            <button
              onClick={() => updateCartQuantity(product, "increment")}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-r"
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <Button 
              className="flex-1" 
              size="lg" 
              onClick={() => updateCartQuantity(product, "increment")}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> 
              Add to Cart
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
              <span>{product.returnPeriod}</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="mr-2 text-primary" />
              <span>1 Year warranty</span>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            {rating.length > 0 ? (
              rating.map((review, index) => (
                <ReviewCard key={index} index={index} review={review} />
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;