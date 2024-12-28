import { Navigate, Link } from "react-router";
import InputField from "../components/InputField";

interface Props {
  isAuthenticated: boolean;
}

function Login({ isAuthenticated }: Props) {
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="container mx-auto px-4 mt-16 max-w-md">
      <h1 className="mb-5 text-2xl font-semibold text-gray-900">Login</h1>

      <form>
        <InputField
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="john@example.com"
        />

        <InputField
          label="Passwod"
          type="password"
          name="password"
          id="password"
          placeholder="xxxxxx"
          classNames="mt-3"
        />

        <button className="bg-indigo-800 hover:bg-indigo-700 text-white py-2 px-3 mt-5 rounded w-full">
          Login
        </button>
      </form>

      <p className="mt-7">
        Don't have an account?{" "}
        <Link to="/signup" className="text-indigo-800 hover:text-indigo-700">
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
