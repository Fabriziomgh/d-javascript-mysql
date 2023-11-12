import userLogo from '../assets/user.png';
import NavbarLinks from './NavbarLinks';
import {
   AddIcon,
   HomeIcon,
   LogoutIcon,
   OfficeIcon,
   StorageIcon,
   UserIcon,
} from './Icons';
import { useAuth } from '../hooks/auth';
const Navbar = () => {
   const { users, logout } = useAuth();

   return (
      <div className="relative bg-gradient-to-b from-red-400 to-red-400 h-full shadow-lg rounded-tr rounded-br ">
         <div className="flex flex-col sm:flex-row sm:justify-around">
            <div className="h-screen w-72">
               <div className="flex items-center justify-start mx-6 mt-10">
                  <img
                     className="h-10 bg-gray-300 shadow-lg rounded-full"
                     src={userLogo}
                  />
                  <span className="capitalize  ml-4  text-2xl  text-gray-900 font-bold">
                     {users?.user ? users?.user : 'Usuario'}
                  </span>
               </div>
               <nav className="mt-10 px-6 ">
                  <NavbarLinks text="Inicio" link="/inicio">
                     <HomeIcon />
                  </NavbarLinks>
                  <NavbarLinks text="Inventario" link="/inventario">
                     <StorageIcon />
                  </NavbarLinks>
                  <NavbarLinks text="Agregar producto" link="/agregar-producto">
                     <AddIcon />
                  </NavbarLinks>
                  <NavbarLinks text="Ubicaciones" link="/ubicaciones">
                     <OfficeIcon />
                  </NavbarLinks>
                  <NavbarLinks text="Usuarios" link="/usuarios">
                     <UserIcon />
                  </NavbarLinks>
               </nav>
               <div className="absolute bottom-0 my-10">
                  <button
                     onClick={logout}
                     className="text-gray-800 hover:text-gray-900 hover:scale-105  transition-colors duration-200 flex items-center py-2 px-8"
                  >
                     <LogoutIcon />
                     <span className="mx-4 font-medium">Salir</span>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
