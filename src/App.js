import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";

import General from "./components/General/General.js";
import StateWise from "./components/StateWise/StateWise";
import Analysis from "./components/Analysis/Analysis.js";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={General} />
      <Route path="/statewise" exact component={StateWise} />
      <Route path="/analyze" exact component={Analysis} />
    </Router>
  );
};
export default App;

serviceWorker.register();
