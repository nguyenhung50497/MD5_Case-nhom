import orderDetailService from "../service/OrderDetailService";
import userService from "../service/UserService";
import {Request, Response} from "express";
import orderService from "../service/OrderService";

class OrderDetailController {
    private orderDetailService;
    private userService;
    private orderService;
    constructor() {
        this.orderDetailService = orderDetailService;
        this.userService = userService;
        this.orderService = orderService;
    }
    getAll = async (req: Request, res: Response)=>{
        try {
            let orderDetails = await orderDetailService.getAllOrderDetail();
            res.status(200).json(orderDetails)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    getOrderDetail = async (req: Request, res: Response)=>{
        try {
            let orderDetails = await orderDetailService.getOrderDetail(req.params.id);
            res.status(200).json(orderDetails)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    createOrderDetail = async (req: Request, res: Response) => {
        try {
            let orderDetail = await orderDetailService.save(req.body);
            res.status(200).json(orderDetail)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    editOrderDetail = async (req: Request, res: Response) => {
        try {
            let idOrder = +req.params.id;
            let newOrderDetail = req.body;
            let idUser = req["decoded"].idUser;
            let check = await this.orderService.checkUser(idUser, idOrder);
            if(check) {
                let order = await this.orderDetailService.updateOrderDetail(idOrder,newOrderDetail);
                res.status(200).json(order)
            }
            else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    deleteOrderDetail = async (req: Request, res: Response)=> {
        try {
            let idOrderDetail = req.params.id;
            let orderDetails = await orderDetailService.deleteOrderDetail(idOrderDetail);
                res.status(200).json(orderDetails)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }


}
export default new OrderDetailController()
