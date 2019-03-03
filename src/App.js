/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React , { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import NewGame from './pages/NewGame'
import GameScreen from './pages/GameScreen'
import Navbar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="mainContainer">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/new-game" component={NewGame} />
          <Route exact path="/play-game" component={GameScreen} />
        </Switch>
      </div>
    );
  }
}

export default App;
