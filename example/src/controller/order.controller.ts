import { Order } from "../model/order.model";
import { OrderTable } from "../model/order.model";

export class OrderController{
    public async create(order: Order){
        await OrderTable.build(order).validate();
        await OrderTable.create(order);
    }
    public async read(id: number){
        let order = (await OrderTable.findByPk(id))?.get();
        return order;
    }
    public async readAll(){
        return (await OrderTable.findAll()).map(table=>table.get());
    }
    public async update(id: number, order: Order){
        await OrderTable.build(order).validate();
        await OrderTable.update(order, {where: {id: id}});
    }
    public async delete(id: number){
        await OrderTable.destroy({where: {id: id}});
    }
}