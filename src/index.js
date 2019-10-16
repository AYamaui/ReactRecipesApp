import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipeDetail from "./components/RecipeDetail";

const AppWrapper = () => (
  <Router>
    <Switch>
      <Route exact path="/detail/:id" component={ RecipeDetail } />
      <Route exact path="/" component={ App } />
    </Switch>
  </Router>
);

ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
