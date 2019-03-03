/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable semi */
import React, { Component } from 'react'
import './WhiteCard.css'

class WhiteCard extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { text, selected, onclick, submit } = this.props

    return (
      <div onClick={onclick} className={`white-card ${selected ? 'selected' : ''}`}>
        <p>{text}</p>
        {selected && (
        <div className="overlay" onClick={submit}>
          <p>Confirm?</p>
        </div>
        )
        }
      </div>
    )
  }
}

export default WhiteCard
