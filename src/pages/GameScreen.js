/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import openSocket from 'socket.io-client'

import './GameScreen.css'
import WhiteCard from '../components/WhiteCard'
import LargeWhiteCard from '../components/LargeWhiteCard'
import BlackCard from '../components/BlackCard'
import Chat from '../components/Chat'
import Players from '../components/Players'

const socket = openSocket('http://localhost:4000')


class GameScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blackCard: { text: 'Why can\'t I sleep at night?', pick: 2 },
      whiteCards: ['Why can\'t I sleep at night?', 'Man meat.', 'Autocannibalism.', 'Praying the gay away.', 'Same-sex ice dancing.', 'Ethnic cleansing.', 'Battlefield amputations.', 'An uppercut.', 'Shiny objects.'],
      players: [],
      selectedWhite: null,
      playedCards: [],
      username: '',
      nameInput: '',
    }
  }

  componentWillMount() {
    this.handlePlayers()
  }

  handlePlayers() {
    socket.on('Update Players', (players) => {
      this.setState({ players })
    })
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

  submitUsername(e, username) {
    e.preventDefault()
    this.setState({ nameInput: '', username })
  }

  render() {
    const {
      players,
      playedCards,
      blackCard,
      whiteCards,
      selectedWhite,
      username,
      nameInput,
    } = this.state
    return (
      <div className="game-screen">
        <div className="players">
          <h1>Players</h1>
          <ul>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {username
              ? <Players players={players} />
              : <div>
                <form>
                  <input type="text" value={nameInput} onChange={e => this.setState({ nameInput: e.target.value })} />
                  <button type="submit" onClick={e => this.submitUsername(e, nameInput)}>Submit Name</button>
                </form>
              </div>
            }
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

        <div className="chat-area"><Chat socket={socket} /></div>
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
