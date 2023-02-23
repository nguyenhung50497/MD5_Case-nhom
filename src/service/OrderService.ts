import {AppDataSource} from "../data-source";
import {Order} from "../model/order";

class OrderService{
    private orderRepository
    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order)
    }
    getAllOrder = async ()=> {
        let sql = `select * from order o join user u on o.idUser = u.idUser`;
        let orders = await this.orderRepository.query(sql);
        return orders;

    }
    getMyOrder = async (idUser)=> {
        let sql = `select * from order o join user u on o.idUser = u.idUser where u.idUser = ${idUser}`;
        let orders = await this.orderRepository.query(sql);
        return orders;

    }
    save = async (order)=> {
        return this.orderRepository.save(order);
    }
    findById = async (idOrder)=> {
        let orders = await this.orderRepository.findOneBy({idOrder :idOrder})
        return orders
    }
    updateOrder= async (idOrder, newOrder)=>{
        let orders = await this.orderRepository.findOneBy({idOrder: idOrder})
        if (!orders) {
            return null
        }
        return await this.orderRepository.update({idOrder: idOrder}, newOrder)
    }
    findOrderByIdUser = async (idUser) => {
        let sql = `select * from order o join user u on o.idUser = u.idUser where u.idUser  = ${idUser}`
        let orders = this.orderRepository.query(sql)
        return orders
    }
    checkUser = async (idUser, idOrder) => {
        let sql = `select * from order o join user u on o.idUser = u.idUser where idOrder = ${idOrder}`;
        let checkIdUser = await this.orderRepository.query(sql);
        if (checkIdUser[0].idUser === idUser) {
            return true;
        }
        return false;
    }

    countHomeOrder = async (idOrder) => {
        let order = await this.orderRepository.findOneBy({idOrder: idOrder})
        if (!order) {
            return null
        }
        order.countHomeOrder = order.countHomeOrder + 1;
        return await this.orderRepository.update({idOrder: idOrder}, order);
    }

}
export default new OrderService();