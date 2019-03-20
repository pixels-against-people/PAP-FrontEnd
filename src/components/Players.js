/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './Players.css'

const Players = (props) => {
  const { players } = props
  const mappedPlayers = players.map((player) => {
    return (
      <li className="player" key={player.id}>
        <h3>{player.name} {player.owner && "(Owner)"}</h3>
        <p>points: {player.points}</p>
      </li>
    )
  })
  return (
    <div>{mappedPlayers}</div>
  )
}

export default Players;
