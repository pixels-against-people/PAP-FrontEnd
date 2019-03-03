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
      selectedSets: []
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
          return <SetSelect setName={setName} highlight="" />
        })
      })
  }

  highlightSet(setName) {
    const selected = this.state.selectedSets
    if (selected.includes(setName)) {
      selected.pop(selected.indexOf(setName))
    } else {
      selected.append(setName)
    }
  }

  render() {
    return (
      <div>
        <div>
          <SetSelect onClick={this.highlightSet('pack1')} setName="pack1" highlighted={true}/>
          <SetSelect onClick={this.highlightSet('pack2')} setName="pack2" />
          <SetSelect onClick={this.highlightSet('pack3')} setName="pack3" />
          <SetSelect onClick={this.highlightSet('pack4')} setName="pack4" />
          <p>is work?</p>
        </div>
        <Link to="play-game">Start!</Link>
      </div>
    )
  }
}

export default NewGame
