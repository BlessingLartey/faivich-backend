import { Router } from "express"; 
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { productPicturesUpload } from "../middlewares/upload.js";

const productRouter = Router();

productRouter.post(
    '/products',
    isAuthenticated,
    isAuthorized([ 'manager']),
    productPicturesUpload.array('pictures', 6),
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
    productPicturesUpload.array('pictures', 6),
    updateProduct
);

productRouter.delete(
    '/products/:id', 
    isAuthenticated,
    deleteProduct
);

export default productRouter;