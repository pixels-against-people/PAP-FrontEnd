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
        <ul>
          <li>
            <Link to="/"><p>Logo</p></Link>
            <Link to="/"><p>Home</p></Link>
            <Link to="/game"><p>New Game</p></Link>
          </li>
          {this.state.isAuthed ? <li>
            <Link to="/user/:id"><p>Profile</p></Link>
            {/* eslint-disable-next-line */}
            <a onClick={() => this.logout()}><p>Logout</p></a>
          </li>
            :
            <li>
              <Link to="/register"><p>Sign Up</p></Link>
              <Link to="/login"><p>Log in</p></Link>
            </li>
          }
        </ul>
      </nav>
    )
  }
}

export default Navbar
