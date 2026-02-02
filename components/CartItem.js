import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import styles from '../styles/Cart.module.css';
import { formatPrice } from '../utils/helpers';

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  const handleChange = (e) => {
    const raw = parseInt(e.target.value, 10);
    const qty = Math.max(1, Number.isNaN(raw) ? 1 : raw);
    updateQuantity(item.id, qty);
  };

  return (
    <div className={styles.item}>
      <img src={item.thumbnail} alt={item.title || 'Product image'} className={styles.image} />
      <div>
        <h4>{item.title}</h4>
        <p>{formatPrice(item.price)} x {item.quantity} = {formatPrice(item.price * item.quantity)}</p>
        <label htmlFor={`qty-${item.id}`} className={styles.srOnly}>Quantity for {item.title}</label>
        <input
          id={`qty-${item.id}`}
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleChange}
          className={styles.quantity}
          aria-label={`Quantity for ${item.title}`}
        />
        <button onClick={() => removeFromCart(item.id)} className={styles.remove} aria-label={`Remove ${item.title}`}>
          Remove
        </button>
      </div>
    </div>
  );
}