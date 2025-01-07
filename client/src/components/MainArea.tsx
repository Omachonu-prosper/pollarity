import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function MainArea({ children }: Props) {
  return <div className="w-3/4 relative">{children}</div>;
}

export default MainArea;
