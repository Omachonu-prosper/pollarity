import { Navigate, Link } from "react-router";
import { useState, useEffect } from "react";
import InputField from "../components/InputField";

interface Props {
  isAuthenticated: boolean;
}

function Login({ isAuthenticated }: Props) {
  useEffect(() => {
    document.title = "Login - Pollarity";
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function onChangeListener(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  if (isAuthenticated) return <Navigate to="/dashboard" />;
  return (
    <div className="container mx-auto px-4 mt-16 max-w-md">
      <h1 className="mb-5 text-2xl font-semibold text-gray-900">Login</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
          console.log(form);
        }}
      >
        <InputField
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="john@example.com"
          required={true}
          onChange={onChangeListener}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="xxxxxx"
          classNames="mt-3"
          onChange={onChangeListener}
        />

        <button className="bg-indigo-800 hover:bg-indigo-700 text-white py-2 px-3 mt-5 rounded-md w-full">
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
