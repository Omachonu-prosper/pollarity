import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Authentication from "./components/Authentication";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Authentication verification logic to come in here

  return <div>{isAuthenticated ? <Dashboard /> : <Authentication />}</div>;
}

export default App;
