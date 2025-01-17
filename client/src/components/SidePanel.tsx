import { Icon } from "@iconify-icon/react";
import SidePanelLink from "./SidePanelLink";

interface Props {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

function SidePanel({ setIsAuthenticated }: Props) {
  return (
    <div className="bg-gray-100 flex-initial w-60 h-screen sticky top-0 p-5">
      <h3 className="text-indigo-800 text-2xl ">
        Pollarity
        <Icon
          icon="fa6-solid:square-poll-horizontal"
          className="pl-1 text-3xl"
        />
      </h3>

      <ul className="mt-5 flex flex-col gap-5">
        <SidePanelLink icon="ri:chat-poll-line" link="/dashboard/polls">
          My polls
        </SidePanelLink>

        <SidePanelLink
          icon="mdi:poll-box-multiple-outline"
          link="/dashboard/poll/new"
        >
          New poll
        </SidePanelLink>

        <SidePanelLink
          icon="heroicons-outline:logout"
          link="/login"
          onClick={() => {
            setIsAuthenticated(false);
            sessionStorage.removeItem("AuthToken");
          }}
        >
          Logout
        </SidePanelLink>
      </ul>
    </div>
  );
}

export default SidePanel;
