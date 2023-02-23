import {AppDataSource} from "../data-source";
import {OrderDetail} from "../model/orderDetail";

class OrderDetailService{
    private orderDetailRepository;
    constructor() {
        this.orderDetailRepository = AppDataSource.getRepository(OrderDetail)
    }
    getAllOrderDetail = async () => {
        let sql = `select *
                   from home
                            join category c on 	home.idCategory = c.idCategory 
                            join order_detail od on home.idHome = od.idHome
                            join order o on od.idOrder = o.idOrder;`
        let orderDetails = await this.orderDetailRepository.query(sql);
        return orderDetails
    }

    getOrderDetail = async (idOrder) => {
        let sql = `select * from home
                            join category c on 	home.idCategory = c.idCategory 
                            join order_detail od on home.idHome = od.idHome
                            join order o on od.idOrder = o.idOrder
                            join user u on o.idUser = u.idUser where o.idOrder = ${idOrder};`
        let orderDetails = await this.orderDetailRepository.query(sql);
        return orderDetails
    }
    
    save = async (orderDetail)=> {
        let orderDetails = await this.orderDetailRepository.findOneBy({idHome: orderDetail.idHome});
        if (!orderDetails) {
            await this.orderDetailRepository.save(orderDetail);
            return true;
        }
        return false;
    }
    removeHomeOrder = async (idOrderDetail) => {
        let orderDetails = await this.orderDetailRepository.findOneBy({idOrderDetail: idOrderDetail});
        if (!orderDetails) {
            return null
        }
        return this.orderDetailRepository.delete({idOrderDetail: idOrderDetail});
    }

}
export default new OrderDetailService();