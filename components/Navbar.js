'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const auth = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [menuOpen, setMenuOpen] = useState(false);

  const itemCount = mounted ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  function ThemeToggle() {
    return (
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark/light theme"
        style={{
          background: 'transparent',
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
          color: 'var(--color-text)'
        }}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    );
  }

  return (
    <nav className={styles.navbar} aria-label="Primary navigation">
      <div className={styles.brandWrap}>
        <Link href="/" className={styles.logo} aria-label="Home">Luxe</Link>
      </div>

      <ul className={styles.navLinks}>
        <li className={styles.navItem}><Link href="/">Home</Link></li>
        <li className={styles.navItem}><Link href="/contact">Contact</Link></li>
        <li className={styles.navItem}><Link href="/store">Store</Link></li>
      </ul>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }} className={styles.actions}>
        <ThemeToggle />

        {auth.user ? (
          <>
            <span style={{ color: 'var(--color-muted)' }}>
              Hi, {auth.user.name || auth.user.email}
            </span>
            <button
              onClick={auth.logout}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-link)',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.navLink}>Login</Link>
            <Link href="/signup" className={styles.navLink}>Sign Up</Link>
          </>
        )}

        <Link
          href="/cart"
          className={styles.cart}
          aria-label={`View cart, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={styles.cartIcon}
            aria-hidden="true"
          >
            <path d="M3 3h2l.4 2m0 0h13.2l1.2 6.4a1 1 0 01-.96 1.36H7.36a1 1 0 01-.96-1.36L5.44 5zm0 0L7 13h10l1.6-7H5.4" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="17" cy="20" r="1" />
          </svg>
          {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
        </Link>

        {/* hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
        </button>
      </div>

      {/* mobile-only dropdown */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>

        {/* NEW CLOSE BUTTON */}
        <div className={styles.mobileHeader}>
          <button
            className={styles.closeBtn}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <ul className={styles.mobileLinks}>
          <li className={styles.navItem}>
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/store" onClick={() => setMenuOpen(false)}>Store</Link>
          </li>
        </ul>

        <div className={styles.mobileActions}>
          <ThemeToggle />

          {auth.user ? (
            <>
              <span style={{ color: 'var(--color-muted)' }}>
                Hi, {auth.user.name || auth.user.email}
              </span>
              <button
                onClick={() => { auth.logout(); setMenuOpen(false); }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-link)',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link href="/signup" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}

          <Link
            href="/cart"
            className={styles.cart}
            aria-label={`View cart, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.cartIcon}
              aria-hidden="true"
            >
              <path d="M3 3h2l.4 2m0 0h13.2l1.2 6.4a1 1 0 01-.96 1.36H7.36a1 1 0 01-.96-1.36L5.44 5zm0 0L7 13h10l1.6-7H5.4" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
            </svg>
            {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
