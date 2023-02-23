import {Router} from "express";
import orderController from "../controller/OrderController";
import {auth} from "../middleware/auth";
import {userAuth} from "../middleware/user";

export const orderRouter = Router();
orderRouter.use(auth);
orderRouter.get('',orderController.getAll);
orderRouter.post('/', userAuth,orderController.createOrder);
orderRouter.put('/:idOrder', userAuth,orderController.editOrder);
// orderRouter.get('/:idorder',orderController.findByIdorder);
orderRouter.get('/my-order/:idUser',orderController.showOrderByIdUser)