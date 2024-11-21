import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ProductDetails } from "@/lib/state";


export const ProductCard = ( {product} :{product:ProductDetails}) => {



  return (
    <Card 
      className="w-full max-w-xs hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-lg"
    >
      <CardHeader>
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold">{product.title}</CardTitle>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-bold">{product.price * 50}</span>
           <Button><Link  href={`/product/${product.id}`}>Quick view</Link></Button>
        </div>
      </CardContent>
    </Card>
  );
};