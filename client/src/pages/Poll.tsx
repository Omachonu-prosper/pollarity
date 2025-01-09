// This page is displayed if any other user tries to view a poll

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Poll } from "../services/api";
import { fetchPoll, vote } from "../services/api";
import NotFound from "./NotFound";
import PollCard from "../components/PollCard";
import Alert from "../components/Alert";

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
  const [alertState, setAlertState] = useState({
    display: false,
    color: "",
    message: "",
  });

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
        setRequestSuccessful(true);
      } else setPollData(defaultPollWithOptions);
    }
    poll();
  }, []);

  function showAlert(message: string, color: string) {
    setAlertState({
      display: true,
      color: color,
      message: message,
    });
    setTimeout(() => {
      setAlertState({
        display: false,
        color: "",
        message: "",
      });
    }, 5000);
  }

  async function handleOptionClick(e: React.MouseEvent) {
    let optionId = e.currentTarget.id;
    if (pollData.is_open) {
      if (sessionStorage.getItem(pollData.ref)) {
        showAlert("Vote alreay recorded", "bg-red-400");
      } else {
        const res = await vote(pollData.ref, Number(optionId));
        if (res.success) {
          showAlert("Vote recorded", "bg-green-400");
          sessionStorage.setItem(pollData.ref, optionId);
        } else
          showAlert(
            "Vote could not be recorded! Please refresh the page",
            "bg-red-400"
          );
      }
    } else {
      showAlert("Poll has been closed", "bg-red-400");
    }
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

  if (!reqSuccessful) return <NotFound />;

  return (
    <div>
      <Alert
        display={alertState.display}
        color={alertState.color}
        message={alertState.message}
      />

      <PollCard
        withOptions={true}
        pollData={pollData}
        className="bg-slate-100 w-3/4 mx-auto rounded-md p-4 mt-16"
        onOptionClick={handleOptionClick}
        choice={Number(sessionStorage.getItem(pollData.ref))}
      />
    </div>
  );
}

export default PollPage;
