'use client';

import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { CartContext } from '../../context/CartContext';
import styles from '../../styles/SuccessCancel.module.css';

export default function Success() {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    // Clear the cart when payment is successful
    clearCart();
  }, [clearCart]);

  return (
    <div className={styles.container}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <Link href="/">Continue Shopping</Link>
    </div>
  );
}