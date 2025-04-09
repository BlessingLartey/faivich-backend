import { Router } from "express"; 
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";

const productRouter = Router();

productRouter.post(
    '/products', addProduct
);

productRouter.get(
    '/products', getProducts
);

productRouter.put(
    '/products/:id', updateProduct
);

productRouter.delete(
    '/products/:id', deleteProduct
);

export default productRouter;