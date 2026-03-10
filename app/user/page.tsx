"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "../utils/auth";
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold text-black">
            {user?.name?.charAt(0)}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Your Profile
        </h1>

        {/* Welcome */}
        {user && (
          <p className="text-center text-gray-600 mb-6">
            Welcome back,
            <span className="font-semibold text-gray-900 ml-1">
              {user.name}
            </span>
          </p>
        )}

        {/* Info Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {user?.name}
          </p>

          {user?.email && (
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          )}

          <p>
            <span className="font-semibold">Role:</span> {user?.role}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <Link
            href="/"
            className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition"
          >
            Home
          </Link>

          <button
            onClick={handleLogout}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}