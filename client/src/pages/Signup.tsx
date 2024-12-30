import { useState } from "react";
import { signup } from "../services/api";
import { Navigate, Link } from "react-router";
import InputField from "../components/InputField";
import Alert from "../components/Alert";

interface Props {
  isAuthenticated: boolean;
}

function Signup({ isAuthenticated }: Props) {
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const [form, setForm] = useState({
    username: "",
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

  return (
    <div className="container mx-auto px-4 mt-16 max-w-md">
      <Alert />

      <h1 className="mb-5 text-2xl font-semibold text-gray-900">Signup</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup(form.username, form.email, form.password);
        }}
      >
        <InputField
          label="Username"
          type="text"
          name="username"
          id="username"
          placeholder="John Doe"
          required={true}
          onChange={onChangeListener}
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="john@example.com"
          classNames="mt-3"
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
          required={true}
          onChange={onChangeListener}
        />

        <button className="bg-indigo-800 hover:bg-indigo-700 text-white py-2 px-3 mt-5 rounded-md w-full">
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
