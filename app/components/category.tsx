"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Category() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      const res = await axios.get("https://dummyjson.com/products/categories");
      setList(res.data);
    };

    fetchList();
  }, []);

  return (
    <div className="bg-[#232f3e] text-white text-sm">
      <div className="max-w-7xl mx-auto flex items-center gap-6 px-6 py-2 overflow-x-auto">

        {/* ALL MENU */}
        {/* <div className="flex items-center gap-2 font-semibold cursor-pointer hover:underline">
          ☰ All
        </div> */}

        {list.map((item) => (
          <Link
            key={item.slug}
            href={`/category/${item.slug}`}
            className="whitespace-nowrap hover:underline"
          >
            {item.name}
          </Link>
        ))}

      </div>
    </div>
  );
}
