import { Router } from "express"; 
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const productRouter = Router();

productRouter.post(
    '/products',
    isAuthenticated,
    isAuthorized([ 'manager']),
     addProduct
);

productRouter.get(
    '/products', getProducts
);

productRouter.get(
    '/products/:id',
    getProduct);

productRouter.put(
    '/products/:id', 
    isAuthenticated,
    updateProduct
);

productRouter.delete(
    '/products/:id', 
    isAuthenticated,
    deleteProduct
);

export default productRouter;