// "use client";

// import { Trash2 } from "lucide-react";
// import { UseCart } from "../context/CartContext";

// export default function Cart() {
//   const { addToCart, removeFromCart, cart } = UseCart();

//   const totalItems = cart.reduce(
//     (sum, item) => sum + item.quantity,
//     0
//   );

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">

//       <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

//         {/* LEFT SIDE (PRODUCT LIST) */}
//         <div className="md:col-span-2 bg-white p-6 rounded-md">

//           <h1 className="text-2xl font-semibold border-b pb-3 mb-4">
//             Shopping Cart
//           </h1>

//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex gap-6 border-b py-6"
//             >

//               {/* PRODUCT IMAGE */}
//               <img
//                 src={item.image}
//                 className="w-32 h-32 object-contain"
//               />

//               {/* PRODUCT DETAILS */}
//               <div className="flex-1">

//                 <h2 className="font-semibold text-lg">
//                   {item.title}
//                 </h2>

//                 <p className="text-green-700 text-sm mt-1">
//                   In Stock
//                 </p>

//                 <p className="text-lg font-bold mt-2">
//                   ${item.price}
//                 </p>

//                 {/* QUANTITY CONTROLS */}
//                 <div className="flex items-center gap-3 mt-3 border rounded-md px-3 py-1 w-fit">

//   {item.quantity === 1 ? (
//     <button
//       onClick={() => removeFromCart(item.id)}
//       className="text-red-500 hover:text-red-700"
//     >
//       <Trash2 size={18} />
//     </button>
//   ) : (
//     <button
//       onClick={() => removeFromCart(item.id)}
//       className="font-bold text-lg"
//     >
//       -
//     </button>
//   )}

//   <span className="font-semibold">{item.quantity}</span>

//   <button
//     onClick={() => addToCart(item)}
//     className="font-bold text-lg"
//   >
//     +
//   </button>

// </div>

//               </div>
//             </div>
//           ))}

//         </div>

//         {/* RIGHT SIDE (SUBTOTAL BOX) */}
//         <div className="bg-white p-6 rounded-md h-fit">

//           <p className="text-lg">
//             Subtotal ({totalItems} items):
//           </p>

//           <p className="text-2xl font-bold mt-2">
//             ${subtotal.toFixed(2)}
//           </p>

//           <button className="bg-yellow-400 hover:bg-yellow-500 w-full py-3 rounded-md font-semibold mt-5">
//             Proceed to Checkout
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }



"use client";

import { Trash2 } from "lucide-react";
import { UseCart } from "../context/CartContext";

export default function Cart() {
  const { addToCart, removeFromCart, cart } = UseCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#EAEDED] min-h-screen p-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT CART ITEMS */}
        <div className="md:col-span-2 bg-white p-6">

          <h1 className="text-3xl font-medium border-b pb-4">
            Shopping Cart
          </h1>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 py-6 border-b"
            >

              {/* IMAGE */}
              <img
                src={item.image}
                className="w-36 h-36 object-contain"
              />

              {/* DETAILS */}
              <div className="flex flex-col flex-1">

                <h2 className="text-lg font-medium hover:text-[#C7511F] cursor-pointer">
                  {item.title}
                </h2>

                <p className="text-green-600 text-sm mt-1">
                  In Stock
                </p>

                <p className="text-sm text-gray-600">
                  {item.shippingInformation }
                </p>

               

                {/* QUANTITY + DELETE */}
                <div className="flex items-center gap-4 mt-3">

                  <div className="flex items-center border rounded-md px-3 py-1">

                    {item.quantity === 1 ? (
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-2 text-lg"
                      >
                        -
                      </button>
                    )}

                    <span className="px-3">{item.quantity}</span>

                    <button
                      onClick={() => addToCart(item)}
                      className="px-2 text-lg"
                    >
                      +
                    </button>

                  </div>

                  {/* Amazon style actions */}
                  <button className="text-sm text-blue-600 hover:underline">
                    Delete
                  </button>

                  
                </div>

              </div>

              {/* PRICE */}
              <div className="text-lg font-semibold">
                ${item.price}
              </div>

            </div>
          ))}

        </div>

        {/* RIGHT SUBTOTAL BOX */}
       <div className="bg-white p-6 h-fit sticky top-6 border shadow-sm rounded-md">

          <p className="text-lg">
            Subtotal ({totalItems} items):
            <span className="font-bold ml-2">
              ${subtotal.toFixed(2)}
            </span>
          </p>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <input type="checkbox" />
            <span>This order contains a gift</span>
          </div>

          <button className="bg-[#FFD814] hover:bg-[#F7CA00] w-full py-3 rounded-md mt-4 font-medium">
            Proceed to Checkout
          </button>

        </div>

      </div>

    </div>
  );
}