import { useEffect } from "react";
import { ProductCard } from "./ProductCard";
import {  ProductDetails } from "~/util/types";
import { useStore } from "~/store/state";
import { Loader } from "~/util/Loader";
import { data, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type Product = {
  url: string;
  mainText: string;
};

export function RenderProducts({ details }: { details: Product }) {
// const a =   useLoaderData<typeof loader>()
// console.log("a" , a)
  const store = useStore();

  // Fetch products and store them in the global store
  useEffect(() => {
    const fetchData = async () => {
      console.log("CALLED")
      const res = await fetch("http://localhost:3000/api/v1/product/p/all?page=1&size=30&field=name");
      const data = await res.json() ;
      store.setProducts(data.data as ProductDetails[]);
      // const data = await res.json() as ProductDetails[];
    };
    
    store.products.length === 0 ? fetchData(): null; // Call the function to fetch products on component mount
  }, []);
  console.log(store.products)

  return (
    <section className="container mx-auto px-4 py-12">
      <h3 className="text-3xl font-bold mb-8 dark:text-white">{details.mainText}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {store.products?.length ? (
          store.products.map((product: ProductDetails) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <Loader/>
        )}
      </div>
    </section>
  );
}
