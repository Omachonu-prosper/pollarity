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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = `Poll [${pollRef}] - Pollarity`;

    async function poll() {
      const res = await fetchPoll(pollRef ?? "someref").finally(() => {
        setTimeout(() => {
          setLoadingState(false);
        }, 100);
      });
      if (res.success) {
        setPollData(res.data ?? defaultPollWithOptions);
      } else setPollData(defaultPollWithOptions);
    }
    poll();
  }, []);

  async function handleCopy() {
    try {
      let textToCopy = `${window.location.protocol}//${window.location.host}/poll/${pollRef}`;
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      return;
    }

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  if (loadingState)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );

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
        <div className="w-3/4 mx-auto ">
          <div
            className="mt-5 cursor-pointer inline-block text-indigo-600 hover:text-indigo-400"
            onClick={handleCopy}
          >
            Copy poll link{" "}
            {copied ? (
              <Icon icon="mdi:clipboard-tick-outline" />
            ) : (
              <Icon icon="solar:copy-bold" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPoll;
