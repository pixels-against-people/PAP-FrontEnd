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
        <div className="setContainer">
          <h1>Select The Decks You'd Like to Use</h1>
          <SetSelect onClick={() => this.highlightSet('pack1')} setName="pack1" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack2')} setName="pack2" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack3')} setName="pack3" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack4')} setName="pack4" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack1')} setName="pack1" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack2')} setName="pack2" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack3')} setName="pack3" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack4')} setName="pack4" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack1')} setName="pack1" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack2')} setName="pack2" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack3')} setName="pack3" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack4')} setName="pack4" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack1')} setName="pack1" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack2')} setName="pack2" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack3')} setName="pack3" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack4')} setName="pack4" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack1')} setName="pack1" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack2')} setName="pack2" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack3')} setName="pack3" highlight="highlighted" />
          <SetSelect onClick={() => this.highlightSet('pack4')} setName="pack4" highlight="highlighted" />
        </div>
        <Link to="play-game">Start!</Link>
      </div>
    )
  }
}

export default NewGame
