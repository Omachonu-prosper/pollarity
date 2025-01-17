import { ReactNode } from "react";
import { Icon } from "@iconify-icon/react";

interface Props {
  children: ReactNode;
  setSidePanelOpen: (x: boolean) => void;
  sidePanelOpen: boolean;
}

function MainArea({ children, sidePanelOpen, setSidePanelOpen }: Props) {
  return (
    <div
      className="grow relative"
      onClick={() => {
        sidePanelOpen ? setSidePanelOpen(false) : null;
      }}
    >
      <div className="flex gap-2 mt-3 mx-2 sm:hidden">
        <Icon
          icon="solar:hamburger-menu-broken"
          style={{ fontSize: "3rem" }}
          className="cursor-pointer hover:text-indigo-800"
          onClick={() => {
            setSidePanelOpen(true);
          }}
        />
        <h3 className="text-indigo-800 text-2xl ">
          Pollarity
          <Icon
            icon="fa6-solid:square-poll-horizontal"
            className="pl-1 text-3xl"
          />
        </h3>
      </div>
      {children}
    </div>
  );
}

export default MainArea;
