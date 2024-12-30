import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard - Pollarity";
  }, []);

  return <h1>Welcome to your Dashboard.</h1>;
}

export default Dashboard;
