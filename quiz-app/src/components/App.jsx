import React from "react";
import Menu from "./Menu";
import Quiz from "./Quiz";
import { Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        
        <div className="container">
          <div className="altcampus">
            <Link to="/">
              <span> Quiz-App </span>
            </Link>
          </div>

          <Switch>
            <Route path="/" exact>
              <Menu />
            </Route>
            <Route path="/quiz/:id" component={Quiz} />

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </>
    );
  }
}

function NoMatch() {
  return (
    <h2 className="has-text-danger title mt-6 has-text-centered">
      404: Page not found!
    </h2>
  );
}
export default App;
