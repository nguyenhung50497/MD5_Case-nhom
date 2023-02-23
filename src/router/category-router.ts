import {Router} from "express";
import homeController from "../controller/HomeController";

export const categoryRouter = Router()
categoryRouter.get('/',homeController.findCategory);