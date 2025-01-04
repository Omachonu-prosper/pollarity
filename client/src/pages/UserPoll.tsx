// This page is displayed if the creator of a poll tries to view their poll

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { fetchPoll, PollWithOptions } from "../services/api";

function UserPoll() {
  const { pollRef } = useParams();
  const [loadingState, setLoadingState] = useState(true);
  const [pollData, setPollData] = useState<PollWithOptions | null>();

  useEffect(() => {
    document.title = "My Polls - Pollarity";
    async function poll() {
      const res = await fetchPoll(pollRef ?? "someref").finally(() => {
        setLoadingState(false);
      });
      if (res.success) setPollData(res.data);
      else setPollData(null);
    }

    poll();
  }, []);
  console.log(pollData);
  if (loadingState) return <div>Loading poll data...</div>;

  return (
    <div>
      <Link
        to={"/dashboard/polls"}
        className="text-indigo-600 hover:text-indigo-400"
      >
        All polls
      </Link>

      <div>You created this poll {pollRef}</div>
    </div>
  );
}

export default UserPoll;
