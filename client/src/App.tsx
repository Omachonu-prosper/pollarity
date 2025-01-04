import { useEffect, useState } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import MyPolls from "./pages/MyPolls";
import NewPoll from "./pages/NewPoll";
import UserPoll from "./pages/UserPoll";
import PollPage from "./pages/Poll";

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("AuthToken");
    try {
      const decoded: DecodedToken = jwtDecode(token ? token : "");
      const now = Date.now();
      if (decoded.exp && decoded.exp * 1000 > now) {
        setIsAuthenticated(true);
      } else {
        throw new Error("Expired token");
      }
    } catch {
      setIsAuthenticated(false);
      sessionStorage.removeItem("AuthToken");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/dashboard"
            element={<Dashboard setIsAuthenticated={setIsAuthenticated} />}
          >
            <Route path="polls" element={<MyPolls />} />
            <Route path="poll/new" element={<NewPoll />} />
            <Route path="poll/:pollRef" element={<UserPoll />} />
          </Route>
        </Route>

        <Route path="/poll/:pollRef" element={<PollPage />} />

        <Route
          path="/login"
          element={
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />

        <Route
          path="/signup"
          element={
            <Signup
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />

        <Route
          index
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
