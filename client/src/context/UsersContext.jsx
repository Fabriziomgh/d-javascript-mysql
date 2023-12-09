import { createContext } from 'react';
import { useState } from 'react';
import {
   createUserRequest,
   getAllRolesRequest,
   getAllUsersRequest,
   deteleUserRequest,
   updateUserRequest,
} from '../api/usersRequest';
import { useAuth } from '../hooks/auth';
import { ToastMessage, ToastDelete } from '../alerts/alerts';
export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
   const { users: user } = useAuth();
   const [users, setUsers] = useState([]);
   const [roles, setRoles] = useState([]);
   const [errors, setErrors] = useState([]);

   const getUsers = async () => {
      try {
         const response = await getAllUsersRequest();
         setUsers(response.data);
      } catch (error) {
         if (Array.isArray(error.response.data)) {
            return setErrors(error.response.data);
         }
         setErrors([error.response.data.message]);
      }
   };
   const getRoles = async () => {
      try {
         const response = await getAllRolesRequest();
         setRoles(response.data);
      } catch (error) {
         if (Array.isArray(error.response.data)) {
            return setErrors(error.response.data);
         }
         setErrors([error.response.data.message]);
      }
   };
   const createUser = async (data) => {
      const { cedula, id_rol } = data;
      try {
         const response = await createUserRequest({
            ...data,
            cedula: +cedula,
            id_rol: +id_rol,
         });

         if (response.status === 201) {
            setUsers((prevStatus) => prevStatus.concat(response.data));
            ToastMessage.fire({
               title: `Usuario agregado con exito`,
               icon: 'success',
            });
         }
         return response;
      } catch (error) {
         if (Array.isArray(error.response.data)) {
            return setErrors(error.response.data);
         }
         setErrors([error.response.data.message]);
         ToastMessage.fire({
            title: `ERROR: ${error.response.data.message}`,
            icon: 'error',
         });
      }
   };
   const updateUser = async (id, user) => {
      const { cedula, id_rol } = user;
      try {
         const response = await updateUserRequest(id, {
            ...user,
            cedula: +cedula,
            id_rol: +id_rol,
         });
         console.log(response);
         if (response.status === 204) {
            const rol = roles.find((rol) => rol.id_rol === +user.id_rol);

            setUsers((prevStatus) =>
               prevStatus.map((u) =>
                  u.user_id === id ? { ...user, rol: rol.rol, user_id: +id } : u
               )
            );
            ToastMessage.fire({
               title: 'Usuario Actualizado',
               icon: 'success',
            });
         }
         return response;
      } catch (error) {
         console.log(error);
         ToastMessage.fire({
            title: 'Error al intentar actualizar',
            icon: 'error',
         });
      }
   };
   const deleteUser = async (id) => {
      try {
         if (user.user_id === id)
            return ToastMessage.fire({
               title: 'Error',
               text: 'No puedes eliminar tu usuario',
               icon: 'error',
            });
         const confirmDelete = await ToastDelete.fire();
         if (!confirmDelete.isConfirmed) return;

         const response = await deteleUserRequest(id);
         if (response.status === 204) {
            setUsers((prevStatus) =>
               prevStatus.filter((user) => user.user_id !== id)
            );

            ToastMessage.fire({
               title: 'Usuario Eliminado',
               text: 'EL usuario ha sido eliminado correctamente',
               icon: 'success',
            });
         }
      } catch (error) {
         ToastMessage.fire({
            title: 'Error',
            text: 'Ocurrio un error al intentar eliminar este usuario',
            icon: 'error',
         });
      }
   };

   return (
      <UsersContext.Provider
         value={{
            users,
            roles,
            errors,
            getUsers,
            getRoles,
            createUser,
            deleteUser,
            updateUser,
         }}
      >
         {children}
      </UsersContext.Provider>
   );
};
