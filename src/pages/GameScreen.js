/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import './GameScreen.css'
import WhiteCard from '../components/WhiteCard'

class GameScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blackCard: { text: 'Why can\'t I sleep at night', pick: 1 },
      whiteCards: ['Coat hanger abortions.', 'Man meat.', 'Autocannibalism.', 'Praying the gay away.', 'Same-sex ice dancing.', 'Ethnic cleansing.', 'Battlefield amputations.', 'An uppercut.', 'Shiny objects.'],
      players: ['papas home', 'urmom', 'WOAH.css'],
      selectedWhite: null,
      playedCards: [],
    }
  }

  selectCard(card) {
    this.setState({ selectedWhite: card })
  }

  submit(card) {
    // eslint-disable-next-line prefer-const
    let { whiteCards, playedCards } = this.state;
    whiteCards.splice(whiteCards.indexOf(card), 1)
    playedCards = playedCards.concat(card)
    this.setState({ whiteCards, playedCards })
  }

  render() {
    const {
      players,
      playedCards,
      blackCard,
      whiteCards,
      selectedWhite,
    } = this.state
    return (

      <div className="game-screen">
        <div className="players">
          <h1>Players</h1>
          <ul>
            // eslint-disable-next-line react/destructuring-assignment
            {players.map((player) => {
              return (

                <li className="player" key={player}>{player}</li>
              )
            })}
          </ul>
        </div>
        <div className="play-area">
          <div className="black-card">{blackCard.text}</div>
          {playedCards.map(card => <p key={card}>{card}</p>)}
        </div>
        <div className="chat"><h1>Chat</h1></div>
        <div className="white-cards">
          <ul>
            {whiteCards.map((card) => {
              return (

                <li key={card}>
                  <WhiteCard
                    text={card}
                    selected={card === selectedWhite}
                    onclick={() => this.selectCard(card)}
                    submit={() => this.submit(card)}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}


export default GameScreen
