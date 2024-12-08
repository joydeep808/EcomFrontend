import axios from "axios";
import { Star } from "lucide-react";
import { useState } from "react";

type Review = {
  
};
type ReviewCardProps = {
  index: number
  review:{
    id?:number
    productId: number
    rating: number;
    comment: string;
    createdAt: string;
    userId: string;
  }
}

export default function ReviewCard({ review , index}: ReviewCardProps) {
  

  

  return  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
  <div className="flex justify-between items-center mb-2">
    <span className="font-semibold">{review.userId}</span>
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
  <span className="text-sm text-gray-500 mt-2">
    {new Date(review.createdAt).toLocaleDateString()}
  </span>
</div>
}