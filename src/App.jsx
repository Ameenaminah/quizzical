import { useEffect } from "react";
import { useState } from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import { decodeHtml, shuffle } from "./data";
import { nanoid } from "nanoid";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  // const [datas, setDatas] = useState(quizData);
  const [questions, setQuestions] = useState([]);

  const [quizEnded, setQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [resetGame, setResetGame] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          data.results.map((result, index) => {
            let answersArray = result.incorrect_answers;
            answersArray.push(result.correct_answer);
            shuffle(answersArray);
            return {
              key: index,
              id: nanoid(),
              question: decodeHtml(result.question),
              // question: q.question,
              correctAnswer: result.correct_answer,
              answers: answersArray,
              answered: false,
              correct: false,
              answerGiven: "",
            };
          })
        )
      );
  }, [resetGame]);

  function handleAnswerClick(id, chosenAnswer) {
    setQuestions((prevState) =>
      prevState.map((answers) => {
        if (answers.id === id) {
          return {
            ...answers,
            answered: true,
            correct: chosenAnswer === answers.correctAnswer,
            answerGiven: chosenAnswer,
          };
        }
        return answers;
      })
    );
  }

  function endQuiz() {
    questions.every((questions) => {
      return questions.answerGiven
        ? setScore((prevScore) => prevScore + 1)
        : "";
    });
    // for (let question of questions) {
    //   if (question.answerGiven.length) {
    //     setScore((prevScore) => prevScore + 1);
    //   }
    // }
    // setQuizEnded((prevScore) => !prevScore);
    setQuizEnded((prevScore) => !prevScore);
  }
  // && question.correct
  // question.length &&
  function playAgain() {
    setScore(0);
    setQuizEnded(false);
    setResetGame((prevState) => !prevState);
  }

  let questionElements = questions.map((question) => (
    <Question
      {...question}
      answerQuestion={handleAnswerClick}
      quizEnded={quizEnded}
    />
  ));

  function startQuiz() {
    setIsStarted((prevState) => !prevState);
  }

  return (
    <main>
      {isStarted ? (
        <div>
          {questionElements}
          <div className="quiz-end">
            {quizEnded && (
              <p className="quiz-score">You scored {score} out of 5</p>
            )}
            {!quizEnded ? (
              <button className="quiz-btn" onClick={endQuiz}>
                Score Quiz
              </button>
            ) : (
              <button className="quiz-btn" onClick={playAgain}>
                Play Again
              </button>
            )}
          </div>
        </div>
      ) : (
        <Intro startQuiz={startQuiz} />
      )}
    </main>
  );
}

export default App;
