import { Icon } from "@iconify-icon/react";

interface Props {
  display: boolean;
  handleClose: (e: React.MouseEvent) => void;
  handleConfirm: (e: React.MouseEvent) => void;
}

function Confirmation({ display, handleClose, handleConfirm }: Props) {
  return (
    <div
      className={`w-full min-h-screen absolute bg-white/50 backdrop-blur-sm flex justify-center items-center ${
        display ? "block" : "hidden"
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-slate-100 text-gray-600 pt-8 pb-5 px-5 rounded-md outline"
        onClick={(e) => e.stopPropagation()}
      >
        Are you sure you want to close this poll?
        <br />
        This action can not be undone!
        <div className="mt-3 flex gap-3">
          <div
            className="w-1/2 text-center bg-gray-600 hover:bg-gray-400 text-white rounded-md px-3 py-2 cursor-pointer"
            onClick={handleClose}
          >
            Cancel
          </div>
          <div
            className="w-1/2 text-center bg-red-600 hover:bg-red-400 text-white rounded-md px-3 py-2 cursor-pointer"
            onClick={handleConfirm}
          >
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
