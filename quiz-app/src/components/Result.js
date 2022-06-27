import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      score: null,
    };
  }

  componentDidMount() {
    let questions = this.props.questions;
    let allAnswers = this.props.allAnswers;
    let score = 0;

    let result = questions.map((question, i) => {
      if (question.correct_answer === allAnswers[i]) {
        score = score + 1;
      }
      let obj = {
        question: question.question,
        correct_answer: question.correct_answer,
        yourAns: allAnswers[i],
      };
      return obj;
    });
    this.setState({ result: result, score: score });
  }
  render() {
    return (
      <section className="result">
        <h2>
          Your Score is : <span>{this.state.score}</span>
        </h2>

        {this.state.result ? (
          <table className="table">
            <thead>
              <tr>
                <th>Is Correct</th>
                <th>No.</th>
                <th>Question</th>
                <th>Correct Answer</th>
                <th>Your Answer</th>
              </tr>
            </thead>
            <tbody>
              {this.state.result.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td className="text-center">
                      {ele.correct_answer === ele.yourAns ? (
                        <i className="fas fa-check-circle d-green"></i>
                      ) : (
                        <i className="fas fa-times-circle red"></i>
                      )}
                    </td>
                    <td className="text-center">{i + 1}</td>
                    <td className="text-center">{ele.question}</td>

                    <td className="text-center">{ele.correct_answer}</td>
                    <td className="text-center">{ele.yourAns}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}

        <div className="flex">
          <NavLink to="/" className="go-home">
            Go To Home
          </NavLink>
        </div>
      </section>
    );
  }
}

export default Result;