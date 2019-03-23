/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { Socket } from 'dgram';
import openSocket from 'socket.io-client'

const socket = openSocket('https://pixelsagainstpeople.herokuapp.com/')

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
    }
  }

  componentWillMount() {
    socket.on('banner', () => {
      alert("it works")
    })
  }

  componentDidMount() {
    // generates setlist from the CAH-API
    fetch('https://cards-against-humanity-api.herokuapp.com/sets')
      .then(response => response.json())
      .then((sets) => {
        this.setState({ decks: sets })
      }).catch(err => console.log(err.message))
  }

  banner() {
    socket.emit("banner")
  }

  render() {
    return (
      <div className="homeContainer">
      <button onClick={() => this.banner()}>ahhhh</button>
        <div className="buttonContainer">
          <Link className="Link" to="/game">Create Game</Link>
          {/* <input type="text" value={this.state.lobbyId} onChange={e => this.setState({ lobbyId: e.target.value })} /> */}
          <Link className="Link" to={"/play-game/"+this.state.lobbyId}>Join Game</Link>
        </div>
      </div>
    )
  }
}

export default Home
