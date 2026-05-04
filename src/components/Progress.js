function Progress({ answer, index, numOfQuestions, points, questions }) {
  const score = questions.reduce((acc, quest) => {
    return acc + quest.points;
  }, 0);
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index} />
      <p>
        Question <strong>{index}</strong>/{numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{score}
      </p>
    </header>
  );
}

export default Progress;
