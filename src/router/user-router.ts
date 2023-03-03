import {Router} from "express";

import UserController from "../controller/UserController";
import {userAuth} from "../middleware/user";
import {auth} from "../middleware/auth";

export const userRouter = Router();
userRouter.post('/register',UserController.register)
userRouter.post('/login',UserController.login)
userRouter.use(auth)
userRouter.get('/my-profile/:idUser', userAuth, UserController.showMyProfile);
userRouter.post('/check-old-password/:idUser', userAuth, UserController.checkOldPassword);
userRouter.post('/check-new-password/:idUser', userAuth, UserController.checkNewPassword);
userRouter.put('/change-password/:idUser', userAuth, UserController.changePassword);
userRouter.put('/:idUser', userAuth, UserController.editUser);