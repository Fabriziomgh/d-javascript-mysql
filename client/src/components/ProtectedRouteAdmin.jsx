import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
const ProtectedRoute = () => {
   const { users: user } = useAuth();
   console.log(user);
   if (user.id_rol !== 1) return <Navigate to="/inicio" />;
   return <Outlet />;
};
export default ProtectedRoute;
