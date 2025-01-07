import { Link } from "react-router";
import { Poll } from "../services/api";
import { formatDistance } from "date-fns";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";

interface Props {
  pollData: Poll;
  withOptions: boolean;
  className?: string;
  onOptionClick?: (e: React.MouseEvent) => void;
  choice?: number;
}

function PollCard({
  pollData,
  withOptions,
  className,
  choice,
  onOptionClick,
}: Props) {
  let createdAt = new Date(pollData.created_at);
  let now = new Date();
  let relativeDate = formatDistance(createdAt, now, { addSuffix: true });
  const optionsGradient = (choices: number, total: number) => {
    let coverage = (choices / total) * 100;
    return total == 0
      ? {
          background: "rgb(203 213 225)",
        }
      : {
          background: `linear-gradient(90deg, rgb(100 116 139) 0%, rgb(100 116 139) ${coverage}%, rgb(203 213 225) ${coverage}%, rgb(203 213 225) 100%)`,
        };
  };
  const [totalVotes, setTotalVotes] = useState(pollData.total_chosen);
  const [optionChosen, setOptionChosen] = useState<{ [key: number]: any }>({});

  if (pollData.is_open && withOptions) {
    const options: { [key: number]: any } = {};
    pollData.options.forEach((o) => {
      let key = o.id;
      options[key] = o.chosen;
    });

    useEffect(() => {
      setOptionChosen(options);
      const evntSrc = new EventSource(
        `${import.meta.env.VITE_BASE_URL}/poll/${pollData.ref}/live`
      );
      console.log("Connected to live poll");

      evntSrc.addEventListener("vote", (e) => {
        let parsedData = JSON.parse(e.data);
        let id = parsedData.oid;
        setTotalVotes((tV) => tV + 1);
        console.log(totalVotes);
        setOptionChosen((prevData) => ({
          ...prevData,
          [id]: optionChosen[id] + 1,
        }));
        console.log(optionChosen[id]);
      });
    }, []);
  }

  return (
    <div className={className}>
      {pollData.is_open ? (
        <div className="bg-green-600 inline py-1 px-2 rounded-2xl text-white">
          active
        </div>
      ) : (
        <div className="bg-red-600 inline py-1 px-2 rounded-2xl text-white">
          closed
        </div>
      )}
      <div className="mt-3 text-xl font-medium text-gray-600">
        {pollData.title}
      </div>
      <div className="text-xs text-gray-500">{relativeDate}</div>
      {withOptions ? (
        <div className="mt-5">
          {pollData.options.map((option, index) => {
            return (
              <div key={index} className="mt-3">
                <div className="text-sm">{option.choice}</div>
                <div
                  id={String(option.id)}
                  style={optionsGradient(option.chosen, pollData.total_chosen)}
                  className="w-full p-1 text-white text-center"
                  onClick={onOptionClick}
                >
                  {pollData.is_open ? optionChosen[option.id] : option.chosen}
                  {choice == option.id ? (
                    <Icon icon="mdi:tick-circle" className="text-white pl-2" />
                  ) : null}
                </div>
              </div>
            );
          })}
          <div className="mt-3">total votes: {totalVotes}</div>
        </div>
      ) : (
        <Link
          to={"/dashboard/poll/" + pollData.ref}
          className="bg-indigo-800 px-3 py-1 rounded-md mt-4 inline-block text-center text-white hover:cursor-pointer hover:bg-indigo-700"
        >
          View poll
        </Link>
      )}
    </div>
  );
}

export default PollCard;
