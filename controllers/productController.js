import { ProductModel } from "../models/productModel.js";
import { CategoryModel } from "../models/categoryModel.js"; 

// Add a new product
export const addProduct = async (req, res, next) => {
    try {
        const { name, price, description, quantity, pictures, categoryName } = req.body;

        // Ensure category is a valid ObjectId
        const category = await CategoryModel.findOne({ name: categoryName });
if (!category) {
    return res.status(400).json({ message: "Invalid category name" });
}

// Create new product and assign the category to it
const newProduct = new ProductModel({
    name,
    price,
    description,
    quantity,
    pictures,
    category: category._id  // Store category ID as a reference
});
await newProduct.save();
res.status(201).json(newProduct);  // Return the newly created product
} catch (err) {
next(err);  // Pass error to error handling middleware
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
            query.category = category._id;
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


// Update a product by ID
export const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const { name, price, description, quantity, pictures, category } = req.body;

        // Validate if the category exists
        if (category) {
            const categoryDoc = await CategoryModel.findById(category);
            if (!categoryDoc) {
                return res.status(400).json({ message: "Invalid category ID" });
            }
        }

        // Find the product and update it with the new data
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            {
                name,
                price,
                description,
                quantity,
                pictures,
                category,  // Only update the category if provided
            },
            { new: true }  // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

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
