import React, { Component } from 'react'
import './WhiteCard.css'

class WhiteCard extends Component {


  render(){
    const { text, selected, onclick, submit } = this.props
    
    return(
      <div onClick={onclick} className={"white-card " + (selected? 'selected' : '')}>
          <p>{text}</p>
          {selected && 
          <div className="overlay" onClick={submit}> <p>Confirm?</p> </div>
          }
      </div>
    )
  }
}

export default WhiteCard