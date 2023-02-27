import {Router} from "express";
import orderDetailController from "../controller/OrderDetailController";
import {auth} from "../middleware/auth";

export const orderDetailRouter = Router()
orderDetailRouter.use(auth);
orderDetailRouter.get('/',orderDetailController.getAll);
orderDetailRouter.get('/my-order-detail/:idOrderDetail',orderDetailController.getOrderDetail);
orderDetailRouter.post('/',orderDetailController.createOrderDetail)
orderDetailRouter.put('/:id',orderDetailController.editOrderDetail)
orderDetailRouter.delete('/:id',orderDetailController.deleteOrderDetail)

