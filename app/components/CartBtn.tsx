"use client";

import { ShoppingCart } from "lucide-react";
import { UseCart } from "../context/CartContext";

export default function CartIcon() {
  const { cart } = UseCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="relative flex items-center gap-1 cursor-pointer">
      {/* Cart Icon */}
      <ShoppingCart className="w-7 h-7 text-white" />

      {/* Cart Text */}
      {/* <span className="text-white font-semibold hidden md:block">
        Cart
      </span> */}

      {/* Cart Count */}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}
