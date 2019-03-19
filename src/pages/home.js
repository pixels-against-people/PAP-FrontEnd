/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
    }
  }

  componentDidMount() {
    // generates setlist from the CAH-API
    fetch('https://cards-against-humanity-api.herokuapp.com/sets')
      .then(response => response.json())
      .then((sets) => {
        this.setState({ decks: sets })
      }).catch(err => console.log(err.message))
  }

  render() {
    return (
      <div className="homeContainer">
        <div className="buttonContainer">
          <Link className="Link" to="/game">Create Game</Link>
          <Link className="Link" to="/play-game">Join Game</Link>
        </div>
      </div>
    )
  }
}

export default Home
