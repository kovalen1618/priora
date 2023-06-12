import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css';

function Navbar() {
  return (
    <div>
        <nav className={styles.navbar}>
            <ul>
              <li><Link to='/'>Home</Link></li>

              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar