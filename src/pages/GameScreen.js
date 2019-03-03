import React, { Component } from 'react'
import './GameScreen.css'
import WhiteCard from '../components/WhiteCard'
class GameScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      blackCard: {text: 'Why can\'t I sleep at night' , pick: 1},
      whiteCards: ['Coat hanger abortions.', 'Man meat.', 'Autocannibalism.', 'Praying the gay away.', 'Same-sex ice dancing.', 'Ethnic cleansing.', 'Battlefield amputations.', 'An uppercut.', 'Shiny objects.'],
      players: ['papas home', 'urmom', 'WOAH.css'],
      selectedWhite: null,
      playedCards: [],
    }
  }

  selectCard(card) {
    this.setState({selectedWhite:card})
  }

  submit(card) {
    let { whiteCards, playedCards } = this.state;
    whiteCards.splice(whiteCards.indexOf(card),1)
    playedCards = playedCards.concat(card)
    this.setState({whiteCards, playedCards})
  }

  render() {
    return(
      <div className="game-screen">
        <div className="players">
          <h1>Players</h1>
          <ul>
            {this.state.players.map(player => {
              return(
                <li className='player' key={player}>{player}</li>
              )
            })}
          </ul>
        </div>
          <div className="play-area">
            <div className="black-card">{this.state.blackCard.text}</div>
            {this.state.playedCards.map(card => <p key={card}>{card}</p>)}
            
          </div>
        <div className="chat"><h1>Chat</h1></div>
        <div className="white-cards">
          <ul>
            {this.state.whiteCards.map(card => {
              return(
                <li key={card}><WhiteCard text={card} selected={card === this.state.selectedWhite} onclick={e => this.selectCard(card)} submit={e => this.submit(card)} /></li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}


export default GameScreen