/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './LargeWhiteCard.css'

const LargeWhiteCard = (props) => {
  const { card, winner, gameState } = props
  let classes = ""
  if(winner) {
    if(card.userId === winner.userId) {
      classes = 'winning-card'
    }
  }
  return (
    <div className={"lwc " + classes}>
    {gameState==="Selecting"? <div><p>{card.card}</p>{winner && <p>{card.name}</p>}</div> : <p className="hidden">Pixels Aginst People</p>}
      
    </div>
  )
}

export default LargeWhiteCard
