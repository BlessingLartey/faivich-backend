// In routes/categoryRoutes.js
import { Router } from 'express';
import { addCategory } from '../controllers/categoryController.js';

const categoryRouter = Router();

categoryRouter.post('/categories', addCategory);  // Route to add a category

export default categoryRouter;
