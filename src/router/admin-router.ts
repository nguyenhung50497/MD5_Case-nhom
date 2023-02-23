import {Router} from "express";

import UserController from "../controller/UserController";
import userController from "../controller/UserController";
import {adminAuth} from "../middleware/admin";
import {auth} from "../middleware/auth";

export const adminRouter = Router();
adminRouter.use(auth);
adminRouter.get('', adminAuth, userController.getAllUser)

adminRouter.delete('/:idUser', adminAuth, UserController.removeUser)