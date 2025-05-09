import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/productsRoute.js";
import dotenv from "dotenv"; 
import categoryRouter from "./routes/categoryRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cors from 'cors'

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app. use(cors());

// Routes for products
app.use("/api", productRouter); // Prefix routes with '/api' to organize API endpoints
app.use('/api', categoryRouter);
app.use('/api', userRouter);
app.use('/api', orderRouter);



// Global middleware
app.use(express.json());

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URL)

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
