'use client';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeProvider';
import styles from '../styles/Navbar.module.css';

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function CartIcon({ count }) {
  return (
    <Link href="/cart" className={styles.cartBtn} aria-label={`View cart, ${count} items`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      {count > 0 && <span className={styles.cartBadge}>{count}</span>}
    </Link>
  );
}

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const auth = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  const itemCount = mounted ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} aria-label="Primary navigation">
      <div className={styles.brandWrap}>
        <Link href="/" className={styles.logo} aria-label="Home">
          Luxe<span className={styles.logoDot} aria-hidden="true">.</span>
        </Link>
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.mobileOpen : ''}`} role="list">
        {([['/', 'Home'], ['/store', 'Store'], ['/contact', 'Contact']]).map(([href, label]) => (
          <li key={href} className={styles.navItem}>
            <Link href={href} className={styles.navLink} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          </li>
        ))}
        {mounted && auth.user ? (
          <li className={styles.navItem}>
            <button
              className={styles.navLink}
              onClick={() => { auth.logout(); setMenuOpen(false); }}
            >
              Logout
            </button>
          </li>
        ) : mounted && (
          <>
            <li className={styles.navItem}>
              <Link href="/login" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/signup" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className={styles.actions}>
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <span className={styles.themeIconWrap}>
            <span className={`${styles.themeIcon} ${theme === 'light' ? styles.themeIconVisible : ''}`}><MoonIcon /></span>
            <span className={`${styles.themeIcon} ${theme === 'dark' ? styles.themeIconVisible : ''}`}><SunIcon /></span>
          </span>
        </button>

        {mounted && auth.user ? (
          <div className={styles.userArea}>
            <span className={styles.userName}>{auth.user.name || auth.user.email}</span>
            <button onClick={auth.logout} className={styles.logoutBtn}>Logout</button>
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link href="/login" className={styles.loginLink}>Login</Link>
            <Link href="/signup" className={styles.signupBtn}>Sign Up</Link>
          </div>
        )}

        <CartIcon count={itemCount} />

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
        </button>
      </div>

      {menuOpen && <div className={styles.mobileOverlay} onClick={() => setMenuOpen(false)} aria-hidden="true" />}
    </nav>
  );
}