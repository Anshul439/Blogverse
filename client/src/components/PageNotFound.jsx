import { MdErrorOutline } from "react-icons/md"; // Import the sad cry icon
import { useSelector } from "react-redux"; // Import useSelector from Redux
import { Link } from "react-router-dom"; // Import Link for navigation

const PageNotFound = () => {
  const { theme } = useSelector((state) => state.theme); // Access the theme from Redux

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen w-full ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gradient-to-r from-gray-100 to-white text-gray-800"
      } relative overflow-hidden`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('https://your-light-theme-image-url.com')", // Replace with your image URL
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center">
        <MdErrorOutline className="text-6xl mb-4 animate-bounce" />
        <h1 className="text-8xl font-extrabold animate-pulse">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
        <p className="mt-2 text-lg">
          The page you're looking for doesn't seem to exist. Let's help you find your way back!
        </p>
        <Link
          to="/"
          className="mt-6 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white transition duration-300 transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
