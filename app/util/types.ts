import axios from "axios";

export interface Review {
  id?:number
  productId: number
  rating: number;
  comment: string;
  createdAt: string;
  userId: string;
}

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  stock: number;
  brand: string;
  returnPeriod: string;
  color:string
  images: string[];
}

export interface Cart{
  id: number,
  image: string,
  title: string,
  price: number,
  quantity: number

}

interface Store {
  products: ProductDetails[];
  setProducts: (products: ProductDetails[]) => void;
  cart: Cart[],
  setCart: (cart: Cart[]) => void
  
}


// export const generateReview = (): Review => ({
//   rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
//   comment: `This is a review comment ${Math.random().toString(36).substr(2, 10)}`,
//   createdAt: new Date().toISOString(),
//   productId: Math.floor(Math.random() * 5) + 100,
//   user: `Reviewer ${Math.floor(Math.random() * 100) + 1}`,
// });

// export const generateProductDetails = (): ProductDetails[] => {

 

//   let value = 1
// const generateProduct = (): ProductDetails => ({
//     id:value++,
//     name: `Product Title ${Math.floor(Math.random() * 1000)}`,
//     description: `This is a description of Product Title ${Math.floor(Math.random() * 1000)}.`,
//     category: ['Electronics', 'Clothing', 'Home', 'Sports', 'Toys'][Math.floor(Math.random() * 5)],
//     price: Math.floor(Math.random() * 1000) + 10, // Random price between 10 and 1000
//     originalPrice:1000,
//     rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
//     stock: Math.floor(Math.random() * 100) + 1, // Random stock between 1 and 100
//     brand: `Brand ${Math.floor(Math.random() * 10) + 1}`,
//     returnPolicy: 30,
//     returnPeriod: '1-year warranty',
//     color: ["RED" , "GREEN" , "BLUE" , "WHITE" , "BLACK"][Math.floor(Math.random() * 4)],
//     images: [
//       `https://via.placeholder.com/150?text=Image+1`,
//       `https://via.placeholder.com/150?text=Image+2`,
//       `https://via.placeholder.com/150?text=Image+3`,
//     ],
//   });

//   return Array.from({ length: 100 }).map(generateProduct);
// };


const generateCategory = (): string => {
  return ['Electronics', 'Clothing', 'Home', 'Sports', 'Toys'][Math.floor(Math.random() * 5)];
};




const generateUser = ()=>{
  const id =  crypto.randomUUID().toString()
  return {
    username: id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    password: 'password',
    role: 'USER',
    status:"ACTIVE"
}
}


const createUser = async()=>{
  const res = await axios.post("http://localhost:3000/api/v1/user/register" , generateUser())
  console.log(res.data)
}

createUser()