import React from "react";
import { Switch, Route, Link } from "react-router-dom";

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quizId: null,
      quizData: null,
      userData: [],
      options: null,
      score: 0,
      currentQuestionIndex: 0,
      done: false,
      userAnswer: null,
      error: null,
      isFinished: false,
      output: [],
    };
  }

  getOptions = () => {
    let optionsArray = [
      ...this.state.quizData[`${this.state.currentQuestionIndex}`]
        .incorrect_answers,
    ];
    optionsArray.push(
      this.state.quizData[`${this.state.currentQuestionIndex}`].correct_answer
    );

    optionsArray.sort(() => Math.random() - 0.5);

    return optionsArray;
  };

  getAnswers = () => {
    let answers = [];
    this.state.quizData.forEach((question) => {
      answers.push(question.correct_answer);
    });
    return answers;
  };

  handleClick = (e) => {
    if (e.target.dataset.id === "next") {
      if (this.state.currentQuestionIndex < 9) {
        if (this.state.done) {
          this.setState(
            (prevState) => {
              let score = this.state.score;
              let output = "";
              this.state.userAnswer ===
                this.state.quizData[this.state.currentQuestionIndex]
                  .correct_answer && score++;
              this.state.userAnswer ===
              this.state.quizData[this.state.currentQuestionIndex]
                .correct_answer
                ? (output = "✅")
                : (output = "❌");

              return {
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                done: false,
                userData: prevState.userData.concat(this.state.userAnswer),
                score: score,
                output: prevState.output.concat(output),
              };
            },
            () => {
              this.setState({
                options: this.getOptions(),
              });
            }
          );
        } else {
          this.setState({
            error: "Select an option to proceed...",
          });
        }
      } else {
        if (this.state.done) {
          this.setState(
            (prevState) => {
              let score = this.state.score;
              let output = "";
              this.state.userAnswer ===
                this.state.quizData[this.state.currentQuestionIndex]
                  .correct_answer && score++;
              this.state.userAnswer ===
              this.state.quizData[this.state.currentQuestionIndex]
                .correct_answer
                ? (output = "✅")
                : (output = "❌");
              return {
                isFinished: true,
                done: false,
                userData: prevState.userData.concat(this.state.userAnswer),
                score: score,
                output: prevState.output.concat(output),
              };
            },
            () => {
              this.setState({
                options: this.getOptions(),
              });
            }
          );
        } else {
          this.setState({
            error: "Select an option to proceed...",
          });
        }
      }
    } else {
      this.setState((prevValue) => {
        if (e.target.innerText === prevValue.userAnswer) {
          return {
            done: !prevValue.done,
            userAnswer: null,
          };
        } else {
          return {
            done: true,
            userAnswer: e.target.innerText,
            error: null,
          };
        }
      });
    }
  };

  componentDidMount() {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${this.props.match.params.id}&type=multiple`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState(
          {
            quizId: this.props.match.params.id,
            quizData: data.results,
          },
          () => {
            this.setState({
              options: this.getOptions(),
            });
          }
        );
      });
  }

  render() {
    return (
      <div className="quiz">
        <div className="title my-5 has-text-dark">
          Category:{" "}
          <span>
            {this.state.quizId ? this.state.quizData[0].category : "loading..."}
          </span>{" "}
        </div>
        {this.state.isFinished ? (
          <>
            <div className="title has-text-danger">
              Your Score: {this.state.score}
            </div>
            <table className="table is-fullwidth is-bordered is-striped">
              <thead>
                <tr>
                  {" "}
                  <th>Question</th> <th>Correct Answer</th> <th>Your Answer</th>
                  <th>Right/Wrong?</th>
                </tr>
              </thead>
              <tbody>
                {this.state.quizData.map((question, index) => {
                  return (
                    <>
                      <tr>
                        <td className="has-text-weight-bold">
                          {question.question}
                        </td>
                        <td className="has-text-centered">
                          {question.correct_answer}
                        </td>
                        <td className="has-text-centered">
                          {this.state.userData[index]}
                        </td>
                        <td className="has-text-centered">
                          {this.state.output[index]}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <div class="columns is-centered is-multiline mx-4 py-6">
            {this.state.quizId ? (
              <div className="column is-10">
                <div className="subtitle has-text-success-dark">
                  Question {this.state.currentQuestionIndex + 1}/10{" "}
                </div>
                <progress
                  class="progress is-success is-small"
                  value={(this.state.currentQuestionIndex + 1) * 10}
                  max="100"
                ></progress>
                <div>
                  <div className="is-size-4 has-text-weight-bold box has-background-info-light">
                    {
                      this.state.quizData[`${this.state.currentQuestionIndex}`]
                        .question
                    }
                  </div>
                  {this.state.options
                    ? this.state.options.map((option) => {
                        return (
                          <div
                            className={
                              this.state.userAnswer === option
                                ? `button is-fullwidth is-grey is-light my-5 py-5 has-background-success`
                                : `button is-fullwidth is-grey is-light my-5 py-5`
                            }
                            onClick={this.handleClick}
                          >
                            {option}
                          </div>
                        );
                      })
                    : "Loading..."}
                </div>

                {this.state.error ? (
                  <div className="has-text-danger has-text-centered">
                    {this.state.error}
                  </div>
                ) : (
                  ""
                )}
                <div className="level">
                  <div className="level-left"></div>
                  <div className="level-right">
                    <div
                      data-id="next"
                      className="button px-6 is-primary"
                      onClick={this.handleClick}
                    >
                      Next
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "Starting Quiz..."
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Quiz;
