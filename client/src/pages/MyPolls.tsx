import { useEffect, useState } from "react";
import { fetchUserPolls } from "../services/api";
import { Poll } from "../services/api";

function MyPolls() {
  const [pollData, setPollData] = useState<Poll[]>([]);

  useEffect(() => {
    document.title = "My Polls - Pollarity";
    async function userPolls() {
      const res = await fetchUserPolls();
      console.log(res);
      if (res.success) setPollData(res.data);
      else setPollData([]);
    }

    userPolls();
  }, []);

  if (pollData.length == 0) return <div>No poll data to display</div>;

  return (
    <div>
      {pollData.map((poll, index) => {
        return <div key={index}>{poll.title}</div>;
      })}
    </div>
  );
}

export default MyPolls;
