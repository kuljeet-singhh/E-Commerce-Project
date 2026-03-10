"use client";
import axios from "axios";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { UseCart } from "./context/CartContext";
import Category from "./components/category";
import { useSearch } from "./context/SearchContext";

type FilterType = {
  category: string[];
  price: { min: string; max: string };
  rating: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProduct] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const { addToCart, removeFromCart, cart } = UseCart();
  const {search }=useSearch();
  const cartItem = cart.find((item) => item.id === products?.id);
  // const router = useRouter();

  const [debouncedValue] = useDebounce(search, 700);

  const [filters, setFilter] = useState<FilterType>({
    category: [],
    price: { min: "", max: "" },
    rating: "",
  });
  const hasFilter = Object.values(filters).some((value) => {
    if (Array.isArray(value)) {
      return value.length > 0; // category
    }

    if (typeof value === "object") {
      return value.min !== "" || value.max !== ""; // price
    }

    return value !== ""; // rating
  });
  console.log("filter", hasFilter);
  console.log("o", Object.values(filters));
  const categories = ["beauty", "fragrances", "groceries", "furniture"];

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${debouncedValue}&limit=0`,
        );

        setAllProducts(response.data.products);
        setProduct(response.data.products);
      } catch (error) {
        setError("Something went wrong.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedValue]);

  /* ================= APPLY FILTER ================= */

  const applyFilter = (
    category = filters.category,
    min = filters.price.min,
    max = filters.price.max,
    rating = filters.rating,
  ) => {
    let filtered = [...allProducts];

    if (category.length > 0) {
      filtered = filtered.filter((product) =>
        category.includes(product.category),
      );
    }

    if (min && max) {
      filtered = filtered.filter(
        (p) => p.price >= Number(min) && p.price <= Number(max),
      );
    }

    if (rating) {
      filtered = filtered.filter((p) => p.rating >= Number(rating));
    }
    setProduct(filtered);
  };

  /* ================= PRICE FILTER ================= */

  const handlePriceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [min, max] = e.target.value.split("-");

    setFilter((prev) => ({
      ...prev,
      price: { min, max },
    }));

    applyFilter(filters.category, min, max, filters.rating);
  };

  /* ================= CATEGORY FILTER ================= */

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFilter((prev) => {
      const alreadySelected = prev.category.includes(value);

      const updatedCategories = alreadySelected
        ? prev.category.filter((cat) => cat !== value)
        : [...prev.category, value];
      applyFilter(
        updatedCategories,
        prev.price.min,
        prev.price.max,
        prev.rating,
      );
      return {
        ...prev,
        category: updatedCategories,
      };
    });

    //applyFilter(category, filters.price.min, filters.price.max, filters.rating);
  };
  // console.log(filters);
  /* ================= RATING FILTER ================= */

  const handleRatingFilter = (e: any) => {
    const rating = e.target.value;

    setFilter((prev) => ({
      ...prev,
      rating,
    }));

    applyFilter(filters.category, filters.price.min, filters.price.max, rating);
  };

  const clearFilters = () => {
    setFilter({
      category: [],
      price: { min: "", max: "" },
      rating: "",
    });

    setProduct(allProducts);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 font-sans">
      {/* <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Product List
      </h1> */}
   
      {/* SEARCH */}
      {/* <div className="flex justify-center mb-8 w-[90%] ">
        <div className="relative w-[90%] ">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
            🔍
          </span>

          <input
            className="w-full  max-w-[90%] pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 text-base outline-none bg-white shadow-md"
            placeholder="Search products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div> */}

      <div className="flex gap-6">
        {/* SIDEBAR */}

        <div className="w-72 bg-white rounded-xl shadow-sm p-5 h-fit sticky top-40">
          {/* CATEGORY */}

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Category</h2>

            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="category"
                  value={cat}
                  checked={filters.category.includes(cat)}
                  onChange={handleCategoryFilter}
                />
                {cat}
              </label>
            ))}
          </div>

          {/* PRICE */}

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Price Range</h2>

            <label className="flex gap-2 text-sm">
              <input
                type="radio"
                name="price"
                value="0-20"
                checked={
                  filters.price.min === "0" && filters.price.max === "20"
                }
                onChange={handlePriceFilter}
              />
              Under $20
            </label>

            <label className="flex gap-2 text-sm">
              <input
                type="radio"
                name="price"
                value="20-50"
                checked={
                  filters.price.min === "20" && filters.price.max === "50"
                }
                onChange={handlePriceFilter}
              />
              $20 - $50
            </label>

            <label className="flex gap-2 text-sm">
              <input
                type="radio"
                name="price"
                value="50-100"
                checked={
                  filters.price.min === "50" && filters.price.max === "100"
                }
                onChange={handlePriceFilter}
              />
              $50 - $100
            </label>
          </div>

          {/* RATING */}

          <div>
            <h2 className="text-lg font-semibold mb-3">Rating</h2>

            <label className="flex gap-2 text-sm">
              <input
                type="radio"
                name="rating"
                value="4"
                checked={filters.rating === "4"}
                onChange={handleRatingFilter}
              />
              ⭐ 4 & above
            </label>

            <label className="flex gap-2 text-sm">
              <input
                type="radio"
                name="rating"
                value="3"
                checked={filters.rating === "3"}
                onChange={handleRatingFilter}
              />
              ⭐ 3 & above
            </label>
          </div>
          {/* CLEAR FILTERS */}

          {hasFilter && (
            <div className="mt-6">
              <button
                onClick={clearFilters}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* PRODUCTS */}

        <div className="flex-1">
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {products.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <p className="text-xl font-semibold text-gray-700">
                  No Products Found
                </p>

                {hasFilter && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              products.map((product) => (
                // <div
                //   key={product.id}
                //   className=" cursor-pointer hover:scale-105 transition bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 border"
                // >
                //   <Link
                //     key={product.id}
                //     href={`/product/${product.title
                //       .toLowerCase()
                //       .replace(/\s+/g, "-")}/${product.id}`}
                //   >
                //     {product.discountPercentage > 5 && (
                //       <div className="absolute bg-blue-600 text-white text-xs px-2 py-1 rounded">
                //         {Math.round(product.discountPercentage)}% OFF
                //       </div>
                //     )}

                //     <div className="h-36 flex items-center justify-center mb-3">
                //       <img
                //         src={product.images[0]}
                //         alt={product.title}
                //         className="h-full object-contain"
                //       />
                //     </div>

                //     <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                //       {product.title}
                //     </h3>

                //     <p className="text-xs text-gray-500 mt-1">
                //       {product.stock}
                //     </p>
                //   </Link>
                //   <div className="flex items-center justify-between mt-3">
                //     <div>
                //       <p className="text-base font-bold text-gray-900">
                //         ${product.price}
                //       </p>
                //       {product.discountPercentage > 5 && (
                //         <p className="text-xs text-gray-400 line-through">
                //           $
                //           {(
                //             product.price /
                //             (1 - product.discountPercentage / 100)
                //           ).toFixed(2)}
                //         </p>
                //       )}
                //     </div>

                //     {!cartItem ? (
                //       <button
                //         onClick={() => addToCart(product)}
                //         className="border border-green-600 text-green-600 px-4 py-1 text-sm font-semibold rounded-lg hover:bg-green-600 hover:text-white transition"
                //       >
                //         ADD
                //       </button>
                //     ) : (
                //       <div className="flex items-center gap-3 border border-green-600 rounded-lg px-3 py-1">
                //         <button onClick={() => removeFromCart(product.id)}>
                //           -
                //         </button>
                //         <span className="font-bold">{cartItem.quantity}</span>
                //         <button onClick={() => addToCart(product)}>+</button>
                //       </div>
                //     )}
                //   </div>
                // </div>
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
