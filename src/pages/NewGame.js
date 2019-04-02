/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react'
import decode from 'jwt-decode'

import openSocket from 'socket.io-client'
import { Redirect } from 'react-router-dom'
import './NewGame.css'
import '../components/Players.css'
import Players from '../components/Players'
import SetSelect from '../components/SetSelect'

const socket = openSocket('http://localhost:4000')
// const socket = openSocket('https://pixelsagainstpeople.herokuapp.com/')

class NewGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSets: ['Base'],
      cardSets: [],
      lobbyId: '',
      lobbyName: '',
      user: '',
      // AIName: '',
      // AI: [],
      players: [],
      redirect: false,
      message: '',
      lobbyFail: false,
    }
  }

  componentWillMount() {
    this.checkToken()
    fetch('https://cards-against-humanity-api.herokuapp.com/sets')
      .then(response => response.json())
      .then((sets) => {
        this.setState({ cardSets: sets })
      }).catch(err => console.log(err.message))
    // this.handleAI()
    this.handleLobby()
  }

  checkToken() {
    console.log(localStorage.getItem('cahToken'))
    if(!(localStorage.getItem('cahToken'))) {
      this.setState({ redirect: true })
    } else {
      this.setState({ players: [decode(localStorage.getItem('cahToken'))] })
    }
  }

  handleLobby() {
    socket.on("Lobby Created", (lobbyId) => {
      console.log(lobbyId)
      this.setState({ lobbyId })
    })

    socket.on("Lobby Creation Fail", message => {
      this.setState({ lobbyFail: true, message})
    })
  }

  // handleAI() {
  //   // adds the AI user to 
  //   socket.on("Add AI", (user) => {
  //     let AI = this.state.AI
  //     let players = this.state.players
  //       AI.push(user)
  //       players.push(user)
  //       this.setState({ AI, players })
  //   })
  // }

  // createAI(e, name) {
  //   // will create an AI user with the name provided
  //   e.preventDefault()
  //   let players = this.state.players
  //   if(players.findIndex(x => x.name === name) === -1) {
  //     if(name.length >= 1){
  //       socket.emit('Create AI', name)
  //       this.setState({ AIName: '' })
  //   } else {
  //       // going to add some sort of warning not to add bots with same name
  //   }
  //   }
  // }

  highlightSet(setName) {
    // adds selected set to state if not already included, removes if it is already included
    const selected = this.state.selectedSets
    if (setName === 'Base') {
      return null
    } else if(selected.includes(setName)) {
      selected.splice(selected.indexOf(setName), 1)
      this.setState({ selectedSets: selected })
    } else {
      selected.push(setName)
      this.setState({ selectedSets: selected })
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createLobby(e, strId) {
    e.preventDefault()
    fetch((`https://cards-against-humanity-api.herokuapp.com/sets/multi?sets=${this.state.selectedSets}`))
      .then(res => res.json())
      .then(res => {
        socket.emit('Create Lobby', res, strId, decode(localStorage.getItem('cahToken'))._id, this.state.AI)
      })
  }

  renderSets(sets) {
    // maps setnames to elements based on whether or not they are in the selectedsets states
    return sets.map((set) => {
      const output = (this.state.selectedSets.includes(set.setName)
        ? <SetSelect onClick={() => this.highlightSet(set.setName)} key={set.setName} setName={set.setName} highlight="highlighted" />
        : <SetSelect onClick={() => this.highlightSet(set.setName)} key={set.setName} setName={set.setName} highlight="unhighlighted" />)
      return output
    })
  }

  render() {
    const { lobbyId, players, cardSets, lobbyName, redirect, lobbyFail, message } = this.state
    return (
      <div className="newGameContainer">
        {redirect && <Redirect to="/login" />}
        {lobbyId && <Redirect to={'/play-game/' + lobbyId} />}
        <div className="players">
          <h1>Players</h1>
          <ul>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            <Players players={players} czarId={null}/>

          </ul>
        </div>
        <div className="setContainer">
          <h1>Select The Decks You'd Like to Use</h1>
          {this.renderSets(cardSets)}
        </div>
        <div className="startButton">
        {/* <form className="startForm">
            <input type="text" placeholder="Bot Name" value={AIName} onChange={e => this.setState({ AIName: e.target.value })} />
            <button type="submit" onClick={e => this.createAI(e, AIName)}>Add Bot</button>
          </form> */}
          <form className="startForm">
            <input type="text" placeholder="Lobby Name" value={lobbyName} onChange={e => this.setState({ lobbyName: e.target.value })} />
            {lobbyFail ? <div className="lobbyFail"><span>{message}</span></div>: null}
            <button type="submit" onClick={e => this.createLobby(e, lobbyName)}>Start</button>
          </form>
        </div>
      </div>
    )
  }
}

export default NewGame