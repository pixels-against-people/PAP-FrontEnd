/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './home'
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" Componenet={Home} />
    </Switch>
  );
}

export default App;
