import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

// export async function action({
//   request,
// }: ActionFunctionArgs) {
//   const body = await request.formData();
//   const email = body.get("email") as string
//   return email;
// }

export default function Login() {

  const FormSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
   const response = await  fetch("http://localhost:3000/api/v1/user/login",{
      method:"POST",
      body:JSON.stringify({email,password}) ,
      headers:{
        "Content-Type":"application/json"
      },
    credentials:"include"
    })
    const result = await response.json()
    console.log(result)
  }
 

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-5xl font-bold">Login</h1> 
      <Form onSubmit={FormSubmit} method="post">
        <input type="email" name="email" placeholder="Email" className="border border-gray-300 rounded-md p-2" />
        <input type="password" name="password" placeholder="Password" className="border border-gray-300 rounded-md p-2" />
        <button type="submit" className="bg-primary text-white rounded-md p-2">Login</button>
      </Form>
    </div>
  )
  
}