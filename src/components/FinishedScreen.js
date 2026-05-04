function FinishedScreen({ dispatch, points, questions }) {
  const maxPoints = questions.reduce((acc, quest) => {
    return acc + quest.points;
  }, 0);
  const percentage = (points / maxPoints) * 100;
  console.log(percentage, maxPoints);

  return (
    <>
      <p className="result">
        congrats you scored {points} out of {maxPoints} {Math.ceil(percentage)}%
      </p>
      <button
        className="btn center"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
