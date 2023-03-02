import orderDetailService from "../service/OrderDetailService";
import userService from "../service/UserService";
import {Request, Response} from "express";
import orderService from "../service/OrderService";
import homeService from "../service/HomeService";

class OrderDetailController {
    private orderDetailService;
    private homeService;
    private userService;
    private orderService;
    constructor() {
        this.orderDetailService = orderDetailService;
        this.userService = userService;
        this.orderService = orderService;
        this.homeService = homeService;
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
            let orderDetails = await orderDetailService.getOrderDetail(req.params.idUser);
            res.status(200).json(orderDetails)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    getOrderDetailById = async (req: Request, res: Response)=>{
        try {
            let orderDetails = await orderDetailService.getOrderDetailById(req.params.id);
            res.status(200).json(orderDetails[0])
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    createOrderDetail = async (req: Request, res: Response) => {
        try {
            let time = new Date().toLocaleDateString();
            let checkTime = time.split('/');
            let checkIn = req.body.checkIn.split('-');
            let checkOut = req.body.checkOut.split('-');
            if (+checkTime[2] > +checkIn[0]) {
                 res.status(200).json('Wrong Check In')
            } else if (+checkTime[2] === +checkIn[0] && +checkTime[0] > +checkIn[1]) {
                res.status(200).json('Wrong Check In')
            } else if (+checkTime[2] === +checkIn[0] && +checkTime[0] === +checkIn[1] && +checkTime[1] > +checkIn[2]) {
                res.status(200).json('Wrong Check In')
            } else {
                if (+checkIn[0] > +checkOut[0]) {
                    res.status(200).json('Wrong Check Out')
                } else if(+checkIn[0] === +checkOut[0] && +checkIn[1] > +checkOut[1]) {
                    res.status(200).json('Wrong Check Out')
                } else if(+checkIn[0] === +checkOut[0] && +checkIn[1] === +checkOut[1] && +checkIn[2] >= +checkOut[2]) {
                    res.status(200).json('Wrong Check Out')
                } else {
                    let orderDetail = await orderDetailService.save(req.body);
                    let home = await homeService.changeStatusHome(req.body.idHome);
                    res.status(200).json(orderDetail)
                }
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    editOrderDetail = async (req: Request, res: Response) => {
        try {
            let idOrderDetail = +req.params.id;
            let newOrderDetail = req.body;
            let idUser = req["decoded"].idUser;
            let check = await this.orderDetailService.checkUser(idUser, idOrderDetail);
            if(check) {
                let order = await this.orderDetailService.updateOrderDetail(idOrderDetail,newOrderDetail);
                res.status(200).json(order)
            }
            else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    cancelOrderDetail = async (req: Request, res: Response)=> {
        try {
            let orderDetails = await orderDetailService.getOrderDetailById(req.params.id);
            let checkIn = orderDetails[0].checkIn.split('-');
            let checkOut = orderDetails[0].checkOut.split('-');
            if (+checkIn[0] === +checkOut[0] && +checkIn[1] === +checkOut[1] && ((+checkOut[2] - +checkIn[2]) === 1)) {
                res.status(200).json(`Wrong`);
            } else {
                await orderDetailService.cancelOrderDetail(req.params.id);
                res.status(200).json(`Success`)
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    checkOut = async (req: Request, res: Response)=> {
        try {
            let orderDetails = await orderDetailService.getOrderDetailById(req.params.id);
            let checkIn = orderDetails[0].checkIn.split('-');
            let checkOut = orderDetails[0].checkOut.split('-');
            if (+checkIn[0] === +checkOut[0] && +checkIn[1] === +checkOut[1]) {
                let invoice = orderDetails[0].price * (+checkOut[2] - +checkIn[2])
                res.status(200).json(invoice)
            } else if (+checkIn[0] === +checkOut[0] && +checkOut[2] > +checkIn[2]) {
                let days = (+checkOut[1] - +checkIn[1])*30 + (+checkOut[2] - +checkIn[2]);
                let invoice = orderDetails[0].price * days;
                res.status(200).json(invoice)
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}
export default new OrderDetailController()
