/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React , { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './home'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Home />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
