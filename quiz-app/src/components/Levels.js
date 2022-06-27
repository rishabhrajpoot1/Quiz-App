
import { NavLink } from "react-router-dom";

function Levels(props) {
  return (
    <section className="level">
      <h2>Select Difficulty Level</h2>
      <div>
        <button
          onClick={(event) => {
            props.handleDifficulty(event, "easy");
          }}
          className={props.level === "easy" ? "active" : "button"}
        >
          Easy
        </button>
        <button
          onClick={(event) => {
            props.handleDifficulty(event, "medium");
          }}
          className={props.level === "medium" ? "active" : "button"}
        >
          Medium
        </button>
        <button
          onClick={(event) => {
            props.handleDifficulty(event, "hard");
          }}
          className={props.level === "hard" ? "active" : "button"}
        >
          Hard
        </button>
      </div>

      {props.category && props.level ? (
        <div className="flex start-quiz-btn">
          <NavLink 
            to={`/quiz/${props.category.id}/${props.level}`}
          >
            {" "}
            Start Quiz
          </NavLink>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default Levels;