/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React from 'react'
import './BlackCard.css'

function BlackCard(props) {
  const { card } = props
  const { text, pick } = card
  return (
    <div className="black-card">
      <p>{text}</p>
      <div>
        <p>pick: </p>
        <div>{pick}</div>
      </div>
    </div>
  )
}

export default BlackCard
