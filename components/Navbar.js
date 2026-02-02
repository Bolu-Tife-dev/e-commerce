'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const auth = useContext(AuthContext);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [menuOpen, setMenuOpen] = useState(false);

  const itemCount = mounted ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <nav className={styles.navbar} aria-label="Primary navigation">
      <div className={styles.brandWrap}>
        <Link href="/" className={styles.logo} aria-label="Home">Luxe</Link>
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.mobileOpen : ''}`}>
        <li className={styles.navItem}><Link href="/">Home</Link></li>
        <li className={styles.navItem}><Link href="/contact">Contact</Link></li>
        <li className={styles.navItem}><Link href="/store">Store</Link></li>
      </ul>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {auth.user ? (
          <>
            <span style={{ color: '#4a5568' }}>Hi, {auth.user.name || auth.user.email}</span>
            <button onClick={auth.logout} style={{ background: 'transparent', border: 'none', color: '#3182ce', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.navLink}>Login</Link>
            <Link href="/signup" className={styles.navLink}>Sign Up</Link>
          </>
        )}

        <Link href="/cart" className={styles.cart} aria-label="View cart">Cart ({itemCount})</Link>
        <button
          className={styles.hamburger}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}