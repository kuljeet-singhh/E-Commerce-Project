"use client";

import { UseCart } from "@/app/context/CartContext";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Category() {
  const params = useParams();
  const category = params.slug;

  const [products, setProducts] = useState([]);

  const { addToCart, cart } = UseCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );

      setProducts(res.data.products);
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative bg-white border rounded-lg p-3 hover:shadow-lg transition"
        >
          {/* Discount Badge */}
          {product.discountPercentage > 5 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}

          <Link
            href={`/product/${product.title
              .toLowerCase()
              .replace(/\s+/g, "-")}/${product.id}`}
          >
            {/* Image */}
            <div className="h-40 flex items-center justify-center mb-3">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
              {product.title}
            </h3>

            {/* Rating */}
            <p className="text-xs text-yellow-600 mt-1">
              ⭐ {product.rating} rating
            </p>
          </Link>

          {/* Price + Cart */}
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-lg font-bold text-gray-900">
                ${product.price}
              </p>

              {product.discountPercentage > 5 && (
                <p className="text-xs text-gray-400 line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </p>
              )}
            </div>

            <button
              onClick={() => addToCart(product)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded"
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}