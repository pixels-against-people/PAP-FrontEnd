/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */

//need to redo home background and button layout - get rid of image
import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import "./Home.css"
import openSocket from "socket.io-client"

// const socket = openSocket("http://localhost:4000")
const socket = openSocket('https://master.d1adweuj5yrtvv.amplifyapp.com')


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      lobbyName: "",
      lobbyId: null
    }
  }

  componentWillMount() {
    socket.on("Lobby Found", lobbyId => {
      this.setState({ lobbyId })
    })

    socket.on("Lobby Not Found", () => {
      console.log("lobby not found")
    })
  }

  findLobby(e, name) {
    e.preventDefault()
    socket.emit("Find Lobby", name)
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
        {this.state.lobbyId != null && (
          <Redirect to={"/play-game/" + this.state.lobbyId} />
        )}
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
            </button>{" "}
            {/*to={"/play-game/"+this.state.lobbyId}*/}
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
