/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */

//need to redo home background and button layout - get rid of image
import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import "./Home.css"
import openSocket from "socket.io-client"
import decode from "jwt-decode"

const socket = openSocket("http://localhost:4000")
// const socket = openSocket('https://master.d34fmqcbe5o49s.amplifyapp.com/')


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      lobbyName: "",
      lobbyId: null,
      user: null
    }
  }

  componentWillMount() {
    socket.on("Joined Lobby", (lobbyId, user) => {
      this.setState({ lobbyId, user })
    })

    socket.on("Lobby Not Found", () => {
      console.log("lobby not found")
    })
  }

  findLobby(e, name) {
    e.preventDefault()
    socket.emit("Join Lobby", decode(localStorage.getItem('cahToken')).id, name)
  }

  componentDidMount() {
    // generates setlist from the CAH-API
    fetch("https://cards-against-humanity-api.herokuapp.com/sets")
      .then(response => response.json())
      .then(sets => {
        this.setState({ decks: sets })
      })
      .catch(err => console.log(err.message))
  }

  render() {
    return (
      <div className="homeContainer">
        {this.state.lobbyId && <Redirect to={{ pathname: "/play-game/" + this.state.lobbyId, user: this.state.user }} />}
        <div className="buttonContainer">
          <Link className="Link" to="/game">
            Create Game
          </Link>
          <form>
            <button
              className="Link"
              onClick={e => this.findLobby(e, this.state.lobbyName)}
            >
              Join Game
            </button>
            <input
              placeholder="Lobby Name"
              type="text"
              value={this.state.lobbyName}
              onChange={e => this.setState({ lobbyName: e.target.value })}
            />
          </form>
        </div>
      </div>
    )
  }
}

export default Home
