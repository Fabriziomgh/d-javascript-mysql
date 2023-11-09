import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
const AuthenticateLayout = () => {
   const isAuthenticate = useAuthStore((state) => state.isAuthenticate);
   // const loading = useAuthStore((state) => state.loading);
   // if (loading) return <h1>Loading...</h1>;
   if (!isAuthenticate) return <Navigate to="/" />;
   return (
      <div>
         <div>navbar</div>
         <div>{<Outlet />}</div>
      </div>
   );
};

export default AuthenticateLayout;
