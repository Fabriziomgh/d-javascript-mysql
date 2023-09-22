import { SECRET_KEY } from '../config.js';
import jwt from 'jsonwebtoken';

export const createToken = (payload) => {
   return new Promise((resolve, reject) => {
      jwt.sign(
         payload,
         SECRET_KEY,
         {
            expiresIn: 86400,
         },
         (err, token) => {
            if (err) reject(err);
            resolve(token);
         }
      );
   });
};
