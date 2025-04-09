import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/productsRoute.js";
import dotenv from "dotenv"; 
import categoryRouter from "./routes/categoryRoute.js";
import userRouter from "./routes/userRoute.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes for products
app.use("/api", productRouter); // Prefix routes with '/api' to organize API endpoints
app.use('/api', categoryRouter);
app.use('/api', userRouter);



// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log error stack trace
    res.status(500).json({ message: "Something went wrong!" });  // Send a 500 error response
});

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URL)

// Start the server
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
