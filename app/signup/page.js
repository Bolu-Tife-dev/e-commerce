"use client";

import { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Auth.module.css';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    const result = auth.signup({ email, name });
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create a Luxe account</h1>
      {error && <p style={{ color: '#c53030', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Full name
          <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label className={styles.label}>
          Email
          <input className={styles.input} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label className={styles.label}>
          Password
          <input className={styles.input} type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button type="submit" className={styles.button}>Create account</button>
      </form>

      <p className={styles.note}>Already registered? <Link href="/login">Login</Link></p>
    </div>
  );
}
