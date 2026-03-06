"use client";
import Link from "next/link";
import { logoutUser } from "../utils/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  console.log("user", user);
  // useEffect(() => {
  //   const loggedUser = getUser();
  //   console.log("terterwer4")
  //   // eslint-disable-next-line react-hooks/set-state-in-effect
  //   setTogal(!!loggedUser);
  // }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push("/");
  };

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          <Link href="/"> MyApp</Link>
        </h1>

        {/* Button Area */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-medium transition duration-200">
              <Link href="/user">Profile</Link>
            </div>
          )}

          {user ? (
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
