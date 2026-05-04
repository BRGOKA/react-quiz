import { useEffect } from "react";
import Timer from "./Timer";

function Question({
  status,
  index,
  remainingTime,
  answer,
  dispatch,
  question,
}) {
  const hasAnswer = answer !== null;
  useEffect(
    function () {
      if (status === "active") {
        document.title = `The React Quiz | Question N°${index + 1}`;
      }
      if (status === "finished") {
        document.title = "The React Quiz";
      }
    },
    [index, status],
  );
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((item, index) => (
          <button
            className={`btn btn-option 
            ${index === answer ? "answer" : ""} 
            ${
              hasAnswer
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={item}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "newAnwser", payload: index })}
          >
            {item}
          </button>
        ))}
      </div>
      <footer>
        <Timer remainingTime={remainingTime} dispatch={dispatch} />
        {hasAnswer ? (
          <button
            onClick={() => dispatch({ type: "nextQuestion" })}
            className="btn btn-ui"
          >
            Next
          </button>
        ) : (
          <></>
        )}
      </footer>
    </div>
  );
}

export default Question;
