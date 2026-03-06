"use client";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
import { logoutUser } from "../utils/auth";
import useAuthGuard from "../utils/userAuthguard";

export default function Admine() {
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push("/loginForm");
  };
 const { user, loading } = useAuthGuard(["Admin"]);
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 text-white shadow-2xl rounded-2xl p-10 w-[420px] text-center border border-slate-700">
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">
          Admin Panel
        </h1>

        {/* Welcome */}
        {user && (
          <p className="text-lg mb-8 text-gray-300">
            Welcome Admin,{" "}
            <span className="font-semibold text-white">{user.name}</span> 👑
          </p>
        )}

        {/* Admin Info Box */}
        <div className="bg-slate-700 p-4 rounded-lg mb-8">
          <p className="text-sm text-gray-300">
            You have full system access.
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg font-medium transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}