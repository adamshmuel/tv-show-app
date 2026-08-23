import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>NavBar
      <nav>
        <Link to="/">Home</Link>
        <br />
        <Link to="/about">About</Link>
        <br />
        <Link to="/favorites">Favorites</Link>
      </nav>
    </div>
  )
}
