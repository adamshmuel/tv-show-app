import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>NavBar
      <nav style={{ display: 'flex', gap: '28px' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </div>
  )
}
