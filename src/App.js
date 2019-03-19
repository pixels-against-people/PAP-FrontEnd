/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './app.css'
import Home from './pages/home'
import NewGame from './pages/NewGame'
import GameScreen from './pages/GameScreen'
import Navbar from './components/Navbar'
import Login from './pages/login'
import Register from './pages/register'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isAuthed: false,
    }
  }

  componentDidMount() {
    if(localStorage.getItem('cahToken')) {
      this.setState({ loading: false, isAuthed: true})
    } else {
      this.setState({ loading: false })
    }
  }

  logout() {
    localStorage.removeItem('cahToken')
    this.setState({isAuthed: false})
  }

  render() {
    const { loading } = this.state

    if (loading) {
      return null
    }

    return (
      <div className="mainContainer">
        <Navbar isAuthed={this.state.isAuthed} logout={() => this.logout()} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route exact path="/game" component={NewGame} />
          <Route path="/play-game/:lobbyId" component={GameScreen} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    )
  }
}

export default App;
