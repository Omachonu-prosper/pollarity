import { ReactNode } from "react";
import { Icon } from "@iconify-icon/react";
import { NavLink } from "react-router";

interface Props {
  icon: string;
  link: string;
  children: ReactNode;
  onClick?: () => void;
}

function SidePanelLink({ children, icon, link, onClick }: Props) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => {
        let active = isActive ? "text-indigo-800" : "";
        return (
          active +
          " text-lg hover:cursor-pointer hover:text-indigo-800 active:text-indigo-800"
        );
      }}
      onClick={onClick}
    >
      {children} <Icon icon={icon} />
    </NavLink>
  );
}

export default SidePanelLink;
