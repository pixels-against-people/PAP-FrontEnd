/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NewGame.css'
import SetSelect from '../components/SetSelect'
// import GameScreen from './GameScreen'

class NewGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSets: [],
      cardSets: [],
    }
  }

  componentDidMount() {
    // generates setlist from the CAH-API when the component is called
    fetch('https://cards-against-humanity-api.herokuapp.com/sets')
      .then(response => response.json())
      .then((sets) => {
        this.setState({ cardSets: sets })
      }).catch(err => console.log(err.message))
  }

  highlightSet(setName) {
    // adds selected set to state if not already included, removes if it is already included
    const selected = this.state.selectedSets
    if (selected.includes(setName)) {
      selected.splice(selected.indexOf(setName), 1)
      this.setState({ selectedSets: selected })
    } else {
      selected.push(setName)
      this.setState({ selectedSets: selected })
    }
  }

  renderSets(sets) {
    // maps setnames to elements based on whether or not they are in the selectedsets state
    return sets.map((set) => {
      const output = (this.state.selectedSets.includes(set.setName)
        ? <SetSelect onClick={() => this.highlightSet(set.setName)} key={set.setName} setName={set.setName} highlight="highlighted" />
        : <SetSelect onClick={() => this.highlightSet(set.setName)} key={set.setName} setName={set.setName} highlight="unhighlighted" />)
      return output
    })
  }

  render() {
    return (
      <div className="newGameContainer">
        <div className="playersContainer">
          <h1>Current Players</h1>
          <div className="player">
            <img align="middle" src="http://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg" alt="placeholder" />
            <span>Jack</span>
          </div>
        </div>
        <div className="setContainer">
          <h1>Select The Decks You'd Like to Use</h1>
          {this.renderSets(this.state.cardSets)}
        </div>
        <div className="startButton">
          {/* <Link className="Link" to={`${this.props.match.path}/lobby`}>Start!</Link> */}
          <Link className="Link" to="/play-game">Start</Link>
        </div>
        {/* <Route path={`${this.props.match.path}/:lobbyId`} component={() => <GameScreen decks={this.state.selectedSets} />} /> */}
      </div>
    )
  }
}

export default NewGame
