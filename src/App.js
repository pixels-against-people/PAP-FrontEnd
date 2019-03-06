/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import NewGame from './pages/NewGame'
import GameScreen from './pages/GameScreen'
import Navbar from './components/Navbar'
import Login from './pages/login'
import Register from './pages/register'

function App() {
  return (
    <div className="mainContainer">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route exact path="/game" component={NewGame} />
        <Route path="/play-game" component={GameScreen} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  )
}

export default App;
