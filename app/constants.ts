
type RazorPayParamOptions = {
    orderId:string , 
    name:string , 
    email:string , 
    amount:number
    
}

export function RazorPayOptions(options:RazorPayParamOptions){
    console.log("amount" , options.amount)
   return  {
        "key": "", // Enter the Key ID generated from the Dashboard
  "amount": options.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  "currency": "INR",
  "name": "Joydeep Debnath", //your business name
  "description": "Test Transaction",
  "image": "https://example.com/your_logo",
  "order_id": options.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  "callback_url": "http://localhost:3000/api/v1/order/callback",
  "redirect":false,
  "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
      "name": options.name, //your customer's name
      "email": options.email,
      "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

}

// M84as2wQMooE26QTeAq66fE9