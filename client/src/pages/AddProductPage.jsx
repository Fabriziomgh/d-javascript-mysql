import { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useProducts } from '../hooks/products';
import { useEffect } from 'react';
const AddProductPage = () => {
   const {
      products,
      createProduct,
      ubicaciones,
      getAllResources,
      updateProduct,
      getAllProducts,
      getProduct,
   } = useProducts();
   const navigate = useNavigate();
   const params = useParams();
   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      reset,
   } = useForm();
   useEffect(() => {
      async function get() {
         try {
            if (!params.id) return;
            const { product } = await getProduct(params.id);
            const { producto, cantidad, descripcion, serial, id_ubicacion } =
               product[0];
            setValue('producto', producto);
            setValue('cantidad', cantidad);
            setValue('descripcion', descripcion);
            setValue('serial', serial);
            setValue('id_ubicacion', id_ubicacion);
         } catch (error) {
            console.log(error);
         }
      }
      get();
   }, []);
   const onSubmit = async (data) => {
      if (params.id) {
         const update = await updateProduct(params.id, data);
         console.log(update);
         navigate('/inventario');
      } else {
         const response = await createProduct(data);
         if (response.status === 201) {
            reset();
         }
      }
   };
   useEffect(() => {
      getAllResources();
      getAllProducts();
   }, []);

   return (
      <div className="flex items-center  justify-center min-h-screen ">
         <Toaster />
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
                           className=" rounded-lg flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent"
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
                              pattern: {
                                 value: /^[0-9]+$/,
                                 message: 'Solo se aceptan valores numericos',
                              },
                              minLength: {
                                 value: 5,
                                 message: 'Minimo 5 caracteres',
                              },
                              validate: {
                                 checkSerial: (value) => {
                                    if (params.id) return true;
                                    return products?.products?.some(
                                       (product) => product.serial === value
                                    )
                                       ? 'Este serial ya existe'
                                       : true;
                                 },
                              },
                           })}
                           type="text"
                           className=" rounded-lg  flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:"
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
                           className=" rounded-lg  flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:"
                        >
                           {ubicaciones?.ubicaciones?.length === 0 ? (
                              <div>Cargando</div>
                           ) : (
                              ubicaciones?.ubicaciones?.map(
                                 ({ id_ubicacion, ubicacion }) => (
                                    <option
                                       key={id_ubicacion}
                                       value={id_ubicacion}
                                    >
                                       {ubicacion}
                                    </option>
                                 )
                              )
                           )}
                        </select>
                        {errors.ubicacion && (
                           <small className="text-red-500 py-2">
                              {errors.ubicacion?.message}
                           </small>
                        )}
                     </div>
                     <div className=" relative ">
                        <span className="py-2">Cantidad</span>
                        <input
                           {...register('cantidad', {
                              required: {
                                 value: true,
                                 message: 'Este campo es requerido',
                              },
                              validate: {
                                 checkQuantity: (value) => {
                                    return value > 0
                                       ? true
                                       : 'La cantidad debe un número positivo';
                                 },
                              },
                           })}
                           type="number"
                           className=" rounded-lg  flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:"
                        />
                        {errors.cantidad && (
                           <small className="text-red-500 py-2">
                              {errors.cantidad?.message}
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
                           className=" rounded-lg  flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:"
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
