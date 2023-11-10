import axios from 'axios';
const PORT = 4000;
const authRequest = axios.create({
   baseURL: `
      http://localhost:${PORT}/api/auth`,
   withCredentials: true,
});

export const loginRequest = (data) => authRequest.post('/login', data);
export const verifyTokenRequest = () => authRequest.get(`/verify`);
export const logoutRequest = () => authRequest.post('/logout');
