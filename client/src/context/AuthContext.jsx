import { createContext, useEffect, useState } from 'react';
import {
   forgotPasswordRequest,
   loginRequest,
   resetPasswordRequest,
   verifyTokenRequest,
} from '../api/authRequest';
import { ToastMessage, ToastDelete } from '../alerts/alerts';
import Cookies from 'js-cookie';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [users, setUsers] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [errors, setErrors] = useState([]);
   const [loading, setLoading] = useState(true);

   const login = async (user) => {
      try {
         const response = await loginRequest({
            cedula: +user.cedula,
            password: user.password,
         });

         setUsers(response.data);
         setIsAuthenticated(true);
      } catch (error) {
         if (Array.isArray(error.response.data)) {
            return setErrors(error.response.data);
         }
         setErrors([error.response.data.message]);
      }
   };
   const logout = () => {
      Cookies.remove('token');
      setIsAuthenticated(false);
      setUsers(null);
   };
   const forgotPassword = async (email) => {
      try {
         const response = await forgotPasswordRequest(email);
         console.log(response);
         if (response.status === 200) {
            ToastMessage.fire({
               title: `${response.data.message}`,
               icon: 'success',
            });
         }
         return response;
      } catch (error) {
         console.log(error);
         if (Array.isArray(error.response.data)) {
            return setErrors(error.response.data);
         }
         setErrors([error.response.data.message]);
         ToastMessage.fire({
            title: `Error: ${error.response.data.message}`,
            icon: 'error',
         });
      }
   };
   const resetPassword = async (password, token) => {
      try {
         const response = await resetPasswordRequest(password, token);

         if (response.status === 200) {
            ToastMessage.fire({
               title: 'La contraseña ha sido actualizada correctamente',
               icon: 'success',
            });
         }
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
   useEffect(() => {
      if (errors.length > 0) {
         const timer = setTimeout(() => {
            setErrors([]);
         }, 5000);
         return () => clearTimeout(timer);
      }
   }, [errors]);

   useEffect(() => {
      const checkLogin = async () => {
         const cookies = Cookies.get();
         if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
         }

         try {
            const res = await verifyTokenRequest(cookies.token);

            if (!res.data) return setIsAuthenticated(false);
            setIsAuthenticated(true);
            setUsers(res.data);
            setLoading(false);
         } catch (error) {
            setIsAuthenticated(false);
            setLoading(false);
         }
      };
      checkLogin();
   }, []);
   return (
      <AuthContext.Provider
         value={{
            users,
            isAuthenticated,
            errors,
            loading,
            login,
            logout,
            forgotPassword,
            resetPassword,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
