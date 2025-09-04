import { useNavigate } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <FaExclamationTriangle className="text-6xl text-[#eb5e28] mb-6" />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
        Check the URL or go back to the homepage.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#023047] text-white px-6 py-3 rounded-lg hover:bg-[#023047] transition"
      >
        Go to Homepage
      </button>
    </div>
  );
}
