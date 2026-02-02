'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import styles from '../../styles/Store.module.css';

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  if (loading) return <p className={styles.loading}>Loading products...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Luxe Store</h1>
        <p className={styles.subtitle}>Browse all our premium products</p>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products by name, category, or description..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <p className={styles.resultCount}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className={styles.noResults}>
          <p>No products match your search. Try a different query.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
