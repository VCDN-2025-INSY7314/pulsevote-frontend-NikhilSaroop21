import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { setToken } from '../lib/auth';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value.trim() }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const { data } = await api.post('/api/auth/register', form);
      setToken(data.token);
      setMsg('Registered successfully. Redirecting…');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={{ marginBottom: '1rem' }}>Register</h2>
      {msg && <div style={styles.msg}>{msg}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
        <label>
          Email
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            autoComplete="email"
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            autoComplete="new-password"
          />
        </label>
        <button disabled={loading} style={styles.button}>
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: '#111827',
    border: '1px solid #374151', // ✅ fixed
    borderRadius: 16,
    padding: '1.5rem',
  },
  input: {
    width: '100%',
    marginTop: 6,
    padding: '0.6rem 0.8rem',
    background: '#0b1220',
    color: '#e5e7eb',
    border: '1px solid #374151', // ✅ fixed
    borderRadius: 10,
  },
  button: {
    padding: '0.7rem 1rem',
    borderRadius: 10,
    border: '1px solid #10b981',
    background: '#059669',
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
  },
  msg: {
    padding: '0.6rem 0.8rem',
    background: '#1f2937',
    border: '1px solid #374151',
    borderRadius: 10,
    color: '#e5e7eb',
    marginBottom: '0.5rem',
  },
};
