import { Outlet } from 'react-router-dom';
const AuthenticateLayout = () => {
   return (
      <div>
         <div>navbar</div>
         <div>{<Outlet />}</div>
      </div>
   );
};

export default AuthenticateLayout;
