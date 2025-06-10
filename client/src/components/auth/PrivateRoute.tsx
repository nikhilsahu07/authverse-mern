import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token');
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default PrivateRoute;
