import { useParams, useNavigate } from 'react-router-dom';
import logoAlcaldia from '../assets/logo_alcaldia_2-removebg-preview.png';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/auth';
import { EmailIcon, LockIcon } from '../components/Icons';
const ForgotPassword = () => {
   const {
      forgotPassword,
      resetPassword,
      errors: forgotPasswordErrors,
   } = useAuth();
   const params = useParams();
   const navigate = useNavigate();
   const token = params.token ? params.token.replaceAll('$', '.') : null;

   const {
      handleSubmit,
      register,
      reset,
      formState: { errors },
   } = useForm();
   const onSubmit = async (data) => {
      if (token) {
         resetPassword(data, token);
         navigate('/');
      } else {
         const response = await forgotPassword(data);
         if (response.status === 200) {
            reset();
         }
      }
   };
   return (
      <div className="flex items-center justify-center min-h-screen">
         <div className="flex flex-col w-full max-w-md px-2 py-6 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-6">
               <img src={logoAlcaldia} alt="Logo INEA" className="w-64" />
            </div>
            <h2 className="text-xl font-bold">
               {token ? 'Nueva Clave' : 'Recuperar Clave'}
            </h2>
            <div>
               {forgotPasswordErrors.map((error, i) => (
                  <small className="text-red-500" key={i}>
                     {error}
                  </small>
               ))}
            </div>
            <div className="mt-8">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col mb-2">
                     <div className="flex relative ">
                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                           {token ? <LockIcon /> : <EmailIcon />}
                        </span>
                        {token ? (
                           <input
                              {...register('password', {
                                 required: {
                                    value: true,
                                    message: 'Campo requerido',
                                 },
                              })}
                              type="password"
                              className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:border-transparent"
                              placeholder="Nueva clave..."
                           />
                        ) : (
                           <input
                              {...register('email', {
                                 required: {
                                    value: true,
                                    message: 'Campo requerido',
                                 },
                                 pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Correo incorrecto',
                                 },
                              })}
                              type="email"
                              className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:border-transparent"
                              placeholder="Correo..."
                           />
                        )}
                     </div>
                     {errors.email && (
                        <small className="text-red-500 py-2">
                           {errors.email?.message}
                        </small>
                     )}
                  </div>

                  <div className="flex w-full">
                     <button
                        type="submit"
                        className="py-2 px-4  bg-blue-600 hover:bg-blue-700  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                     >
                        {token ? 'Cambiar Clave' : 'Recuperar'}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default ForgotPassword;
