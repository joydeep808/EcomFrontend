
import axios from 'axios';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { RazorPayOptions } from '~/constants';
import { useStore } from '~/store/state';

const CartPage = () => {
  const { cart, setCart } = useStore();

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price ) * item.quantity, 0);
  const tax = subtotal * 0.10; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over  100
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to your cart to see them here.</p>
      </div>
    );
  }


  const handleCheckout = async() => {
      const res = await axios.get("http://localhost:3000/api/v1/order/request",{
          withCredentials:true
      })
      if (!res.data.isSuccess) {
        toast(res.data.message , { position:"top-center"})
        return;
      }
      console.log(res.data)
    
    const razorpay = new (window as any).Razorpay(RazorPayOptions({
      amount:res.data.data.amount,
      orderId:res.data.data.id,
      name:"Joydeep Debnath",
      email:res.data.data.email
    }));
    razorpay.open();

  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img
                  width={100}
                  height={100}
                    src={item.image || "/api/placeholder/100/100"}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-600">
                      {(item.price).toFixed(2)} per item
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      
                      <span className="mx-2 min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="destructive"
                        size="icon"
                        className="ml-auto"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                       {(item.price  * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span> {subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span> {tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : ` {shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span> {total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                
                <p className="text-sm text-gray-600 mt-4">
                  Free shipping on orders over  100
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;