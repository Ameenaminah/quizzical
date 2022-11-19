export default function Intro(props) {
  return (
    <div className="intro--container">
      <div className="intro">
        <h1 className="intro--title">Quizzical</h1>
        <p className="intro--subtitle">
          Do you love challenges? play this quiz game and have fun at the same
          time!!
        </p>
        <button className="intro--btn" onClick={props.startQuiz}>
          Start quiz
        </button>
        <footer>
          {" "}
          <p>
            solo project built by{" "}
            <a href="https://github.com/Ameenaminah" target="_blank">
              Aminat Ameen
            </a>
          </p>{" "}
        </footer>
      </div>
    </div>
  );
}
