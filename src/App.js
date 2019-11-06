import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MatchList from './views/MatchList';
import MatchView from './views/MatchView';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        component={MatchList}
      />
      <Route
        exact
        path="/match/:matchId"
        render={(props) => <MatchView {...props} />}
      />
      {/* <Route
        component={NoMatchPage}
      /> */}
    </Switch>
  </Router>
);
export default App;