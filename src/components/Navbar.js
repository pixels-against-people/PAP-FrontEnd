/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar(props) {
  let cahToken = null
  if (props.isAuthed) {
    cahToken = decode(localStorage.getItem('cahToken'))
  }
  console.log(cahToken)
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/"><p>Logo</p></Link>
          <Link to="/home"><p>Home</p></Link>
          <Link to="/game"><p>New Game</p></Link>
        </li>
        {cahToken ? <li>
          <Link to="/user/:id">Profile</Link>
          <a onClick={props.logout()}>Logout</a>
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

export default Navbar
