import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - action.step };
    case "inc":
      return { ...state, count: state.count + action.step };
    case "setCount":
      return { ...state, count: action.count };
    case "setStep":
      return { ...state, step: action.step };
    case "reset":
      return { ...state, count: 0, step: 1 };
    default:
      throw new Error("unknown operation");
  }
}

function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [state, dispach] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispach({ type: "dec", step: step });
  };

  const inc = function () {
    dispach({ type: "inc", step: step });
  };

  const defineCount = function (e) {
    dispach({ type: "setCount", count: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispach({ type: "setStep", step: Number(e.target.value) });
  };

  const reset = function () {
    dispach({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
