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
            let orderDetails = await orderDetailService.getOrderDetail(req.params.idorderDetail);
            res.status(200).json(orderDetails)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    createOrderDetails = async (req: Request, res: Response) => {
        try {
            let orderDetails = await orderDetailService.save(req.body);
            if (orderDetails) {
                let countSongorder = await orderService.countHomeOrder(req.body.idorder);
            }
            res.status(200).json(orderDetails)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    removeHomeFromOrder = async (req: Request, res: Response)=> {
        try {
            let idorderDetail = req.params.id;
            let orderDetails = await orderDetailService.removeHomeOrder(idorderDetail);
                res.status(200).json(orderDetails)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }


}
export default new OrderDetailController()
