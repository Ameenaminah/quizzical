import { decodeHtml } from "../data";
function Question(props) {
  let answerElements = props.answers.map((answer, index) => {
    let styles = {
      backgroundColor: props.answerGiven === answer ? "#D6DBF5" : "transparent",
    };
    let endingStyles = {
      backgroundColor:
        answer === props.correctAnswer
          ? "#94D7A2"
          : answer === props.answerGiven
          ? "#F8BCBC"
          : "transparent",
    };

    return (
      <div
        key={index}
        style={!props.quizEnded ? styles : endingStyles}
        className="answer"
        onClick={() => props.answerQuestion(props.id, answer)}
      >
        {decodeHtml(answer)}
      </div>
    );
  });

  return (
    <div className="main">
      <div className="question-container">
        <div className="question">{props.question}</div>
        <div className="answer-container">{answerElements}</div>
      </div>
    </div>
  );
}
export default Question;
