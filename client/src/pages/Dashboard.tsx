import { useEffect } from "react";
import { Link } from "react-router";

interface Props {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

function Dashboard({ setIsAuthenticated }: Props) {
  useEffect(() => {
    document.title = "Dashboard - Pollarity";
  }, []);

  return (
    <h1>
      Welcome to your Dashboard.
      <Link to={"/login"} onClick={() => setIsAuthenticated(false)}>
        Logout
      </Link>{" "}
    </h1>
  );
}

export default Dashboard;
