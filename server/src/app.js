import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth-routes.js';
import productsRouter from './routes/product-routes.js';

const app = express();

app.use(morgan('dev'));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

export default app;
