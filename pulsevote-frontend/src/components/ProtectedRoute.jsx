import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../lib/auth';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname, reason: 'Please log in first.' }} />;
  }
  return children;
}
