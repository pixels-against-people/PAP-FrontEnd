/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import './GameScreen.css'
import WhiteCard from '../components/WhiteCard'
import LargeWhiteCard from '../components/LargeWhiteCard'
import BlackCard from '../components/BlackCard'
import Chat from '../components/Chat'
import Players from '../components/Players'


class GameScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blackCard: { text: 'Why can\'t I sleep at night?', pick: 2 },
      whiteCards: ['Why can\'t I sleep at night?', 'Man meat.', 'Autocannibalism.', 'Praying the gay away.', 'Same-sex ice dancing.', 'Ethnic cleansing.', 'Battlefield amputations.', 'An uppercut.', 'Shiny objects.'],
      players: [{ name: 'This Website', points: 1 }, { name: 'is not currently', points: 2 }, { name: 'hooked up to', points: 3 }, { name: 'the back end', points: 4 }, { name: 'so players ', points: 5 }, { name: 'dont exist yet', points: 6 }],
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
            {/* eslint-disable-next-line react/destructuring-assignment */}
            <Players players={players} />
          </ul>
        </div>
        <div className="play-area">
          <BlackCard card={blackCard} />
          {playedCards.map((card) => {
            return (
              <LargeWhiteCard key={card} text={card} />
            )
          })}
        </div>

        <div className="chat-area"><Chat /></div>
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
