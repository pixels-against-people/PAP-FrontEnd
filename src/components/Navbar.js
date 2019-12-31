/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthed: false,
    }
  }

  componentWillMount() {
    if (localStorage.getItem('cahToken')) {
      this.setState({ isAuthed: true })
    }
  }

  logout() {
    localStorage.removeItem('cahToken')
    this.setState({ isAuthed: false })
  }

  componentDidUpdate() {
    if (localStorage.getItem('cahToken')) {
      if (!this.state.isAuthed) {
        this.setState({ isAuthed: true })
      }
    }
  }

  render() {
    return (
      <nav className="navbar">
        <h2>Pixels Against People</h2>
        {this.state.isAuthed ?
          <ul>
            <li><Link to="/">Home<div></div></Link></li>
            <li><Link to="/game">New Game<div></div></Link></li>
            <li><Link to="/user/:id">Profile<div></div></Link></li>
            <li><a href='#' onClick={() => this.logout()}>Logout<div></div></a></li>
          </ul>
          :
          <ul>
            <li><Link to="/">Home<div></div></Link></li>
            <li><Link to="/game">New Game<div></div></Link></li>
            <li><Link to="/register">Sign Up<div></div></Link></li>
            <li><Link to="/login">Log in<div></div></Link></li>
          </ul>
        }
      </nav >
    )
  }
}

export default Navbar
