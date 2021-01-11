import React from "react";
import Home from "../home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function Root() {
  return (
    <Router>
      <>
        <Route path={`/:filter?`} component={Home} />
      </>
    </Router>
  );
}

export default Root;
