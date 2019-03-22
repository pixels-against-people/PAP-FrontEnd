/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import shortId from 'short-id'
import './Chat.css'

const Chat = (props) => {

  return (
    <ul>
      {props.messages.map(message => <li key={shortId.generate()}><span className="username">{message.username}</span>: <span className="message">{message.text}</span></li>)}
    </ul>
  )
}

export default Chat
