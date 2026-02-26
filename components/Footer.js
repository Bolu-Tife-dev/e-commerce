import styles from '../styles/Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>© {year} Luxe. All rights reserved. | Built with Next.js</p>
    </footer>
  );
}