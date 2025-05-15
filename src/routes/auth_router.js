import { Router } from "express";
import Validate from "../middlewares/Validate.js";
import AuthControllers from "../controllers/auth_controllers.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import authMiddleware from "../middlewares/auth_middleware.js";

const Auth_router = Router();

Auth_router.post('/login', Validate.authValidate, asyncHandler(AuthControllers.Login));
Auth_router.post('/register', Validate.authValidate, asyncHandler(AuthControllers.Register));
Auth_router.post('/logout', asyncHandler(AuthControllers.Logout));
Auth_router.post('/processNewToken', asyncHandler(AuthControllers.processNewToken));
Auth_router.get('/me', authMiddleware.AuthRefreshToken, AuthControllers.getUserByToken);

export default Auth_router;