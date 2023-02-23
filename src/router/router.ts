import {Router} from "express";
import {homeRouter} from "./home-router";
import {categoryRouter} from "./category-router";
import songController from "../controller/HomeController";
// import {albumRouter} from "./album-router";
import {userRouter} from "./user-router";
import {adminRouter} from "./admin-router";
import {orderRouter} from "./order-router";
import {orderDetailRouter} from "./orderDetail-router";
export  const router = Router()
router.use('/homes',homeRouter);
router.use('/orders',orderRouter);
router.use('/orderDetails',orderDetailRouter);
router.use('/users',userRouter);
router.use('/admins',adminRouter);
// router.use('/albums',albumRouter);
router.use('/categories',categoryRouter);
// router.get('/find-by-name', songController.searchNameSong);
