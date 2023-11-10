import userLogo from '../assets/user.png';
import NavbarLinks from './NavbarLinks';
import { HomeIcon, LogoutIcon, StorageIcon } from './Icons';
import { useAuth } from '../hooks/auth';
const Navbar = () => {
   const { users, logout } = useAuth();

   return (
      <div className="relative bg-white h-full ">
         <div className="flex flex-col sm:flex-row sm:justify-around">
            <div className="h-screen w-72">
               <div className="flex items-center justify-start mx-6 mt-10">
                  <img className="h-10" src={userLogo} />
                  <span className="text-gray-600  ml-4 text-2xl font-bold">
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
                     <StorageIcon />
                  </NavbarLinks>
                  <NavbarLinks text="Ubicaciones" link="/ubicaciones">
                     <StorageIcon />
                  </NavbarLinks>
                  <NavbarLinks text="Usuarios" link="/usuarios">
                     <StorageIcon />
                  </NavbarLinks>
               </nav>
               <div className="absolute bottom-0 my-10">
                  <button
                     onClick={logout}
                     className="text-gray-600 hover:text-gray-800  transition-colors duration-200 flex items-center py-2 px-8"
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
