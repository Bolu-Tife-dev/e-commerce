'use client';

import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import Link from 'next/link';
import styles from '../../styles/Cart.module.css';

export default function Cart() {
  const { cart, total } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty. <Link href="/">Shop now</Link></p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <p className={styles.total}>Total: ${total.toFixed(2)}</p>
          <Link href="/checkout" className={styles.checkoutButton}>
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}