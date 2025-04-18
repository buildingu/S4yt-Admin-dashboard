import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  console.log(user["role"])
  const isAdmin = user && user.role[0] == 'admin';
  const isBusiness = user && user.role[0] == 'business';

  if (user && token) {
    if (window.location.pathname.startsWith('/admin-db') && !isAdmin) {
      return <Navigate to="/" replace />;
    }
    else if (window.location.pathname.startsWith('/business-db') && !isBusiness) {
      return <Navigate to="/" replace />;
    }
    return children; 
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;