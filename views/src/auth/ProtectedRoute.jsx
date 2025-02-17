import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);


  return user && token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;