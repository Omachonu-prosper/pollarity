import { useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router";
import MainArea from "../components/MainArea";
import SidePanel from "../components/SidePanel";

interface Props {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

function Dashboard({ setIsAuthenticated }: Props) {
  useEffect(() => {
    document.title = "Dashboard - Pollarity";
  }, []);

  let loc = useLocation();

  if (loc.pathname == "/dashboard") return <Navigate to={"/dashboard/polls"} />;
  return (
    <div className="flex">
      <SidePanel setIsAuthenticated={setIsAuthenticated} />
      <MainArea>
        <Outlet />
      </MainArea>
    </div>
  );
}

export default Dashboard;
