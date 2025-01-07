// This page is displayed if the creator of a poll tries to view their poll

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Icon } from "@iconify-icon/react";
import { fetchPoll, Poll } from "../services/api";
import PollCard from "../components/PollCard";
import Confirmation from "../components/Confirmation";

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
  const [displayConfirmation, setDisplayconfirmation] = useState(false);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDisplayconfirmation(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

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

  function closeConfirmationDialogue() {
    setDisplayconfirmation(false);
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
      <Confirmation
        display={displayConfirmation}
        handleClose={closeConfirmationDialogue}
      />

      <Link
        to={"/dashboard/polls"}
        className="text-indigo-600 hover:text-indigo-400 m-5 inline-block"
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
        <div className="w-3/4 mx-auto flex gap-6 mt-5">
          <div
            className="cursor-pointer inline-block text-indigo-600 hover:text-indigo-400"
            onClick={handleCopy}
          >
            Copy poll link{" "}
            {copied ? (
              <Icon icon="mdi:clipboard-tick-outline" />
            ) : (
              <Icon icon="solar:copy-bold" />
            )}
          </div>

          {pollData.is_open ? (
            <div
              className="text-red-600 hover:text-red-400 cursor-pointer"
              onClick={() => {
                setDisplayconfirmation(true);
              }}
            >
              Close poll <Icon icon="icomoon-free:cross" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UserPoll;
