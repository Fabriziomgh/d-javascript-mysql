import { config } from 'dotenv';

config();

export const SECRET_KEY = process.env.SECRET_KEY;
export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;

export const NODEMAILER_SERVICE = process.env.NODEMAILER_SERVICE;
export const NODEMAILER_USER = process.env.NODEMAILER_USER;
export const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;

export const API_URL = process.env.API_URL;
