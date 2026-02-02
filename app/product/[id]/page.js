"use client";

import { useEffect, useState, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import styles from '../../../styles/ProductDetail.module.css';
import { formatPrice } from '../../../utils/helpers';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <img
        src={product.thumbnail}
        alt={product.title || 'Product image'}
        className={styles.image}
        loading="lazy"
      />
      <h1>{product.title}</h1>
      <p className={styles.price}>{formatPrice(product.price)}</p>
      <p className={styles.discount}>Discount: {product.discountPercentage}%</p>
      <p className={styles.rating}>Rating: {product.rating}/5</p>
      <p>{product.description}</p>
      <button
        onClick={() => {
          if (!auth?.user) return router.push('/login');
          addToCart(product);
        }}
        className={styles.button}
      >
        Add to Cart
      </button>
    </div>
  );
}