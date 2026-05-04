import { useEffect } from "react";
function formatSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds}`;
}

function Timer({ remainingTime, dispatch }) {
  useEffect(
    function () {
      if (remainingTime >= 0) {
        const interval = setInterval(function () {
          dispatch({ type: "tick" });
        }, 1000);
        return () => clearInterval(interval);
      }
    },
    [dispatch, remainingTime],
  );
  return <div className="timer"> {formatSeconds(remainingTime)}</div>;
}

export default Timer;
