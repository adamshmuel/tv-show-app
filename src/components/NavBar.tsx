import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className="page-header">
      <div className="brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="12" rx="2"></rect>
          <path d="M7 3l2.5 3M17 3l-2.5 3"></path>
        </svg>
        <span>TV Show Explorer</span>
      </div>
      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
        <NavLink to="/favorites" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Favorites</NavLink>
      </nav>
    </div>
  )
}
