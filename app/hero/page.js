import styles from '../../styles/Hero.module.css';
import Link from 'next/link';

export default function HeroPage() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Luxe</h1>
        <p className={styles.subtitle}>Curated premium goods — discover quality pieces for everyday luxury.</p>
        <div className={styles.ctaWrap}>
          <Link href="/" className={styles.ctaPrimary}>Shop Luxe</Link>
          <Link href="/contact" className={styles.ctaGhost}>Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
