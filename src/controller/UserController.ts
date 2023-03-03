import {Request, Response} from "express";
import UserService from "../service/UserService";
import OrderService from "../service/OrderService";

class UserController {
    private userServices;
    private orderServices;

    constructor() {
        this.userServices = UserService;
        this.orderServices = OrderService;
    }

    getAllUser = async (req: Request, res: Response) => {
        try {
            let response = await this.userServices.getAll();
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    showMyProfile = async (req: Request, res: Response) => {
        try {
            let response = await this.userServices.getMyProfile(req.params.idUser);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    checkOldPassword = async (req: Request, res: Response) => {
        try {
            let response = await this.userServices.checkOldPassword(req.params.idUser, req.body.password);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    checkNewPassword = async (req: Request, res: Response) => {
        try {
            let response = await this.userServices.checkNewPassword(req.params.idUser, req.body.password);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    changePassword = async (req: Request, res: Response) => {
        try {
            let checkOldPassword = await this.userServices.checkOldPassword(req.params.idUser, req.body.oldPassword)
            let checkNewPassword = await this.userServices.checkNewPassword(req.params.idUser, req.body.newPassword)
            if (checkOldPassword === "User not found") {
                res.status(200).json("User not found");
            } else if (!checkOldPassword) {
                res.status(200).json("Old password does not match");
            } else {
                if (checkNewPassword === "User not found") {
                    res.status(200).json("User not found");
                } else if (checkNewPassword) {
                    res.status(200).json("New password is match with old password");
                } else {
                    await this.userServices.changePassword(req.params.idUser, req.body.newPassword)
                    res.status(200).json("Success")
                }
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            let user = await this.userServices.register(req.body);
            let order = await this.orderServices.save({idUser: user.idUser})
            res.status(201).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    login = async (req: Request, res: Response) => {
        try {
            let response = await this.userServices.checkUser(req.body)
            if (response=== "User not found" || response=== "Wrong password") {
                res.status(200).json(response)
            }
            let order = await this.orderServices.findOrderByIdUser(response.idUser)
            res.status(200).json({...response, idOrder: order.idOrder})
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    editUser = async (req: Request, res: Response) => {
        try {
            let user = await this.userServices.edit(req.params.idUser, req.body);
            res.status(201).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    removeUser = async (req: Request, res: Response) => {
        try {
            let id = req.params.idUser;
            let user = await this.userServices.remove(id);
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    showSongCreate = async (req: Request, res: Response)=> {
        try {
        let id = req.params.idUser;
        let user = await this.userServices.showSong(id);
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e.message)
    }
    }
}


export default new UserController();