import { useEffect } from "react"
import axios from "axios"
import { Button } from "~/components/ui/button";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useStore } from "~/store/state";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({
  context
}: LoaderFunctionArgs) => {
 return  useStore.getInitialState().products
}


export  default function P(){
  const a = useLoaderData<typeof loader>()
  console.log(a)

  async function sendCookies() {
   const res = await axios.get("http://localhost:3000/api/v1/order/request",{
    withCredentials:true,
   });
    console.log(res.data)
  }

    // useEffect(()=>{

    //   sendCookies()
    // },[])

    async function BuyNow(){
      const options = {
        "razorpay_order_id": crypto.randomUUID().toString(),
        "razorpay_signature":crypto.randomUUID().toString(),
        "razorpay_payment_id":crypto.randomUUID().toString()
        
      }
      const res = await axios.post("http://localhost:3000/api/v1/order/callback",options)
      console.log(res.data)

    }

  return <div className="">
  <h1 className="text-black dark:text-white">Your Heading</h1>
  <button onClick={sendCookies}> Click Now</button>
  <button onClick={BuyNow}>Buy Now</button>
</div>
}