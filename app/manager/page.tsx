"use client";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
import {  logoutUser} from "../utils/auth";
import useAuthGuard from "../utils/userAuthguard";

export default function Manager() {
const router = useRouter();
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loggedUser = getUser();
  //   if (!loggedUser) {
  //     router.push("/loginForm");
  //   } else {
  //     setUser(loggedUser);
  //   }
  //   setLoading(false);
  // }, [router]);

  const handleLogout = () => {
    logoutUser();
    router.push("/loginForm");
  };
   const { user, loading } = useAuthGuard(["Manager"]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px] text-center">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Manager Dashboard
        </h1>

        {/* Welcome Message */}
        {user && (
          <p className="text-lg text-gray-700 mb-8">
            Welcome,{" "}
            <span className="font-semibold text-blue-600">{user.name}</span>
          </p>
        )}

        {/* Info Section */}
        <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-8">
          <p className="text-sm">
            You can manage teams, review reports, and track performance.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}