import { Link } from "react-router";
import { Poll } from "../services/api";
import { formatDistance, subDays } from "date-fns";

interface Props {
  pollData: Poll;
}

function PollCard({ pollData }: Props) {
  let createdAt = new Date(pollData.created_at);
  let now = new Date();
  let relativeDate = formatDistance(createdAt, now, { addSuffix: true });

  return (
    <div className="bg-slate-200 w-2/4 lg:w-1/4 mx-2 rounded-md p-4">
      {pollData.is_open ? (
        <div className="bg-green-600 inline py-1 px-2 rounded-2xl text-white">
          active
        </div>
      ) : (
        <div className="bg-red-600 inline py-1 px-2 rounded-2xl text-white">
          closed
        </div>
      )}
      <div className="mt-3 text-xl font-medium text-gray-600">
        {pollData.title}
      </div>
      <div className="text-xs text-gray-500">{relativeDate}</div>
      <Link
        to={"/dashboard/poll/" + pollData.ref}
        className="bg-indigo-800 px-3 py-1 rounded-md mt-4 inline-block text-center text-white hover:cursor-pointer hover:bg-indigo-700"
      >
        View poll
      </Link>
    </div>
  );
}

export default PollCard;
