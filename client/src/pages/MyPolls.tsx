import { useEffect, useState } from "react";
import { fetchUserPolls } from "../services/api";
import { Poll } from "../services/api";
import PollCard from "../components/PollCard";

function MyPolls() {
  const [pollData, setPollData] = useState<Poll[]>([]);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    document.title = "My Polls - Pollarity";
    async function userPolls() {
      const res = await fetchUserPolls().finally(() => {
        setTimeout(() => {
          setLoadingState(false);
        }, 300);
      });
      if (res.success) setPollData(res.data);
      else setPollData([]);
    }

    userPolls();
  }, []);

  if (loadingState)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );

  if (pollData.length == 0) {
    return (
      <div className="container my-5 flex flex-col">
        <img
          className="w-40 mx-auto inline-block"
          src="data:image/jpeg;base64,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"
          alt="No data to display"
        />
        <div className="text-center">
          Nothing to see here yet! Create a poll to begin
        </div>
      </div>
    );
  }

  return (
    <div className=" grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mt-5 items-start p-5">
      {pollData.map((poll, index) => {
        return (
          <PollCard
            withOptions={false}
            key={index}
            pollData={poll}
            className="bg-slate-200 mx-2 rounded-md p-4"
          />
        );
      })}
    </div>
  );
}

export default MyPolls;
