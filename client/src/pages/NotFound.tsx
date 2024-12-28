import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="rounded-lg bg-indigo-800 text-white text-center mt-10 max-w-2xl md:mx-auto px-5 py-16 mx-3">
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for does not exist. Go back
        <Link
          to="/"
          className="text-indigo-800 hover:text-indigo-700 bg-white rounded-lg py-1 px-2 ml-2"
        >
          Home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
