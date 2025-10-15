import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-900 px-6 py-4 shadow-md">
      {/* Left side */}
      <div className="text-2xl font-bold text-white">
        Expense Tracker
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Link href="/ai-chat">
          <button className="bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-full shadow">
            💬 Chat with AI
          </button>
        </Link>
        <Link href="/sign-in">
          <button className="bg-transparent border border-indigo-500 text-indigo-400 hover:bg-indigo-600 hover:text-white transition px-4 py-2 rounded-full">
            Login
          </button>
        </Link>
        <Link href="/sign-up">
          <button className="bg-indigo-500 hover:bg-indigo-600 transition px-4 py-2 rounded-full text-white">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}
