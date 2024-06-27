import { Age, AgeModel } from "../database/model/age.model";

export class AgeController{
    public async create(age: Age){
        await AgeModel.build(age).validate();
        await AgeModel.create(age);
    }
    public async read(id: number){
        let age =(await AgeModel.findByPk(id))?.get();
        return age;
    }
    public async readAll(){
        let ages = (await AgeModel.findAll()).map(table=>table.get());
        return ages;
    }
    public async readMany(count: number){
        let ages = (await AgeModel.findAll({limit: count})).map(table=>table.get());
        return ages;
    }
    public async update(id: number, age: Age){
        await AgeModel.build(age).validate();
        await AgeModel.update(age, {where: {id: id}}); 
    }
    public async delete(id: number){
        await AgeModel.destroy({where: {id: id}});
    }
}