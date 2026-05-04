function StartScreen({ dispatch, numOfQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button
        onClick={() => dispatch({ type: "dataReady" })}
        className="btn btn-ui"
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
