/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import openSocket from 'socket.io-client'

import { Redirect } from 'react-router-dom'
import './GameScreen.css'
import WhiteCard from '../components/WhiteCard'
import LargeWhiteCard from '../components/LargeWhiteCard'
import BlackCard from '../components/BlackCard'
import Chat from '../components/Chat'
import Players from '../components/Players'
import decode from 'jwt-decode'

const socket = openSocket('http://localhost:4000')
// const socket = openSocket('https://pixelsagainstpeople.herokuapp.com/')




class GameScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blackCard: { text: 'Why can\'t I sleep at night?', pick: 2 },
      whiteCards: ['Why can\'t I sleep at night?', 'Man meat.', 'Autocannibalism.', 'Praying the gay away.', 'Same-sex ice dancing.', 'Ethnic cleansing.', 'Battlefield amputations.', 'An uppercut.', 'Shiny objects.'],
      players: [],
      selectedWhite: null,
      playedCards: [],
      user: decode(localStorage.getItem('cahToken')),
      messages: [],
      messageInput: '',
      gameState: '',
      clientActive: true, //Playing or not
      owner: false,
      lobby: this.props.match.params.lobbyId,
      czar: false,
      czarId: '',
      winningCard: null,
    }
  }

  componentWillMount() {
    this.handlePlayers()
    this.handleMessage()
    this.handleWinCard()
  }

  componentDidMount() {
    this.submitUser(this.state.user)
  }

  handleWinCard() {
    socket.on('Winning Card', (userId) => {
      console.log("somone won")
      this.setState({winningCard: userId})
    })
  }

  handlePlayers() {
    socket.on('Update Players', (lobby) => {
      const { users: players, gameState, currBlack: blackCard, czar: czarId, playedWhite: playedCards } = lobby
      console.log(lobby)
      const player = players.reduce((me, player) => (player.id === this.state.user._id ? player : me))
      const owner = player.owner
      let whiteCards = player.cards
      let czar = false
      if (czarId === player.id) {
        czar = true
      }
      let clientActive = false
      if (!player.played) {
        if (gameState === 'Playing') {
          if (!czar) {
            clientActive = true
          }
        }
        else if (gameState === 'Selecting') {
          if (czar) {
            clientActive = true
            whiteCards = lobby.playedWhite.map(card => card.card)
          }
        }
      }
      this.setState({ players, whiteCards, gameState, owner, blackCard, czar, clientActive, playedCards, czarId })
    })
  }

  handleMessage() {
    socket.on('New Message', (text, username) => {
      this.setState({ messages: this.state.messages.concat({ username, text }) })
    })
  }

  selectCard(card) {
    this.setState({ selectedWhite: card })
  }

  submit(card) {
    // eslint-disable-next-line prefer-const
    let { whiteCards, playedCards, clientActive, user, lobby, czar, gameState } = this.state;
    if (clientActive) {
      if (!czar && gameState === 'Playing') {
        whiteCards.splice(whiteCards.indexOf(card), 1)
        playedCards = playedCards.concat(card)
        socket.emit('Submit Card', lobby, user._id, card)
        this.setState({ whiteCards, playedCards, clientActive: false })
      }
      else if (czar && gameState === "Selecting" ){
        socket.emit('Select Winner', lobby, card)
        this.setState({czar: false, clientActive: false})
      }
    }
  }

  submitUser(user) {
    socket.emit('Join Lobby', this.state.lobby, user)
  }

  submitMessage(e, message) {
    e.preventDefault()
    this.setState({ messageInput: '' })
    socket.emit('Chat Message', message, this.state.user.name, this.state.lobby)
  }

  startGame() {
    socket.emit('Start Game', this.state.lobby)
  }

  nextHand() {
    socket.emit('Update Lobby', this.state.lobby)
  }



  render() {
    let redirect = true
    if (localStorage.getItem('cahToken')) {
      redirect = false
    }
    const {
      players,
      playedCards,
      blackCard,
      whiteCards,
      selectedWhite,
      messageInput,
      messages,
      gameState,
      clientActive,
      owner,
      czar,
      czarId,
      winningCard,
    } = this.state

    const playArea = () => {
      switch (gameState) {
        case 'Idle':
          return (
            <div className="play-area">
              <h1>Waiting For Players</h1>
              {(players.length >= 3 && owner) && <button onClick={() => this.startGame()}>Start Game</button>}

            </div>
          )
        case 'Playing':
          return (
            <div className="play-area">
              <BlackCard card={blackCard} />
              {playedCards.map((card) => {
                return (
                  <LargeWhiteCard key={card.card + card.userId} card={card} gameState={gameState}/>
                )
              })}
            </div>

          )
        case 'Selecting':
          return (
            <div className="play-area">
              <BlackCard card={blackCard} />
              {!czar && playedCards.map((card) => {
                return (
                  <LargeWhiteCard key={card.card + card.userId} card={card} gameState={gameState} winner={winningCard} />
                )
              })}
            </div>
          )
        default:
          return <p>it broke dude</p>
      }
    }



    return (
      <div className="game-screen">
        {redirect && <Redirect to="/login" />}
        <div className="players">
          <h1>Players</h1>
          <ul>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            <Players players={players} czarId={czarId}/>

          </ul>
        </div>
        {playArea()}

        <div className="chat-area">
          <Chat messages={messages} />
          <form>
            <input type="text" placeholder="Say Something" value={messageInput} onChange={e => this.setState({ messageInput: e.target.value })} />
            <button type="submit"  onClick={e => this.submitMessage(e, messageInput)}>Say Something</button>
          </form>
        </div>
        <div className="white-cards">
          {clientActive ?
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
            :
            <div className="inactive">
             {gameState === 'Playing' ? (czar ? <h1>You are the Card Czar</h1> : <h1>You already played a card</h1>) : (gameState==="Idle"? <h1>Waiting for the game to start</h1> : (winningCard? <div><h1>{winningCard.name} Won the Round</h1> <button onClick={() => this.nextHand()}>next hand</button></div>: <h1>Card czar is picking a winner</h1>))} 
             </div>

          }
        </div>
      </div>
    )
  }
}


export default GameScreen
