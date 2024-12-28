import { useEffect, useState } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route
          path="/login"
          element={<Login isAuthenticated={isAuthenticated} />}
        />

        <Route
          path="/signup"
          element={<Signup isAuthenticated={isAuthenticated} />}
        />

        <Route
          index
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
