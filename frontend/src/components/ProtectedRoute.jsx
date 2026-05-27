import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  // If token does NOT exist
  if (!token) {

    return <Navigate to="/login" />;

  }

  // If token exists
  return children;
}

export default ProtectedRoute;