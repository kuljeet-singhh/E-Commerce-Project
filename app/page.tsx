import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-zinc-900 font-sans">
      
      <div className="bg-white dark:bg-zinc-800 shadow-xl rounded-3xl p-12 text-center max-w-lg w-full border border-zinc-200 dark:border-zinc-700">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-zinc-800 dark:text-white mb-4">
          Welcome Home 👋
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-600 dark:text-zinc-300 mb-8">
          This is your role-based authentication demo app built with Next.js, Formik, and Tailwind.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/loginForm"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Login
          </Link>

          <Link
            href="/user"
            className="bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 px-6 py-3 rounded-xl font-medium transition"
          >
            Dashboard
          </Link>
        </div>

      </div>

    </div>
  );
}