import { Router } from 'express';
import bookRouter from '../routes/book.routes.js';

const routers = Router();

routers.use('/books', bookRouter);

export default routers;
