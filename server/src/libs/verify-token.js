import { SECRET_KEY } from '../config.js';
import jwt from 'jsonwebtoken';
export const verifyToken = (token) => {
   return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
         if (err) return reject(err);
         resolve(decoded);
      });
   });
};
