// This page is displayed if the creator of a poll tries to view their poll

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Icon } from "@iconify-icon/react";
import { fetchPoll, Poll } from "../services/api";
import PollCard from "../components/PollCard";

function UserPoll() {
  const defaultPollWithOptions = {
    id: 0,
    created_at: "",
    is_anonymous: false,
    is_open: false,
    ref: "",
    title: "",
    user_id: 0,
    options: [],
    total_chosen: 0,
  };
  const { pollRef } = useParams();
  const [loadingState, setLoadingState] = useState(true);
  const [pollData, setPollData] = useState<Poll>(defaultPollWithOptions);

  useEffect(() => {
    document.title = "My Polls - Pollarity";
    async function poll() {
      const res = await fetchPoll(pollRef ?? "someref").finally(() => {
        setLoadingState(false);
      });
      if (res.success) setPollData(res.data ?? defaultPollWithOptions);
      else setPollData(defaultPollWithOptions);
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
        <Icon icon="weui:back-filled" className="mr-2 inline-block" />
        All polls
      </Link>

      <div>
        <PollCard
          withOptions={true}
          pollData={pollData}
          className="bg-slate-100 w-3/4 mx-auto rounded-md p-4 mt-5"
        />
      </div>
    </div>
  );
}

export default UserPoll;
