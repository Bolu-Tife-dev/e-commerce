export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      textAlign: 'center',
      padding: '2rem',
      background: '#f7fafc',
      borderTop: '1px solid #e2e8f0',
      marginTop: '3rem',
      color: '#4a5568'
    }}>
      <p>© {year} Luxe. All rights reserved. | Built with Next.js</p>
    </footer>
  );
}