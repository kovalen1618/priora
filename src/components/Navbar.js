import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import styles from './Navbar.module.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  
  const location = useLocation();

  return (
      <nav className={styles.navbar}>
          <ul>
            <li><Link to='/'>Priora</Link></li>

            {user && (
              <>
                <li className={styles.name}>{user.displayName}'s Tasks</li>
                <li>
                  <button className={styles.button} onClick={logout}>Logout</button>
                </li>
              </>
            )}

            {!user && (
              <>
                {location.pathname === '/login' ? (
                  <>
                    <li className={styles.active}>Login</li>
                    <li><Link to="/signup">Signup</Link></li>
                  </>
                ) : (
                  <>
                    <li className={styles.active}>Signup</li>
                    <li><Link to="/login">Login</Link></li>
                  </>
                )}
              </>
            )}
          </ul>
      </nav>
  )
}

export default Navbar