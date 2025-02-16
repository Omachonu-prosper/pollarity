import { Icon } from "@iconify-icon/react";
import SidePanelLink from "./SidePanelLink";

interface Props {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setSidePanelOpen: (x: boolean) => void;
  sidePanelOpen: boolean;
}

function SidePanel({
  setIsAuthenticated,
  setSidePanelOpen,
  sidePanelOpen,
}: Props) {
  return (
    <div
      className={`bg-gray-100 flex-initial w-60 h-screen sm:sticky top-0 p-5 sm:block z-10 ${
        sidePanelOpen ? "fixed block" : "hidden"
      }`}
    >
      <Icon
        icon="formkit:close"
        className="sm:hidden text-2xl absolute top-3 right-4"
        onClick={() => {
          setSidePanelOpen(false);
        }}
      />

      <h3 className="text-indigo-800 text-2xl">
        Pollarity
        <Icon
          icon="fa6-solid:square-poll-horizontal"
          className="pl-1 text-3xl"
        />
      </h3>

      <ul className="mt-5 flex flex-col gap-5">
        <SidePanelLink
          onClick={() => {
            setSidePanelOpen(false);
          }}
          icon="ri:chat-poll-line"
          link="/dashboard/polls"
        >
          My polls
        </SidePanelLink>

        <SidePanelLink
          onClick={() => {
            setSidePanelOpen(false);
          }}
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
            setSidePanelOpen(false);
          }}
        >
          Logout
        </SidePanelLink>
      </ul>
    </div>
  );
}

export default SidePanel;
