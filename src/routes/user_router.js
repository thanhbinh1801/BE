import { Router } from "express";
import userValidate from "../middlewares/Validate.js";
import userControllers from "../controllers/user_controllers.js";
const router = Router();

router.get('/users', userControllers.getAllUser);
router.get('/users/:id', userControllers.getUserByID);
router.post('/users', userValidate, userControllers.addUser);
router.put('/users/:id', userValidate, userControllers.putUser);
router.delete('/users/:id', userControllers.deleteUser);

export default router;