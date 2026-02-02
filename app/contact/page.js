import styles from '../../styles/Contact.module.css';

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Luxe</h1>
      <p>If you have questions about orders, partnerships, or press, please email <a className={styles.link} href="mailto:hello@luxe.example">hello@luxe.example</a>.</p>
      <p>For general inquiries, you can also call <span className={styles.phone}>+1 (555) 123-4567</span> (demo).</p>
    </div>
  );
}
