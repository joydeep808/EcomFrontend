import { Link, NavLink } from "@remix-run/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ProductDetails } from "~/util/types";
import { useTransition } from "react";
import { Progress } from "~/components/ui/progress"
import toast from "react-hot-toast";

export function ProductCard ({product}:{product:ProductDetails}){
  const [isPending  ,setIsTransection] = useTransition();
 
  if(isPending){
    let value =0; 
    setTimeout(()=>{
      value=+1/50
      return<Progress value={value}  className=""/>
    } , 2000)

  }

  return <Card 
  className="w-full max-w-xs hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-lg"
>
  <CardHeader>
    {/* <Image 
    width={100}
    height={100}
      src={product.images[0]} 
      alt={product.title} 
      className="w-full h-48 object-cover rounded-t-lg"
    /> */}
    <img src={product.images[0]} alt={product.name} />
  </CardHeader>
  <CardContent className="p-4">
    <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
    <div className="flex justify-between items-center mt-2">
      <span className="text-primary font-bold">{product.price }</span>
       {/* <Button><Link  to={`/product/${product.id}`}>Quick view</Link></Button> */}
       <NavLink onClick={()=> setIsTransection(()=>{})} to={`/product/${product.id}` } key={product.id}>Quick view</NavLink>
    </div>
  </CardContent>
</Card>
}