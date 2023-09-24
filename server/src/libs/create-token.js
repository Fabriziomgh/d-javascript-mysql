import { SECRET_KEY } from '../config.js';
import jwt from 'jsonwebtoken';

export const createToken = (payload, expiresIn = 86400) => {
   return new Promise((resolve, reject) => {
      jwt.sign(
         payload,
         SECRET_KEY,
         {
            expiresIn,
         },
         (err, token) => {
            if (err) reject(err);
            resolve(token);
         }
      );
   });
};
