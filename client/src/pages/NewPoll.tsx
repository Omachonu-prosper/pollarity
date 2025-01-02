import { useEffect } from "react";

function NewPoll() {
  useEffect(() => {
    document.title = "New Poll - Pollarity";
  }, []);

  return <div>Create a new poll here</div>;
}

export default NewPoll;
