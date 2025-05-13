import {Router} from "express";
import {registerUser, loginUser, updateUser, getAuthenticatedUser } from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { profilePicturesUpload } from "../middlewares/upload.js";

// create user router
const userRouter = Router();

//Define routes
userRouter.post('/users/register', registerUser);
userRouter.post('/users/login', loginUser);
userRouter.patch('/users/:id', profilePicturesUpload.array('pictures', 1), updateUser);
userRouter.get('/users/me', isAuthenticated, getAuthenticatedUser)


//Export router
export default userRouter;