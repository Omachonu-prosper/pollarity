import { useEffect, useState } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/dashboard"
            element={<Dashboard setIsAuthenticated={setIsAuthenticated} />}
          />
        </Route>

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
