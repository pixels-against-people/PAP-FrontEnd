/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './Players.css'
import decode from 'jwt-decode'

const Players = (props) => {
  const { players, czarId } = props
  const mappedPlayers = players.map((player) => {
    return (
      <li className="player" key={player.id}>
        <h3>{decode(localStorage.getItem('cahToken'))._id===player.id && 'Me: '}{player.name} {czarId===player.id && "(Card Czar)"}</h3>
        <p>points: {player.points ? player.points : 0}</p>
      </li>
    )
  })
  return (
    <div>{mappedPlayers}</div>
  )
}

export default Players;
