/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import './GameScreen.css'
class GameScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      blackCard: {text: 'Why can\'t I sleep at night' , pick: 1},
      whiteCards: ['Coat hanger abortions.', 'Man meat.', 'Autocannibalism.'],
      players: ['papas home', 'urmom', 'WOAH.css']
    }
  }

  render() {
    return(
      <div className="game-screen">
      <div className="players">
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
          
        </div>
      <div className="chat"></div>
      <div className="white-cards">
        <ul>
          {this.state.whiteCards.map(card => {
            return(
              <li className='card' key={card}>{card}</li>
            )
          })}
        </ul>
      </div>
      </div>
    )
  }
}

export default GameScreen