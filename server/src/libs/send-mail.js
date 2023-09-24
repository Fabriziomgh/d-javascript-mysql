import nodemailer from 'nodemailer';
import {
   NODEMAILER_PASSWORD,
   NODEMAILER_SERVICE,
   NODEMAILER_USER,
} from '../config.js';
export const sendMail = async (email, subject, text, fn) => {
   const transporter = nodemailer.createTransport({
      service: NODEMAILER_SERVICE,
      auth: {
         user: NODEMAILER_USER,
         pass: NODEMAILER_PASSWORD,
      },
   });

   const mailOptions = {
      from: NODEMAILER_USER,
      to: email,
      subject,
      text,
   };
   return transporter.sendMail(mailOptions, fn);
};
