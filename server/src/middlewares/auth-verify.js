import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

export const authVerify = (req, res, next) => {
   const { token } = req.cookies;
   console.log(token);
   if (!token) return res.status(401).json({ message: 'No token provided' });

   jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      req.user = decoded;
      next();
   });
};
