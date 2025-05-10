import { Router } from "express";
import Validate from "../middlewares/Validate.js";
import authMiddleware from "../middlewares/auth_middleware.js";
import AuthControllers from "../controllers/auth_controllers.js";

const Auth_router = Router();

Auth_router.post('/login', Validate.authValidate, AuthControllers.Login);
Auth_router.post('/register', Validate.authValidate, AuthControllers.Register);
Auth_router.post('/logout', AuthControllers.Logout);
Auth_router.post('/processNewToken', authMiddleware.AuthRefreshToken, AuthControllers.processNewToken);

export default Auth_router;