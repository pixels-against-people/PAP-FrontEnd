import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar(){
  return(
    <nav className="navbar">
      <ul>
        <li>
        <Link to="/"><p>Logo</p></Link>
        <Link to="/"><p>Home</p></Link>
        <Link to="/"><p>New Game</p></Link>
        </li>
        <li>
        <Link to="/"><p>Sign Up</p></Link>
        <Link to="/"><p>Log in</p></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar