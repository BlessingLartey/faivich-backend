import { ProductModel } from "../models/productModel.js";
import { CategoryModel } from "../models/categoryModel.js"; 
import { addProductValidator, updateProductValidator } from "../validators/product.js";

// Add a new product
export const addProduct = async (req, res, next) => {
    try {
        const { error, value } = addProductValidator.validate({
            ...req.body,
            pictures: req.files?.map(file => file.filename)
        });

        if (error) {
            return res.status(422).json({ message: "Validation failed", details: error.details });
        }

        const { categoryName, ...productData } = value;

        // Corrected: use destructured categoryName
        const category = await CategoryModel.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).json({ message: "Invalid category name" });
        }

        const newProduct = await ProductModel.create({
            ...productData,
            category: category._id,
            userId: req.auth.id
        });

        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};




// Get all products with category information
export const getProducts = async (req, res, next) => {
    try {
        // Destructure filter and sort from the query parameters
        const { filter, sort } = req.query;

    // Parse the filter and sort options (if not provided, defaults to an empty object)
    let query = filter ? JSON.parse(filter) : {};  // Default to an empty object if no filter is provided
    let sortOptions = sort ? JSON.parse(sort) : {};  // Default to an empty object if no sort is provided

        // Handle category filter by name or ID (either works)
        if (query.categoryName) {
            // If the category name is passed, find the category by name and filter products by category ID
            const category = await CategoryModel.findOne({ name: query.categoryName });

            if (!category) {
                return res.status(400).json({ message: 'Category not found' });
            }

            // Update the query to filter products by category ID
            query.category = category.name;
            delete query.categoryName;  // Remove categoryName from query to avoid conflicts
        }

        // Fetch products from the database with filtering, population, and sorting
        const products = await ProductModel
            .find(query)
            .populate('category')  // Populate the category field to show category details
            .sort(sortOptions);    // Apply sorting based on query parameter

        // Return the fetched products
        res.json(products);
    } catch (error) {
        // Pass any error to the error handler
        next(error);
    }
};

export const getProduct = async(req, res, next) => {
    const product = await ProductModel.findById(req.params.id)
    res.status(200).json({"single product": product})
}


// Update a product by ID
export const updateProduct = async (req, res, next) => {
    try {
        const {error, value} = updateProductValidator.validate({
            ...req.body,
            pictures: req.file?.map(file => file.filename) || req.body.pictures
        });

        if (error) {
            return res.status(422).json({ message: "validator failed", details: error.details });
        }

        const productId = req.params.id;
        const { categoryName, category, ...updateData } = value;


        // Check if product exists
        const existingProduct = await ProductModel.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Validate if the category exists
        if (categoryName) {
            const categoryDoc = await CategoryModel.findOne({name: categoryName});
            if (!categoryDoc) {
                return res.status(400).json({ message: "Invalid category name" });
            }
            updateData.category = categoryDoc._id;
        } else if (category) {
            const categoryDoc = await CategoryModel.findById(category);
            if (!categoryDoc) {
                return res.status(400).json({ message: "Invalid category ID" });
            }
            updateData.category = category;
        }

        // Only proceed if there's something to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        // Find the product and update it with the new data
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            updateData,
            {
                new: true,
                runValidators: true
            }).populate('category');

        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);  // Pass the error to the next error handler
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        
        // Find and delete the product
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);  // Pass the error to the next error handler
    }
};
