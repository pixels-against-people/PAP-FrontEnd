import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(){
  return(
    <nav className="navbar">
      <ul>
        <li>
        <Link to="/">Logo</Link>
        <Link to="/">Home</Link>
        <Link to="/">New Game</Link>
        </li>
        <li>
        <Link to="/">Sign Up</Link>
        <Link to="/">Log in</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar