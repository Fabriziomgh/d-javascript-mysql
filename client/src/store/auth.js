import { create } from 'zustand';
import { loginRequest, verifyTokenRequest } from '../api/authRequest';
import cookies from 'js-cookie';
export const useAuthStore = create((set) => {
   return {
      user: null,
      isAuthenticate: false,
      errors: [],
      loading: false,

      login: async (user) => {
         try {
            const response = await loginRequest(user);
            set({
               user: response.data.user,
               isAuthenticate: true,
            });
         } catch (error) {
            if (Array.isArray(error.response.data)) {
               return set({ errors: error.response.data });
            }
            set({ errors: [error.response.data.message] });
         }
      },
      checkLogin: async () => {
         const cookie = cookies.get();
         console.log(cookie);
         if (!cookie.token) {
            set({ isAuthenticate: false });
            set({ loading: false });
            return;
         }
         try {
            const res = await verifyTokenRequest(cookie.token);
            console.log(res);
            if (!res.data) return set({ isAuthenticate: false });
            set({ isAuthenticate: true });
            set({ user: res.data });
            set({ loading: false });
         } catch (error) {
            set({ isAuthenticate: false });
            set({ loading: false });
         }
      },
   };
});
