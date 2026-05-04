import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import FinishedScreen from "./FinishedScreen";
import Progress from "./Progress";

const initialState = {
  questions: [],
  // loading , error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  remainingTime: null,
};
const SEC_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "dataReady":
      return {
        ...state,
        status: "active",
        remainingTime: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnwser":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      if (state.index + 1 === state.questions.length) {
        return { ...state, status: "finished" };
      } else {
        return { ...state, index: state.index + 1, answer: null };
      }
    case "restart":
      return {
        ...state,
        index: 0,
        points: 0,
        answer: null,
        status: "active",
        remainingTime: 10,
      };
    case "tick":
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        status: state.remainingTime === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("action unknown");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, remainingTime },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numOfQuestions={numOfQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              numOfQuestions={numOfQuestions}
              points={points}
              questions={questions}
              index={index}
              answer={answer}
            />

            <Question
              status={status}
              index={index}
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
              remainingTime={remainingTime}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            dispatch={dispatch}
            points={points}
            questions={questions}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
