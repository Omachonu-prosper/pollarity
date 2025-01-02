import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function MainArea({ children }: Props) {
  return <div className="w-3/4 p-5">{children}</div>;
}

export default MainArea;
