// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../api/axios';
import { setToken } from '../lib/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || '/dashboard';
  const reason = loc.state?.reason;

  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState(reason || '');
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const { data } = await api.post('/api/auth/login', form);
      setToken(data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <button type="button" onClick={goBack} style={styles.backBtn} title="Go back">
            <span style={styles.backIcon}>←</span> Back
          </button>
          <h1 style={styles.title}>Welcome back</h1>
          <span style={{ width: 78 }} /> {/* spacer */}
        </div>

        {msg && <div style={styles.notice}>{msg}</div>}

        <form onSubmit={onSubmit} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              style={styles.input}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
              style={styles.input}
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </label>

          <button disabled={loading} type="submit" style={styles.submit}>
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p style={styles.helper}>
          New here?{' '}
          <Link to="/register" style={styles.link}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}

/* —— Warm palette: red (#ef4444), orange (#f97316), yellow (#facc15); white text —— */
const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(1100px 600px at 15% -10%, rgba(250,204,21,0.10), transparent), ' + // yellow glow
      'radial-gradient(900px 500px at 85% 110%, rgba(239,68,68,0.12), transparent), ' +   // red glow
      '#1b0d0b',
    display: 'grid',
    placeItems: 'center',
    padding: 24,
    fontFamily: 'Inter, system-ui, Arial, sans-serif',
    color: '#ffffff',
  },
  card: {
    width: 'min(560px, 94vw)',
    background: '#24110f',
    border: '1px solid #7c2d12', // burnt orange
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 16px 44px rgba(0,0,0,0.45)',
  },
  headerRow: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  title: {
    margin: 0,
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 1.2,
    color: '#ffffff',
    letterSpacing: '0.2px',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    borderRadius: 10,
    border: '1px solid #f97316', // orange
    background: 'linear-gradient(180deg, #f97316, #ef4444)', // orange → red
    color: '#ffffff',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
    userSelect: 'none',
  },
  backIcon: { fontSize: 16, lineHeight: 1 },
  notice: {
    marginBottom: 12,
    padding: '10px 12px',
    background: '#2b1512',
    border: '1px solid #ea580c', // orange-600
    borderRadius: 12,
    fontSize: 14,
    color: '#ffffff',
  },
  form: { display: 'grid', gap: 12 },
  label: { display: 'grid', gap: 6, fontWeight: 700, color: '#ffffff' },
  input: {
    padding: '10px 12px',
    borderRadius: 10,
    border: '1px solid #7c2d12',
    background: '#1f0e0c',
    color: '#ffffff',
    outline: 'none',
  },
  submit: {
    marginTop: 6,
    padding: '10px 16px',
    borderRadius: 12,
    border: '1px solid #facc15', // yellow
    background: 'linear-gradient(180deg, #facc15, #f97316)', // yellow → orange
    color: '#1b0d0b',
    fontWeight: 900,
    letterSpacing: '0.3px',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
  },
  helper: { marginTop: 12, textAlign: 'center', color: '#ffffff', opacity: 0.95 },
  link: {
    color: '#facc15', // yellow
    fontWeight: 800,
    textDecoration: 'none',
    borderBottom: '1px dashed rgba(250,204,21,0.6)',
  },
};


