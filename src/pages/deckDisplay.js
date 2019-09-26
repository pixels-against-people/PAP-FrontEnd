/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react'
import Navbar from '../components/Navbar'

class deckDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
    }
  }

  getCards(deck) {
    fetch(`https://master.d3nfp0yljqbgje.amplifyapp.com/sets/${deck}`)
      .then((res) => {
        this.setState({ cards: res })
      })
  }

  mapCards() {
    const { cards } = this.state
    const blerg = cards.map((card) => {
      
    }
  }

  render() {
    return (
      <Navbar />
    )
  }
}

export default deckDisplay
