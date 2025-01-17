import { useEffect, useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router";
import MainArea from "../components/MainArea";
import SidePanel from "../components/SidePanel";

interface Props {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

function Dashboard({ setIsAuthenticated }: Props) {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  useEffect(() => {
    document.title = "Dashboard - Pollarity";
  }, []);

  let loc = useLocation();

  if (loc.pathname == "/dashboard") return <Navigate to={"/dashboard/polls"} />;
  return (
    <div className="flex">
      <SidePanel
        sidePanelOpen={sidePanelOpen}
        setSidePanelOpen={setSidePanelOpen}
        setIsAuthenticated={setIsAuthenticated}
      />
      <MainArea
        sidePanelOpen={sidePanelOpen}
        setSidePanelOpen={setSidePanelOpen}
      >
        <Outlet />
      </MainArea>
    </div>
  );
}

export default Dashboard;
