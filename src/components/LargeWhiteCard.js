/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './LargeWhiteCard.css'

const LargeWhiteCard = (props) => {
  const { text, gameState } = props
  return (
    <div className="lwc">
    {gameState==="Selecting"? <p>{text}</p> : <p className="hidden">Pixels Aginst People</p>}
      
    </div>
  )
}

export default LargeWhiteCard
