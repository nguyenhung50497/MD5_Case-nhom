import {Router} from "express";
import homeController from "../controller/HomeController";
import {auth} from "../middleware/auth";
import {userAuth} from "../middleware/user";
export const homeRouter = Router()
homeRouter.get('',homeController.getAllHome);
// homeRouter.get('/find-home-by-name',homeController.findHome);
homeRouter.use(auth)
homeRouter.get('/users',homeController.getAllHome);
// homeRouter.get('/find-by-name',homeController.findHomeByName);
homeRouter.get('/my-homes',homeController.getMyHome)
homeRouter.post('', userAuth,homeController.createHome)
homeRouter.put('/:idHome', userAuth,homeController.editHome)
homeRouter.delete('/:idHome', homeController.removeHome)
// homeRouter.get('/:idhome',homeController.findByIdhome)
homeRouter.get('/rent-home/:idHome',homeController.countHome)
homeRouter.get('/my-home/:idUser',homeController.findHomeByIdUser)