import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
      <nav className="custom-navbar">
        <div className="navbar-container">
          <ul className="nav-list">
            <li className="nav-item">
              <div className="nav-link"><Link to="/">Home</Link></div>
            </li>
            <li className="nav-item">
              <div className="nav-link"><Link to="/About">About</Link></div>
            </li>
            <li className="nav-item">
              <div className="nav-link"><Link to="/Assignment">Assignment</Link></div>
            </li>
            <li className="nav-item">
              <div className="nav-link"><Link to={'/chatadmin'}>Chat Admin</Link></div>
            </li>
          </ul>
          <form className="search-form">
            <input className="search-input" type="search" placeholder="Search" />
            <button className="search-btn" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  )
}
