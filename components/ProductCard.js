import Link from 'next/link';
import styles from '../styles/ProductCard.module.css';
import { formatPrice } from '../utils/helpers';

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title || 'Product image'}
        className={styles.image}
        loading="lazy"
      />
      <h3>{product.title}</h3>
      <p className={styles.price}>{formatPrice(product.price)}</p>
      <p className={styles.discount}>Discount: {product.discountPercentage}%</p>
      <p className={styles.rating}>Rating: {product.rating}/5</p>
      <Link href={`/product/${product.id}`} className={styles.link} aria-label={`View ${product.title}`}>
        View Details
      </Link>
    </div>
  );
}