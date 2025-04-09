import { Schema, model } from "mongoose";

// Define Category schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,  // Ensure that each category name is unique
        enum: ["Cleaning Agents", "Skincare Products", "Healthcare Products"]  // Limit the categories to these three values
    }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create Category model
export const CategoryModel = model('Category', categorySchema);
