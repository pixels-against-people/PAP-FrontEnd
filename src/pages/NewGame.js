/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NewGame.css'
import SetSelect from '../components/SetSelect'

class NewGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSets: [],
    }
  }

  generateSets() {
    // generates setlist from the CAH-API
    fetch('https://cards-against-humanity-api.herokuapp.com/sets')
      .then((sets) => {
        sets.map(({ setName }) => {
          if (this.state.selectedSets.includes(setName)) {
            // eslint-disable-next-line react/jsx-boolean-value
            return <SetSelect setName={setName} highlight="highlighted" />
          }
          return <SetSelect setName={setName} highlight="unhighlighted" />
        })
      })
  }

  highlightSet(setName) {
    // adds selected set to state if not already included, removes if it is
    const selected = this.state.selectedSets
    if (selected.includes(setName)) {
      selected.pop(selected.indexOf(setName))
      this.setState({ selectedSets: selected })
    } else {
      selected.push(setName)
      this.setState({ selectedSets: selected })
    }
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
          <SetSelect onClick={() => this.highlightSet('pack1')} setName="pack1" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack2')} setName="pack2" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack3')} setName="pack3" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack4')} setName="pack4" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack1')} setName="pack1" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack2')} setName="pack2" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack3')} setName="pack3" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack4')} setName="pack4" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack1')} setName="pack1" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack2')} setName="pack2" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack3')} setName="pack3" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack4')} setName="pack4" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack1')} setName="pack1" highlight="unhighlighted" />
          <SetSelect onClick={() => this.highlightSet('pack2')} setName="pack2" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack3')} setName="pack3" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack4')} setName="pack4" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack1')} setName="pack1" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack2')} setName="pack2" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack3')} setName="pack3" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack4')} setName="pack4" highlight="highlighted" />
        </div>
        <div className="startButton">
          <Link className="Link" to="play-game">Start!</Link>
        </div>
      </div>
    )
  }
}

export default NewGame
