import { Icon } from "@iconify-icon/react";

interface Props {
  display: boolean;
  color: string;
  message: string;
}

function Alert({ display, color, message }: Props) {
  return (
    <div
      className={`${color} text-white p-3 rounded-md absolute top-5 right-5 flex ${
        display ? "block" : "hidden"
      }`}
    >
      <p className="pr-3">{message}</p>
      <Icon icon="ooui:alert" width="20" height="20" />
    </div>
  );
}

export default Alert;
