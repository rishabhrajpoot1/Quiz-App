import React from "react";
import { Switch, Route, Link } from "react-router-dom";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null,
    };
  }

  componentDidMount() {
    fetch("https://opentdb.com/api_category.php")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({
          categories: data.trivia_categories,
        });
      });
  }

  render() {
    return (
      <div className="quiz">
        <div className="title my-5 has-text-info-dark">Popular Quizzes</div>
        <div class="columns is-centered is-multiline mx-4 py-6">
          {this.state.categories
            ? this.state.categories.map((category) => {
                return (
                  <span
                    key={category.id}
                    class="column is-3 box my-4  py-6 has-background-light has-text-centered mx-4"
                  >
                    <div className="subtitle has-text-dark">
                      {category.name}
                    </div>
                    <Link to={`/quiz/${category.id}`}>
                      <div className="button is-warning " data-id={category.id}>
                        Take this Quiz
                      </div>
                    </Link>
                  </span>
                );
              })
            : "Loading..."}
        </div>
      </div>
    );
  }
}

export default Menu;
