"use client";

import Link from "next/link";
import { logoutUser } from "../utils/auth";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import CartIcon from "./CartBtn";
import { useSearch } from "../context/SearchContext";
import Category from "./category";

export default function Header() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const { search, setSearch } = useSearch();
  const pathname = usePathname();
  console.log("path", pathname);
  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50">
      {/* TOP NAV */}
      <div className="bg-[#131921] text-white">
        <div className="max-w-7xl mx-auto flex items-center gap-6 px-6 py-3">
          {/* LOGO */}
          <Link href="/" className="text-xl font-bold whitespace-nowrap">
            MyApp
          </Link>

          {/* SEARCH */}
          <div className="flex flex-1 items-center">
            {(pathname !== "/Cart" && pathname !== "/user" && !pathname.startsWith("/product") ) && 
              <div className="flex w-full rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 px-4 py-2 text-black outline-none bg-white"
                />

                <button className="bg-yellow-400 hover:bg-yellow-500 px-4 text-black font-semibold">
                  🔍
                </button>
              </div>
            }
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-5">
            {user && (
              <Link href="/user" className="text-sm hover:underline">
                Profile
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="text-sm hover:underline"
              >
                Logout
              </button>
            ) : (
              <Link href="/loginForm" className="text-sm hover:underline">
                Login
              </Link>
            )}

            <Link href="/Cart">
              <CartIcon />
            </Link>
          </div>
        </div>
      </div>

      {/* CATEGORY NAV */}
      <Category />
    </header>
  );
}
