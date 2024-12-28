import InputField from "../components/InputField";
import { Navigate, Link } from "react-router";

interface Props {
  isAuthenticated: boolean;
}

function Signup({ isAuthenticated }: Props) {
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="container mx-auto px-4 mt-16 max-w-md">
      <h1 className="mb-5 text-2xl font-semibold text-gray-900">Signup</h1>

      <form>
        <InputField
          label="Username"
          type="text"
          name="username"
          id="username"
          placeholder="John Doe"
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="john@example.com"
          classNames="mt-3"
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
          Signup
        </button>
      </form>

      <p className="mt-7">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-800 hover:text-indigo-700">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
