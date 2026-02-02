import Link from 'next/link';
import styles from '../../styles/SuccessCancel.module.css';

export default function Cancel() {
  return (
    <div className={styles.container}>
      <h1>Payment Canceled</h1>
      <p>Your payment was not processed.</p>
      <Link href="/cart">Back to Cart</Link>
    </div>
  );
}