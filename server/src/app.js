import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth-routes.js';
import productsRouter from './routes/product-routes.js';
import ubicacionesRouter from './routes/ubicaciones-routes.js';

const app = express();

app.use(morgan('dev'));
app.use(
   cors({
      origin: 'http://localhost:5173',
      credentials: true,
   })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/ubicaciones', ubicacionesRouter);

export default app;
