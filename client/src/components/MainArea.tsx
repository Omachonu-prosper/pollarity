import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function MainArea({ children }: Props) {
  return <div className="grow relative">{children}</div>;
}

export default MainArea;
