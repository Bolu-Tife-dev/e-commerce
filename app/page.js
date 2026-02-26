'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Home.module.css';

const testimonials = [
  { name: 'Sarah M.', quote: 'Amazing products and excellent customer service!' },
  { name: 'John D.', quote: "Best shopping experience I've had online." },
  { name: 'Emma L.', quote: 'High quality items and fast delivery.' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=12')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className={styles.loading}>Loading products...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to Luxe</h1>
          <p className={styles.heroSubtitle}>
            Curated premium goods — discover quality pieces for everyday luxury.
          </p>
          <div className={styles.ctaWrap}>
            <a href="#products" className={styles.ctaPrimary}>Shop Luxe</a>
            <Link href="/contact" className={styles.ctaGhost}>Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
        <div className={styles.testimonialGrid}>
          {testimonials.map((t, idx) => (
            <div key={idx} className={styles.testimonialCard}>
              <p className={styles.quote}>"{t.quote}"</p>
              <p className={styles.testimonialName}>— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.contactSection}>
        <h2 className={styles.sectionTitle}>Get in Touch</h2>
        <p className={styles.contactText}>Have questions? We'd love to hear from you.</p>
        <a href="/contact" className={styles.ctaButton}>Contact Us</a>
      </section>
    </div>
  );
}