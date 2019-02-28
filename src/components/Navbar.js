import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(){
  return(
    <nav className="navbar">
      <ul>
        <Link to="/">Logo</Link>
        <Link to="/">Home</Link>
        <Link to="/">Log in</Link>
        <Link to="/">Sign Up</Link>
        <Link to="/">New Game</Link>
      </ul>
    </nav>
  )
}

export default Navbar