import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If user is NOT logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user IS logged in
  return children;
}

export default ProtectedRoute;
