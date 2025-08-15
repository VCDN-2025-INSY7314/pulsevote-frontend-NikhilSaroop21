import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { setToken } from '../lib/auth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';
  const reason = location.state?.reason;

  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState(reason || '');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value.trim() }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const { data } = await api.post('/api/auth/login', form);
      setToken(data.token);
      setMsg('Login successful. Redirecting…');
      navigate(from, { replace: true });
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={card}>
      <h2 style={{ marginBottom: '1rem' }}>Login</h2>
      {msg && <div style={alert}>{msg}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
        <label>Email
          <input required type="email" name="email" value={form.email} onChange={handleChange} style={input} autoComplete="email" />
        </label>
        <label>Password
          <input required type="password" name="password" value={form.password} onChange={handleChange} style={input} autoComplete="current-password" />
        </label>
        <button disabled={loading} style={button}>{loading ? 'Signing in…' : 'Login'}</button>
      </form>
    </div>
  );
}

const card = { background: '#111827', border: '1px solid #374151', borderRadius: 16, padding: '1.5rem' };
const input = { width: '100%', marginTop: 6, padding: '0.6rem 0.8rem', background: '#0b1220', color: '#e5e7eb', border: '1px solid #374151', borderRadius: 10 };
const button = { padding: '0.7rem 1rem', borderRadius: 10, border: '1px solid #2563eb', background: '#1d4ed8', color: 'white', fontWeight: 600, cursor: 'pointer' };
const alert = { padding: '0.6rem 0.8rem', background: '#0b3b0e', border: '1px solid #166534', borderRadius: 10, color: '#a7f3d0', marginBottom: '0.5rem' };
