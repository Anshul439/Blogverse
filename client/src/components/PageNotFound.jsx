import { Link } from "react-router-dom";
import { FaSadCry } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gradient-to-r from-gray-100 to-white text-gray-800 relative overflow-hidden">
      
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('https://your-light-theme-image-url.com')" }}
      ></div>

      
      <div className="relative z-10 flex flex-col justify-center items-center text-center">
        <FaSadCry className="text-6xl mb-4 text-gray-600 animate-bounce" />
        <h1 className="text-8xl font-extrabold text-gray-700 animate-pulse">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
        <p className="mt-2 text-lg text-gray-500">
          The page you're looking for doesn't seem to exist. Let's help you find your way back!
        </p>
        <Link
          to="/"
          className="mt-6 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white shadow-lg transition duration-300 transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
