import { LockIcon, UserIcon } from '../components/Icons';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logoAlcaldia from '../assets/logo_alcaldia_2-removebg-preview.png';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/auth';
import { useEffect } from 'react';
const LoginPage = () => {
   const login = useAuthStore((state) => state.login);
   const loginErrors = useAuthStore((state) => state.errors);
   const isAuthenticate = useAuthStore((state) => state.isAuthenticate);
   const checkLogin = useAuthStore((state) => state.checkLogin);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const onSubmit = (data) => {
      login(data);
      console.log(data);
   };
   const navigate = useNavigate();
   useEffect(() => {
      if (isAuthenticate) navigate('/inicio');
   }, [isAuthenticate]);
   useEffect(() => {
      checkLogin();
   }, []);
   return (
      <div className="flex items-center  justify-center min-h-screen ">
         <div>
            <img src={logoAlcaldia} alt="Logo de la alcaldia de los Taques" />
         </div>
         <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
               Acceder
            </div>
            <div>
               {loginErrors.map((err, i) => (
                  <p key={i} className="text-red-500">
                     {err}
                  </p>
               ))}
            </div>
            <div className="mt-8">
               <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <div className="flex flex-col mb-2">
                     <div className="flex relative ">
                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                           <UserIcon />
                        </span>
                        <input
                           {...register('username', {
                              required: {
                                 value: true,
                                 message: 'El usuario es requerido',
                              },
                              minLength: {
                                 value: 3,
                                 message:
                                    'El usuario debe tener al menos 3 caracteres',
                              },
                           })}
                           type="text"
                           className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:border-transparent"
                           placeholder="Usuario..."
                        />
                     </div>
                     {errors.username && (
                        <small className="text-red-500 py-2">
                           {errors.username?.message}
                        </small>
                     )}
                  </div>
                  <div className="flex flex-col mb-6">
                     <div className="flex relative ">
                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                           <LockIcon />
                        </span>
                        <input
                           {...register('password', {
                              required: {
                                 value: true,
                                 message: 'La contraseña es requerida',
                              },
                              minLength: {
                                 value: 3,
                                 message:
                                    'La contraseña debe tener al menos 3 caracteres',
                              },
                           })}
                           type="password"
                           className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:border-transparent"
                           placeholder="Contraseña..."
                        />
                     </div>
                     {errors.password && (
                        <small className="text-red-500 py-2">
                           {errors.password?.message}
                        </small>
                     )}
                  </div>
                  <div className="flex items-center mb-6 -mt-4">
                     <div className="flex ml-auto">
                        <Link
                           to="/recuperar-contraseña"
                           className="inline-flex text-xs font-thin text-gray-500 sm:text-sm  hover:text-gray-700 "
                        >
                           Olvidó su contraseña?
                        </Link>
                     </div>
                  </div>
                  <div className="flex w-full">
                     <button
                        type="submit"
                        className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-300 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                     >
                        Entrar
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
