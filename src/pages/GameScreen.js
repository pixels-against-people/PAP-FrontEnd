import React, { Component } from 'react'
import './GameScreen.css'
class GameScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      blackCard: {text: 'Why can\'t I sleep at night' , pick: 1},
      whiteCards: ['Coat hanger abortions.', 'Man meat.', 'Autocannibalism.']
    }
  }

  render() {
    return(
      <div className="game-screen">
      <div className="players"></div>
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