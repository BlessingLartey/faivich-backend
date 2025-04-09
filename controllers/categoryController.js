// In categoryController.js
import { CategoryModel } from '../models/categoryModel.js';

export const addCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Check if category already exists
        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: `${name} already exists.` });
        }

        // Create new category
        const newCategory = await CategoryModel.create({ name });
        res.status(201).json(newCategory);
    } catch (err) {
        next(err);  // Pass the error to the next middleware (error handler)
    }
};
