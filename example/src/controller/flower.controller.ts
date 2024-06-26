import { Model } from "sequelize";
import { Flower, FlowerTable } from "../model/flower.model";

export class FlowerController{
    public async create(flower: Flower){
        await FlowerTable.build(flower).validate();
        await FlowerTable.create(flower);
    }
    public async read(id: number){
        let flower = (await FlowerTable.findOne({where: {id: id}}))?.get();
        return flower;
    }
    public async readAll(){
        let flowers = (await FlowerTable.findAll())?.map(model=>model.get());
        return flowers;
    }
    public async update(id: number, flower: Flower){
        await FlowerTable.build(flower).validate();
        await FlowerTable.update(flower, {where: {id: id}});
    }
    public async delete(id: number){
        await FlowerTable.destroy({where: {id: id}});
    }
}