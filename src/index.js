import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Relationship from "./pages/relationship";
import Home from "./pages/home";
import "./style/style.css";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/relationship/:relationshipName" component={Relationship} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
