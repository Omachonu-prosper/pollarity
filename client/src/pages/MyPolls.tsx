import { useEffect } from "react";

function MyPolls() {
  useEffect(() => {
    document.title = "My Polls - Pollarity";
  }, []);

  return <div>A list of all my polls</div>;
}

export default MyPolls;
