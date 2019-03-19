/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import shortId from 'short-id'

const Chat = (props) => {

  return (
    <ul>
      {props.messages.map(message => <li key={shortId.generate()}>{message.username}: {message.text}</li>)}
    </ul>
  )
}

export default Chat
