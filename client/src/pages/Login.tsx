import { Navigate, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { login } from "../services/api";
import Alert from "../components/Alert";
import InputField from "../components/InputField";

interface Props {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

function Login({ isAuthenticated, setIsAuthenticated }: Props) {
  useEffect(() => {
    document.title = "Login - Pollarity";
  }, []);

  const navigate = useNavigate();
  const [alertState, setAlertState] = useState({
    display: false,
    color: "",
    message: "",
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [reqPending, setReqPending] = useState(false);

  function onChangeListener(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function showAlert(message: string, color: string) {
    setAlertState({
      display: true,
      color: color,
      message: message,
    });
    setTimeout(() => {
      setAlertState({
        display: false,
        color: "",
        message: "",
      });
    }, 5000);
  }

  async function onSubmitHandler() {
    setReqPending(true);
    let apiReq = await login(form.email, form.password);
    if (apiReq.success) {
      setIsAuthenticated(true);
      sessionStorage.setItem("AuthToken", apiReq.token);
      navigate("/dashboard");
    } else {
      showAlert(apiReq.message, "bg-red-400");
    }
    setTimeout(() => {
      setReqPending(false);
    }, 200);
  }

  if (isAuthenticated) return <Navigate to="/dashboard" />;
  return (
    <div className="container mx-auto px-4 mt-16 max-w-md">
      <Alert
        display={alertState.display}
        color={alertState.color}
        message={alertState.message}
      />

      <h1 className="mb-5 text-2xl font-semibold text-gray-900">Login</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler();
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

        <button className="bg-indigo-800 hover:bg-indigo-700 text-white py-2 px-3 mt-5 rounded-md w-full flex justify-center items-center gap-3">
          <div>Login</div>
          <div
            className={`w-5 h-5 border-dotted rounded-full border-2 border-white ${
              reqPending ? "animate-spin block" : "hidden animate-none"
            }`}
          ></div>
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
