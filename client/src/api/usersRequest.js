import axios from 'axios';
const PORT = 4000;
const usersRequest = axios.create({
   baseURL: `http://localhost:${PORT}/api/users`,
   withCredentials: true,
});

export const getAllUsersRequest = async () => usersRequest.get('/');
export const createUserRequest = async (data) =>
   usersRequest.post('/create', data);
export const getAllRolesRequest = async () => usersRequest.get('/roles');
export const deteleUserRequest = async (id) =>
   usersRequest.delete(`/delete/${id}`);
export const updateUserRequest = async (id, data) =>
   usersRequest.patch(`/update/${id}`, data);
