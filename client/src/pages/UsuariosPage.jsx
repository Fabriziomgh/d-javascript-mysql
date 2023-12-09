import logoAlcaldia from '../assets/logo_alcaldia_2-removebg-preview.png';
import { useForm } from 'react-hook-form';
import { useUsers } from '../hooks/useUsers';
import { useEffect } from 'react';
import {
   EmailIcon,
   UserIcon,
   LockIcon,
   OfficeIcon,
   EditIcon,
   DeleteIcon,
} from '../components/Icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Footer from '../components/Footer';
const UsuariosPage = () => {
   const {
      getUsers,
      users,
      roles,
      getRoles,
      createUser,
      deleteUser,
      updateUser,
   } = useUsers();
   let ifUpdate = undefined;
   console.log(users);
   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
   } = useForm();
   const rol = roles.map(({ id_rol, rol }) => ({ id: id_rol, text: rol }));
   const onSubmit = async (data) => {
      if (ifUpdate) {
         const response = await updateUser(ifUpdate, data);
         if (response.status === 204) {
            reset();
            ifUpdate = undefined;
         }
      } else {
         const response = await createUser(data);
         if (response.status === 201) {
            reset();
         }
      }
   };

   const update = async (id) => {
      const user = users.find((user) => user.user_id === id);
      const rol = roles.find((rol) => rol.rol === user.rol);

      if (user) {
         setValue('username', user?.username);
         setValue('cedula', user?.cedula);
         setValue('email', user?.email);
         setValue('password', user?.password);
         setValue('id_rol', rol?.id_rol);
         ifUpdate = user?.user_id;
         console.log(ifUpdate);
      }
   };
   useEffect(() => {
      getUsers();
      getRoles();
   }, []);

   return (
      <section className="h-screen relative">
         <div className="  px-2 py-4 ">
            <div className="flex items-center  gap-2 py-4 px-10 ">
               <div className="w-full">
                  <h1 class=" flex items-center justify-between gap-2 text-4xl font-extrabold text-gray-900">
                     <span class="text-transparent bg-clip-text bg-gradient-to-r to-red-800 from-red-600">
                        Usuarios
                     </span>
                     <img
                        src={logoAlcaldia}
                        alt="Logo INEA"
                        className="h-20 w-52 object-cover"
                     />
                  </h1>
                  <p class="text-lg font-normal text-gray-500  ">
                     Bienvenido {`${users[0]?.username}`}, en esta seccion
                     podras administrar los usuarios del sistema.
                  </p>
               </div>
            </div>
            <div className="grid grid-cols-6 gap-x-4 gap-y-8 ">
               <div className="rounded-lg  bg-white  shadow-lg col-span-2">
                  <form
                     onSubmit={handleSubmit(onSubmit)}
                     className="flex w-full space-x-3"
                  >
                     <div className="w-full px-3 py-5  m-auto  bg-white rounded-lg  ">
                        <div className="mb-4 text-3xl font-light text-center text-gray-800 ">
                           Añadir nuevo usuario
                        </div>
                        <div className="grid max-w-sm grid-cols-1 gap-2 m-auto">
                           <Input
                              register={register('username', {
                                 required: {
                                    value: true,
                                    message: 'Este campo es requerido',
                                 },
                                 pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message:
                                       'El nombre de usuario solo puede contener letras',
                                 },
                              })}
                              name="username"
                              type="text"
                              placeholder="Nombre de Usuario..."
                              icon={<UserIcon />}
                              errors={errors}
                           />
                           <Input
                              register={register('email', {
                                 required: {
                                    value: true,
                                    message: 'Este campo es requerio',
                                 },
                                 pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Correo invalido',
                                 },
                              })}
                              name="email"
                              type="email"
                              placeholder="Correo..."
                              icon={<EmailIcon />}
                              errors={errors}
                           />
                           <Input
                              register={register('cedula', {
                                 required: {
                                    value: true,
                                    message: 'Este campo es requerido',
                                 },
                                 pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Cedula incorrecta',
                                 },
                                 validate: {
                                    checkCedula: (cedula) => {
                                       return (
                                          cedula > 0 ||
                                          'La cédula no puede ser un valor negativo'
                                       );
                                    },
                                    checkIsExist: (cedula) => {
                                       if (ifUpdate) return true;
                                       return users.some(
                                          (user) => user.cedula === +cedula
                                       )
                                          ? 'Esta cédula ya se encuentra registrada'
                                          : true;
                                    },
                                 },
                              })}
                              name="cedula"
                              errors={errors}
                              type="number"
                              placeholder="Cédula..."
                              icon={<UserIcon />}
                           />

                           <Input
                              register={register('password', {
                                 required: {
                                    value: `${ifUpdate ? false : true}`,
                                    message: 'Este campo es requerido',
                                 },
                                 minLength: {
                                    value: 6,
                                    message: 'Minimo 6 caracteres',
                                 },
                              })}
                              name="password"
                              errors={errors}
                              type="password"
                              placeholder="Clave..."
                              icon={<LockIcon />}
                           />

                           <div>
                              <Select
                                 register={register('id_rol', {
                                    required: {
                                       value: true,
                                       message: 'Este campo es requerido',
                                    },
                                 })}
                                 name="id_rol"
                                 errors={errors}
                                 icon={<OfficeIcon />}
                                 options={rol}
                              />
                           </div>

                           <div className=" text-right">
                              <Button text="Guardar" type="submit" />
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
               <div className="col-span-4 ">
                  <table className="table w-full text-sm p-2 bg-white rounded-lg shadow">
                     <thead className="bg-red-300 font-bold">
                        <tr>
                           <th className="border p-2  whitespace-nowrap text-gray-900">
                              Nombre de Usuario
                           </th>
                           <th className="border p-2  whitespace-nowrap text-gray-900">
                              Cédula
                           </th>
                           <th className="border p-2  whitespace-nowrap text-gray-900">
                              Correo
                           </th>

                           <th className="border p-2  whitespace-nowrap text-gray-900">
                              Permisos
                           </th>
                           <th className="border p-2  whitespace-nowrap font-normal text-gray-900">
                              Acciones
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {users.map((user) => (
                           <tr key={user.user_id} className="text-gray-700">
                              <td className="border p-2 ">{user?.username}</td>
                              <td className="border p-2 ">{user?.cedula}</td>
                              <td className="border p-2 ">{user?.email}</td>
                              <td className="border p-2 w-12 ">{user?.rol}</td>
                              <td className="border p-2 w-12 ">
                                 <div className="flex justify-evenly">
                                    <button
                                       onClick={() => update(user?.user_id)}
                                       className="text-blue-600 hover:scale-105"
                                    >
                                       <EditIcon />
                                    </button>
                                    <button
                                       onClick={() => deleteUser(user.user_id)}
                                       className="text-red-600 hover:scale-105"
                                    >
                                       <DeleteIcon />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <Footer />
      </section>
   );
};

export default UsuariosPage;
