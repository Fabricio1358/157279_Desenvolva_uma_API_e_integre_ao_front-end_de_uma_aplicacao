import { Router } from 'express';
import bookRouter from '../routes/bookRoutes.js';

const routers = Router();

routers.use('/books', bookRouter);

export default routers;
