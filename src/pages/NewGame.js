import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class NewGame extends Component {

  render(){
    return (<Link to="play-game" >Start!</Link>)
  }
}

export default NewGame