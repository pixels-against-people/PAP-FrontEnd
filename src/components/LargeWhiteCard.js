/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './LargeWhiteCard.css'

const LargeWhiteCard = (props) => {
  return (
    <div className="lwc">
      <p>{props.text}</p>
    </div>
  )
}

export default LargeWhiteCard
