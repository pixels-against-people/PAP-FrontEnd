/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import openSocket from 'socket.io-client'

import './Chat.css'

const socket = openSocket('http://localhost:4000')


class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      chatMessage: '',
    }
  }

  componentWillMount() {
    this.handleMessage()
    this.handleAlert()
  }

  handleMessage() {
    socket.on('newMessage', (message) => {
      let { messages } = this.state
      messages = messages.concat(message)
      this.setState({ messages })
    })
  }

  // eslint-disable-next-line class-methods-use-this
  handleAlert() {
    socket.on('newAlert', () => {
      alert("ahhhhhh")
    })
  }

  submitMessage(e, message) {
    e.preventDefault()
    socket.emit('chatMessage', message)
    this.setState({ chatMessage: '' })
  }

  // eslint-disable-next-line class-methods-use-this
  createAlert(e) {
    e.preventDefault()
    socket.emit('alert')
  }

  render() {
    const { messages, chatMessage } = this.state
    return (
      <div className="chat">
        <h1>Chat</h1>
        <ul>
          {messages.map(message => <li>{message}</li>)}
        </ul>
        <input type="text" value={chatMessage} onChange={e => this.setState({ chatMessage: e.target.value })} />
        <button onClick={e => this.submitMessage(e, chatMessage)} type="submit">Say something!</button>
        <button onClick={e => this.createAlert(e)} type="submit">ahhhh</button>
      </div>
    )
  }
}

export default Chat
