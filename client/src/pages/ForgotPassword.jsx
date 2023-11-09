import { EmailIcon } from '../components/Icons';
import logoAlcaldia from '../assets/logo_alcaldia_2-removebg-preview.png';

const ForgotPassword = () => {
   return (
      <div className="flex items-center  justify-center min-h-screen ">
         <div>
            <img src={logoAlcaldia} alt="Logo de la alcaldia de los Taques" />
         </div>
         <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
               Recuperar contraseña
            </div>
            <div className="mt-8">
               <form action="#" autoComplete="off">
                  <div className="flex flex-col mb-2">
                     <div className="flex relative ">
                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                           <EmailIcon />
                        </span>
                        <input
                           type="text"
                           className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:border-transparent"
                           placeholder="Correo..."
                        />
                     </div>
                  </div>

                  <div className="flex w-full">
                     <button
                        type="submit"
                        className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-300 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                     >
                        Recuperar
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default ForgotPassword;
