import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import "./app.css"
import Home from "./pages/home"
import NewGame from "./pages/NewGame"
import GameScreen from "./pages/GameScreen"
import Navbar from "./components/Navbar"
import Login from "./pages/login"
import Register from "./pages/register"
import ReactGA from 'react-ga'

const trackingId = 'UA-151565115-1' // Replace with your Google Analytics tracking ID

function initializeReactGA() {
  ReactGA.initialize(trackingId);
  ReactGA.pageview('/');
}
initializeReactGA()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      auth: true
    }
  }

  componentDidMount() {
    this.setState({ loading: false })
    this.initializeReactGA()
  }

  initializeReactGA() {
    ReactGA.initialize('UA-150724057-1');
    ReactGA.pageview('/');
  }

  render() {
    const { loading } = this.state

    if (loading) {
      return null
    }

    return (
      <div className="mainContainer">
        <Navbar auth={this.state.auth} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game" component={NewGame} />
          <Route path="/play-game/:lobbyId" component={GameScreen} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    )
  }
}

export default App
