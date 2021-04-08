// Global Imports
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Component Imports
import Players from './screens/Players';
import Game from './screens/Game';

const App = () => {
  return (
    <Router>
      <Switch>
          <Route path="/" exact>
            <Players />
          </Route>
          <Route path="/score" exact>
            <Game />
          </Route>
        </Switch>
    </Router>
  );
};

export default App;