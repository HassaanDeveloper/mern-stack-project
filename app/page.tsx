import Navbar from "@/components/Navbar";  // <-- import it
import ExpenseTracker from "@/components/expense_tracker";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white px-4 py-6">
        <Navbar /> 

        {/* Main content */}
        <div className="mt-6">
          <ExpenseTracker />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2025 True Feedback. All rights reserved.
      </footer>
    </>
  );
}
