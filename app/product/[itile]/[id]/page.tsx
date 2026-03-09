// "use client";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ProductDetail() {
//   const [product, setProduct] = useState<any>(null);
//   const [count, setCount] = useState(0);

//   const params = useParams();
//   const id = params.id;

//   const increase = () => {
//     setCount((prev) => prev + 1);
//   };

//   const decrease = () => {
//     setCount((prev) => Math.max(prev - 1, 0));
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const res = await axios.get(`https://dummyjson.com/products/${id}`);
//       setProduct(res.data);
//     };

//     fetchProduct();
//   }, [id]);

//   if (!product) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md grid md:grid-cols-2 gap-10">
//         {/* IMAGE SECTION */}
//         <div className="flex flex-col items-center">
//           <img
//             src={product?.images?.[0]}
//             alt={product?.title}
//             className="w-full max-h-[400px] object-contain"
//           />

//           {/* <div className="flex gap-3 mt-4">
//             {product?.images?.slice(0, 4).map((img: string, i: number) => (
//               <img
//                 key={i}
//                 src={img}
//                 className="w-16 h-16 border rounded-md object-contain cursor-pointer"
//               />
//             ))}
//           </div> */}
//         </div>

//         {/* PRODUCT INFO */}
//         <div>
//           <p className="text-sm text-gray-500">{product?.brand}</p>

//           <h1 className="text-2xl font-bold mt-1">{product?.title}</h1>

//           <p className="text-gray-600 mt-3">{product?.description}</p>

//           {/* PRICE */}
//           <div className="mt-5">
//             <p className="text-3xl font-bold text-black">${product?.price}</p>
//             <p className="text-sm text-gray-500">Inclusive of all taxes</p>
//           </div>

//           {/* RATING */}
//           <div className="mt-3 text-sm text-gray-700">
//             ⭐ {product?.rating} rating
//           </div>

//           {/* STOCK */}
//           <div className="text-sm text-gray-500 mt-1">
//             {product?.stock} items available
//           </div>

//           {/* ADD TO CART */}
//           <div className="mt-6">
//             {count === 0 ? (
//               <button
//                 onClick={increase}
//                 className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
//               >
//                 ADD
//               </button>
//             ) : (
//               <div className="flex items-center gap-4 bg-green-600 text-white px-6 py-3 rounded-lg w-fit">
//                 <button onClick={decrease} className="text-xl">
//                   -
//                 </button>

//                 <span className="font-bold">{count}</span>

//                 <button onClick={increase} className="text-xl">
//                   +
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div>
//           {product.reviews.map((item, i) => (
//             <div key={i}>
//              <div>{item.rating}</div>
//               <div>{item.comment}</div>
//               <div>{item.date}</div>
//               <div>{item.reviewerName}</div>
//                <div>{item.reviewerEmail}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { UseCart } from "@/app/context/CartContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const [product, setProduct] = useState<any>(null);
 
  const { addToCart,removeFromCart,cart } = UseCart();
  
  const params = useParams();
  const id = params.id;

  

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    };

    fetchProduct();
  }, [id]);
const cartItem = cart.find((item) => item.id === product?.id);
  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-md shadow">
        {/* TOP PRODUCT SECTION */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={product?.images?.[0]}
              alt={product?.title}
              className="max-h-[400px] object-contain"
            />
          </div>

          {/* PRODUCT INFO */}
          <div>
            <p className="text-sm text-blue-600">{product?.brand}</p>

            <h1 className="text-3xl font-semibold mt-1">{product?.title}</h1>

            <div className="text-yellow-500 mt-2">
              ⭐ {product?.rating} rating
            </div>

            <hr className="my-4" />

            <p className="text-gray-700">{product?.description}</p>

            {/* PRICE */}
            <div className="mt-6">
              <span className="text-3xl font-bold text-red-600">
                ${product?.price}
              </span>

              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            {/* STOCK */}
            <p className="mt-3 text-green-700 font-semibold">
              In Stock ({product?.stock})
            </p>

            {/* ADD TO CART */}
            <div className="mt-6">
              {!cartItem  ? (
                <button
                  onClick={() => addToCart(product)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-md font-semibold"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-6 bg-yellow-400 px-6 py-3 rounded-md w-fit">
                  <button  onClick={()=>removeFromCart(product.id)}>-</button>
                  <span className="font-bold">{cartItem.quantity}</span>
                  <button onClick={()=>{addToCart(product)}}>+</button>
                </div>
              )}
            </div>

            <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-semibold">
              Buy Now
            </button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-3">Product Description</h2>

          <p className="text-gray-700">{product?.description}</p>
        </div>

        {/* REVIEWS */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-5">Customer Reviews</h2>

          {product?.reviews?.map((item: any, i: number) => (
            <div key={i} className="border-b py-5">
              <div className="text-yellow-500">⭐ {item.rating}</div>

              <p className="mt-1 text-gray-800">{item.comment}</p>

              <p className="text-sm text-gray-500 mt-2">
                Reviewed by <b>{item.reviewerName}</b>
              </p>

              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
