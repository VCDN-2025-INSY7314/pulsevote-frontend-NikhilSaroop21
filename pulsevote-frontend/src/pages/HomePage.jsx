// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../lib/auth';

export default function HomePage() {
  const authed = isAuthenticated();

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <header style={styles.nav}>
        <div style={styles.navInner}>
          <Link to="/" style={styles.brand}>
            <span style={styles.brandDot} /> PulseVote
          </Link>

          <nav style={styles.navLinks}>
            <Link to="/" style={{ ...styles.navLink, ...styles.navLinkCurrent }}>Home</Link>
            {authed ? (
              <>
                <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
                <Link to="/logout" style={{ ...styles.navBtn, ...styles.navBtnSecondary }}>Logout</Link>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.navLink}>Login</Link>
                <Link to="/register" style={{ ...styles.navBtn, ...styles.navBtnPrimary }}>Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main style={styles.main}>
        <section style={styles.hero}>
          <h1 style={styles.title}>Secure polls made simple</h1>
          <p style={styles.subtitle}>
            JWT-protected API, HTTPS by default, and a clean React frontend.
          </p>

          <div style={styles.actions}>
            {authed ? (
              <>
                <Link to="/dashboard" style={{ ...styles.btn, ...styles.btnPrimary }}>
                  Go to Dashboard
                </Link>
                <Link to="/logout" style={{ ...styles.btn, ...styles.btnSecondary }}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" style={{ ...styles.btn, ...styles.btnPrimary }}>
                  Login
                </Link>
                <Link to="/register" style={{ ...styles.btn, ...styles.btnSecondary }}>
                  Register
                </Link>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ——— Warm palette (red/orange/yellow) & white text; inline-only ——— */
const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(1100px 600px at 15% -10%, rgba(250,204,21,0.10), transparent), ' + // yellow glow
      'radial-gradient(900px 500px at 85% 110%, rgba(239,68,68,0.12), transparent), ' +   // red glow
      '#1b0d0b',
    color: '#ffffff',
    fontFamily: 'Inter, system-ui, Arial, sans-serif',
  },

  /* NAV */
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: 'linear-gradient(180deg, rgba(27,13,11,0.95), rgba(27,13,11,0.8))',
    borderBottom: '1px solid #7c2d12',
    backdropFilter: 'blur(6px)',
  },
  navInner: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    justifyContent: 'space-between',
  },
  brand: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 900,
    letterSpacing: '0.3px',
    fontSize: 18,
  },
  brandDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: 'conic-gradient(from 180deg, #f97316, #ef4444, #facc15, #f97316)',
    boxShadow: '0 0 14px rgba(250,204,21,0.6)',
  },
  navLinks: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '8px 10px',
    borderRadius: 10,
    border: '1px solid transparent',
    fontWeight: 700,
    opacity: 0.95,
  },
  navLinkCurrent: {
    border: '1px solid #7c2d12',
    background: '#2b1512',
  },
  navBtn: {
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: 12,
    fontWeight: 800,
    letterSpacing: '0.3px',
    color: '#ffffff',
    boxShadow: '0 3px 12px rgba(0,0,0,0.25)',
  },
  navBtnPrimary: {
    background: 'linear-gradient(180deg, #f97316, #ef4444)', // orange → red
    border: '1px solid #ef4444',
  },
  navBtnSecondary: {
    background: '#2b1512',
    border: '1px solid #facc15', // yellow
  },

  /* MAIN / HERO */
  main: {
    display: 'grid',
    placeItems: 'center',
    padding: '36px 24px',
  },
  hero: {
    width: 'min(900px, 94vw)',
    background: '#24110f',
    border: '1px solid #7c2d12',
    borderRadius: 16,
    padding: '40px 28px',
    textAlign: 'center',
    boxShadow: '0 16px 44px rgba(0,0,0,0.45)',
  },
  title: {
    margin: 0,
    fontSize: 42,
    lineHeight: 1.1,
    color: '#ffffff',
    letterSpacing: '0.3px',
  },
  subtitle: {
    margin: '12px 0 24px',
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.92,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  btn: {
    display: 'inline-block',
    padding: '12px 18px',
    borderRadius: 12,
    fontWeight: 900,
    letterSpacing: '0.3px',
    textDecoration: 'none',
    color: '#ffffff',
    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
    userSelect: 'none',
  },
  btnPrimary: {
    background: 'linear-gradient(180deg, #f97316, #ef4444)', // orange → red
    border: '1px solid #ef4444',
  },
  btnSecondary: {
    background: '#2b1512',
    border: '1px solid #facc15', // yellow
  },
};
