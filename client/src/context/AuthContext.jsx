import { createContext, useEffect, useState } from 'react';
import { loginRequest, verifyTokenRequest } from '../api/authRequest';
import Cookies from 'js-cookie';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [users, setUsers] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [errors, setErrors] = useState([]);
   const [loading, setLoading] = useState(true);

   const login = async (user) => {
      try {
         const response = await loginRequest(user);

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
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
