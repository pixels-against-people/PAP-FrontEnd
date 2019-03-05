/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react'

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

      </div>
    )
  }
}

export default Home
