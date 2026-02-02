'use client';

import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Checkout.module.css';
import formatPrice from '../../utils/helpers';

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

export default function Checkout() {
  const { cart, total } = useContext(CartContext);
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = async () => {
    if (!auth?.user) return router.push('/login');
    setError('');
    setLoading(true);

    try {
      const resp = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, email: auth.user?.email }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to create checkout session');
      }

      const session = await resp.json();

      // Redirect the browser to the hosted checkout page URL returned by the server
      if (session.url) {
        window.location.href = session.url;
      } else if (session.id) {
        // Fallback: construct checkout URL if server returns only id
        const domain = process.env.NEXT_PUBLIC_DOMAIN || window.location.origin;
        window.location.href = `${domain}/checkout?session_id=${session.id}`;
      } else {
        throw new Error('No checkout session returned');
      }
    } catch (err) {
      setError(err.message || 'Checkout failed');
      setLoading(false);
    }
  };

  if (!mounted || !cart || cart.length === 0) return <p>Cart is empty. <a href="/">Go back</a></p>;

  return (
    <div className={styles.container}>
      <h1 style={{ fontSize: '2rem', color: '#1a202c', marginBottom: '1.5rem' }}>Order Review</h1>

      <div className={styles.orderSummary}>
        <h2>Order Summary</h2>
        <ul className={styles.items}>
          {cart.map((item) => (
            <li key={item.id} className={styles.itemRow}>
              <div className={styles.itemTitle}>{item.title} × {item.quantity}</div>
              <div className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</div>
            </li>
          ))}
        </ul>

        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Estimated taxes</span>
          <span>{formatPrice(0)}</span>
        </div>

        <div className={styles.totalRow}>
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>

      {!auth?.user && (
        <p style={{ color: '#c53030' }}>You must <a href="/login">login</a> to complete a purchase.</p>
      )}

      {error && <p style={{ color: '#c53030' }}>{error}</p>}

      {!PUBLISHABLE_KEY && (
        <p style={{ color: '#c53030', marginTop: 12 }}>
          Stripe is not configured. Add your publishable key to `.env.local` as
          <br /> <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=&lt;your_key&gt;</code>
        </p>
      )}

      <button onClick={handleCheckout} disabled={loading || !auth?.user || !PUBLISHABLE_KEY} className={styles.button}>
        {loading ? 'Processing payment...' : 'Pay securely with card'}
      </button>
    </div>
  );
}