import { Link } from 'react-router-dom';
import { getToken, setToken, clearToken, isAuthenticated } from '../lib/auth';

export default function Layout({ children }) {
  const authed = useAuthStatus();

  return (
    <div style={{ fontFamily: 'Inter, system-ui, Arial', minHeight: '100vh', background: '#0f172a', color: '#e2e8f0' }}>
      <header style={{ borderBottom: '1px solid #334155', padding: '1rem' }}>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 700 }}>PulseVote</Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" style={{ color: '#e2e8f0' }}>Home</Link>
            {authed ? (
              <>
                <Link to="/dashboard" style={{ color: '#e2e8f0' }}>Dashboard</Link>
                <Link to="/logout" style={{ color: '#e2e8f0' }}>Logout</Link>
              </>
            ) : (
              <>
                <Link to="/register" style={{ color: '#e2e8f0' }}>Register</Link>
                <Link to="/login" style={{ color: '#e2e8f0' }}>Login</Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>{children}</main>
      <footer style={{ borderTop: '1px solid #334155', padding: '1rem', textAlign: 'center', opacity: 0.7 }}>
        © {new Date().getFullYear()} PulseVote
      </footer>
    </div>
  );
}
