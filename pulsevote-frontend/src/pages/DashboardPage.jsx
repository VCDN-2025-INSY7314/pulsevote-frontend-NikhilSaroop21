import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { isAuthenticated } from '../lib/auth';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('Loading…');
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true, state: { from: '/dashboard', reason: 'Please log in first.' } });
      return;
    }
    let mounted = true;
    (async () => {
      try {
        const res = await api.get('/api/protected');
        if (mounted) {
          setData(res.data);
          setMsg('');
        }
      } catch (err) {
        setMsg(err?.response?.data?.message || 'Failed to load protected data.');
      }
    })();
    return () => { mounted = false; };
  }, [navigate]);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <button onClick={handleBack} style={styles.backBtn} title="Go back">
            <span style={styles.backIcon}>←</span> Back
          </button>

          <h1 style={styles.title}>Dashboard</h1>

          {msg ? <span style={styles.badgeWarn}>Issue</span> : <span style={styles.badgeOk}>OK</span>}
        </div>

        {msg && <div style={styles.notice}>{msg}</div>}

        {data && (
          <div style={styles.block}>
            <div style={styles.blockHeader}>
              <span style={styles.blockTitle}>Protected Response</span>
              <span style={styles.blockHint}>GET /api/protected</span>
            </div>
            <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

/* --- Warm palette: Red (#ef4444), Orange (#f97316), Yellow (#facc15) --- */
const styles = {
  page: {
    minHeight: '100vh',
    /* deep warm backdrop with a subtle radial glow */
    background: 'radial-gradient(1200px 700px at 20% 0%, rgba(250,204,21,0.08), transparent), radial-gradient(1000px 600px at 80% 100%, rgba(239,68,68,0.10), transparent), #1b0d0b',
    color: '#fff7ed', // very light warm (stone-50/peach)
    display: 'grid',
    placeItems: 'center',
    padding: 24,
    fontFamily: 'Inter, system-ui, Arial, sans-serif',
  },
  card: {
    width: 'min(960px, 94vw)',
    background: '#24110f',               // rich dark warm
    border: '1px solid #7c2d12',         // burnt orange border
    borderRadius: 16,
    padding: 20,
    boxShadow: '0 14px 40px rgba(0,0,0,0.45)',
  },
  headerRow: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  title: {
    margin: 0,
    fontSize: 28,
    lineHeight: 1.2,
    textAlign: 'center',
    letterSpacing: '0.2px',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    borderRadius: 10,
    border: '1px solid #f97316',           // orange
    background: 'linear-gradient(180deg, #f97316, #ef4444)', // orange → red
    color: '#fff7ed',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
    userSelect: 'none',
  },
  backIcon: {
    fontSize: 16,
    lineHeight: 1,
    opacity: 0.95,
  },
  badgeOk: {
    justifySelf: 'end',
    background: '#3a2506',                // dark amber base
    border: '1px solid #facc15',          // yellow
    color: '#fff8c6',                     // pale yellow text
    padding: '6px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: '0.4px',
  },
  badgeWarn: {
    justifySelf: 'end',
    background: '#3b0f0f',                // dark red base
    border: '1px solid #ef4444',          // red
    color: '#ffe4e6',
    padding: '6px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: '0.4px',
  },
  notice: {
    marginTop: 6,
    marginBottom: 12,
    padding: '10px 12px',
    background: '#2b1512',
    border: '1px solid #ea580c',          // orange-600
    borderRadius: 12,
    fontSize: 14,
  },
  block: {
    marginTop: 12,
    border: '1px solid #7c2d12',
    borderRadius: 12,
    overflow: 'hidden',
  },
  blockHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 12px',
    background: 'linear-gradient(180deg, #2a1411, #1f0e0c)',
    borderBottom: '1px solid #7c2d12',
    fontSize: 13,
  },
  blockTitle: {
    fontWeight: 800,
    color: '#facc15',                      // yellow title
  },
  blockHint: {
    color: '#f97316',                      // orange hint
    opacity: 0.9,
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  pre: {
    margin: 0,
    padding: 12,
    background: '#1f0e0c',
    color: '#ffe8b6',                      // warm readable mono
    fontSize: 13,
    lineHeight: 1.5,
    overflowX: 'auto',
    textShadow: '0 0 0 transparent',
  },
};
