// This page is displayed if any other user tries to view a poll

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Poll } from "../services/api";
import { fetchPoll } from "../services/api";
import NotFound from "./NotFound";
import PollCard from "../components/PollCard";

function PollPage() {
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
  const [loadingState, setLoadingState] = useState(true);
  const [pollData, setPollData] = useState<Poll>(defaultPollWithOptions);
  const { pollRef } = useParams();
  const [reqSuccessful, setRequestSuccessful] = useState(false);

  useEffect(() => {
    document.title = "My Polls - Pollarity";
    async function poll() {
      const res = await fetchPoll(pollRef ?? "someref").finally(() => {
        setTimeout(() => {
          setLoadingState(false);
        }, 100);
      });
      if (res.success) {
        setPollData(res.data ?? defaultPollWithOptions);
        setRequestSuccessful(true);
      } else setPollData(defaultPollWithOptions);
    }

    poll();
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

  if (!reqSuccessful) return <NotFound />;

  return (
    <div>
      <PollCard
        withOptions={true}
        pollData={pollData}
        className="bg-slate-100 w-3/4 mx-auto rounded-md p-4 mt-16"
      />
    </div>
  );
}

export default PollPage;
