import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../lib/auth';

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    clearToken();
    navigate('/', { replace: true });
  }, [navigate]);

  return <p>Signing out…</p>;
}
