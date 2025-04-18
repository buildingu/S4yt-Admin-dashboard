import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const role = user?.role?.[0];
  const isAdmin = role === 'admin';
  const isBusiness = role === 'business';

  if (user && token) {
    const path = window.location.pathname;

    if (path.startsWith('/admin-db') && !isAdmin) {
      return <Navigate to="/" replace />;
    }
    if (path.startsWith('/business-db') && !isBusiness) {
      return <Navigate to="/" replace />;
    }

    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
