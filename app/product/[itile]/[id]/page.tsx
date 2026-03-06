"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const [product, setProduct] = useState<any>(null);
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
  };
  const handle = () => {
    setCount(count - 1);
  };

  const params = useParams();
  const id = params.id;
  const title = params.title;
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);
  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">{product?.title}</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product?.images[0]}
          alt={product?.title}
          className="w-full object-contain"
        />

        <div>
          <p className="text-gray-600 mb-4">{product?.description}</p>

          <p className="text-2xl font-bold text-green-600">${product?.price}</p>

          <p className="mt-2">⭐ Rating: {product?.rating}</p>

          <p className="mt-2">Stock: {product?.stock}</p>

          <div className="mt-5 flex  w-40 bg-green-600 text-white px-6 py-3 rounded-lg " >
            {count ===0 ? (
              <button 
              onClick={handleCount}
              className=" cursor-pointer"
              >
                Add to Cart
              </button>
            ) : (
              <div  >
                <button className=" cursor-pointer" onClick={handle}> - </button> {count} <button className=" cursor-pointer" onClick={handleCount}> + </button>
              </div>
            )}
          </div>
        
        </div>
      </div>
    </div>
  );
}
