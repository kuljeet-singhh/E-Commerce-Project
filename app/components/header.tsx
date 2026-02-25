"use client";
import Link from "next/link";
import { getUser, logoutUser } from "../utils/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [togal, setTogal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loggedUser = getUser();
    setTogal(!!loggedUser);
  }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    router.push("/loginForm");
  };

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
         <Link href="/"> MyApp</Link>
        </h1>

        {/* Button Area */}
        <div>
          {togal ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-medium transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/loginForm"
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-medium transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}



 