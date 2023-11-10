import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../hooks/auth';
import Spinner from './Spinner';
const AuthenticateLayout = () => {
   const { loading, isAuthenticated } = useAuth();
   if (loading) return <Spinner />;

   if (!loading && !isAuthenticated) return <Navigate to="/" />;
   return (
      <div className="flex ">
         <div>
            <Navbar />
         </div>
         <div className="w-full">{<Outlet />}</div>
      </div>
   );
};

export default AuthenticateLayout;
