import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
      <nav className={styles.navbar}>
          <ul>
            <li><Link to='/'>Priora</Link></li>

            {user && (
              <>
                <li>Hello, {user.displayName}</li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            )}

            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}
          </ul>
      </nav>
  )
}

export default Navbar