import { useForm } from 'react-hook-form';
import { useProducts } from '../hooks/products';
const AddProductPage = () => {
   const { createProduct, ubicaciones } = useProducts();
   console.log(ubicaciones.ubicaciones);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const onSubmit = (data) => {
      createProduct(data);
      console.log(data);
   };
   return (
      <div className="flex items-center  justify-center min-h-screen ">
         <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow ">
            <div className="self-center  text-2xl  font-bold text-gray-800  ">
               Agregar producto al inventario
            </div>

            <div className="p-6 mt-8">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col mb-2">
                     <span className=" ">Producto</span>
                     <div className=" relative ">
                        <input
                           {...register('producto', {
                              required: {
                                 value: true,
                                 message: 'Este campo es requerido',
                              },
                              minLength: {
                                 value: 2,
                                 message: 'Minimo 2 caracteres',
                              },
                           })}
                           type="text"
                           className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent"
                           placeholder="Producto..."
                        />
                     </div>
                     {errors.producto && (
                        <small className="text-red-500 py-2">
                           {errors.producto?.message}
                        </small>
                     )}
                  </div>
                  <div className="flex gap-4 mb-2">
                     <div className=" relative ">
                        <span className="py-2">Serial</span>
                        <input
                           {...register('serial', {
                              required: {
                                 value: true,
                                 message: 'Este campo es requerido',
                              },
                              minLength: {
                                 value: 5,
                                 message: 'Minimo 5 caracteres',
                              },
                           })}
                           type="text"
                           className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:border-transparent"
                           placeholder="Serial..."
                        />
                        {errors.serial && (
                           <small className="text-red-500 py-2">
                              {errors.serial?.message}
                           </small>
                        )}
                     </div>
                     <div className=" relative ">
                        <span className="py-2">Ubicación</span>
                        <select
                           {...register('id_ubicacion')}
                           className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:border-transparent"
                        >
                           {ubicaciones.ubicaciones.map(
                              ({ id_ubicacion, ubicacion }) => (
                                 <option
                                    key={id_ubicacion}
                                    value={id_ubicacion}
                                 >
                                    {ubicacion}
                                 </option>
                              )
                           )}
                        </select>
                        {errors.ubicacion && (
                           <small className="text-red-500 py-2">
                              {errors.ubicacion?.message}
                           </small>
                        )}
                     </div>
                  </div>
                  <div className="flex flex-col mb-2">
                     <span>Descripción</span>
                     <div className=" relative ">
                        <textarea
                           {...register('descripcion', {
                              required: {
                                 value: true,
                                 message: 'Este campo es requerido',
                              },
                              minLength: {
                                 value: 5,
                                 message: 'Minimo 5 caracteres',
                              },
                           })}
                           className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent"
                        ></textarea>
                        {errors.descripcion && (
                           <small className="text-red-500 py-2">
                              {errors.descripcion?.message}
                           </small>
                        )}
                     </div>
                  </div>
                  <div className="flex w-full my-4">
                     <button
                        type="submit"
                        className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                     >
                        Agregar
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default AddProductPage;
