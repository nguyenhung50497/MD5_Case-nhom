import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import orderService from "../service/OrderService";
import userService from "../service/UserService";
class OrderController{
    private orderService;
    private userService;
    constructor() {
        this.orderService = orderService
        this.userService = userService;
    }
    getAll = async (req: Request, res: Response) => {
        try {
            let orders = await orderService.getMyOrder(req["decoded"].idUser);
            res.status(200).json(orders)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    createOrder = async (req: Request, res: Response) => {
        try {
            let orders = await orderService.save(req.body);
            res.status(200).json(orders)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    // findByIdorder = async (req: Request, res: Response) => {
    //     try {
    //         let idorder = req.params.idAlbum
    //         let orders = await orderService.findById(idorder);
    //         res.status(200).jsonp(orders)
    //     } catch (e) {
    //         res.status(500).json(e.message)
    //     }
    // }
    editOrder = async (req: Request, res: Response)=> {
        try {
            let idOrder = req.params.idOrder;
            let neworder = req.body;
            let idUser = req["decoded"].idUser;
            let check = await this.orderService.checkUser(idUser, idOrder);
            if(check) {
                let orders = await this.orderService.updateorder(idOrder,neworder);
                res.status(200).json(orders)
            }
            else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
     }
     showOrderByIdUser = async (req: Request, res: Response)=> {
         try {
             let orders = await this.orderService.findorderByIdUser(req.params.idUser)
             return res.status(200).json(orders)
         } catch (err) {
             res.status(500).json(err.message)
         }
     }

}
export default new OrderController();