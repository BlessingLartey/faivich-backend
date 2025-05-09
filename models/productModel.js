import { Schema, Types, model } from "mongoose";
import normalize from 'normalize-mongoose';

// Define Product schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
   usage: {
    type: String,
    required: true
   },
    desDetail: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    pictures: [{
        type: String,
        required: true
    }],
    category: [{  // Reference to Category model (multiple categories allowed)
        type: Types.ObjectId,  // Reference to the Category model
        ref: "Category",  // Ensure it's referencing the correct model name
        required: true
    }]
}, { timestamps: true });

// Normalize schema (to normalize the Mongoose output)
productSchema.plugin(normalize);

// Create Product model
export const ProductModel = model('Product', productSchema);
