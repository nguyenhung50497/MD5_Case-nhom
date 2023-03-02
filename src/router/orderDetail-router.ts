import {Router} from "express";
import orderDetailController from "../controller/OrderDetailController";
import {auth} from "../middleware/auth";

export const orderDetailRouter = Router()
orderDetailRouter.use(auth);
orderDetailRouter.get('/',orderDetailController.getAll);
orderDetailRouter.get('/my-order-detail/:idUser',orderDetailController.getOrderDetail);
orderDetailRouter.get('/order-detail/:id',orderDetailController.getOrderDetailById);
orderDetailRouter.post('/',orderDetailController.createOrderDetail)
orderDetailRouter.put('/edit/:id',orderDetailController.editOrderDetail)
orderDetailRouter.put('/cancel/:id',orderDetailController.cancelOrderDetail)
orderDetailRouter.put('/check-out/:id',orderDetailController.checkOut)

