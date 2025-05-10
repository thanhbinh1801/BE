import { Router } from "express";
import Validate from "../middlewares/Validate.js";
import userControllers from "../controllers/user_controllers.js";
import authMiddleware from "../middlewares/auth_middleware.js";
import AuthControllers from "../controllers/auth_controllers.js";

const router = Router();

router.get('/', userControllers.getAllUser);
router.get('/:id', userControllers.getUserByID);
router.post('/', Validate.userValidate, userControllers.addUser);
router.put('/:id', Validate.userValidate, userControllers.putUser);
router.delete('/:id', userControllers.deleteUser);

router.post('/me', authMiddleware.AuthRefreshToken, AuthControllers.GetUserByToken);

export default router;  