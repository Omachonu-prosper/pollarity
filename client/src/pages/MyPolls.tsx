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
        return <PollCard key={index} pollData={poll} />;
      })}
    </div>
  );
}

export default MyPolls;
