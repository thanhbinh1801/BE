import { Router } from "express";
import Validate from "../middlewares/Validate.js";
import userControllers from "../controllers/user_controllers.js";

const router = Router();

// router.get('/', userControllers.getAllUser);
// router.post('/', Validate.userValidate, userControllers.addUser);
// outer.get('/:id', userControllers.getUserByID);
// router.put('/:id', Validate.userValidate, userControllers.putUser);
// router.delete('/:id', userControllers.deleteUser);

export default router;  