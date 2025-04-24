import { Router } from "express";
import userValidate from "../middlewares/Validate.js";
import userControllers from "../controllers/user_controllers.js";

const router = Router();

router.get('/', userControllers.getAllUser);
router.get('/:id', userControllers.getUserByID);
router.post('/add', userValidate, userControllers.addUser);
router.put('/edit/:id', userValidate, userControllers.putUser);
router.delete('/delete/:id', userControllers.deleteUser);

export default router;  