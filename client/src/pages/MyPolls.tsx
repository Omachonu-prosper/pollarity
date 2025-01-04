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
        setLoadingState(false);
      });
      if (res.success) setPollData(res.data);
      else setPollData([]);
    }

    userPolls();
  }, []);

  if (loadingState) return <div>Loading poll data...</div>;

  if (pollData.length == 0) return <div>No poll data to display</div>;

  return (
    <div className="flex gap-2 mt-5 items-start">
      {pollData.map((poll, index) => {
        return (
          <PollCard
            withOptions={false}
            key={index}
            pollData={poll}
            className="bg-slate-200 w-2/4 lg:w-1/4 mx-2 rounded-md p-4"
          />
        );
      })}
    </div>
  );
}

export default MyPolls;
