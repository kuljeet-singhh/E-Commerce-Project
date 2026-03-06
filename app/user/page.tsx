"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, logoutUser, User } from "../utils/auth";
import useAuthGuard from "../utils/userAuthguard";
import Link from "next/link";

export default function Userr() {
  const router = useRouter();

  const { user, loading } = useAuthGuard(["User"]);

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-[400px] text-center">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          User Profile
        </h1>

        {/* Welcome Text */}
        {user && (
          <p className="text-lg text-gray-600 mb-8">
            Welcome, <span className="font-semibold text-blue-600">{user.name}</span> 👋
          </p>
        )}

        {/* Logout Button */}
        <button
          // onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition duration-200"
        >
       <Link href="/">Home</Link>
        </button>
      </div>
    </div>
  );
}