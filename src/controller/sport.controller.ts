import { Sport, SportModel } from "../database/model/sport.model";

export class SportController{
    public async create(sport: Sport){
        await SportModel.build(sport).validate();
        await SportModel.create(sport);
    }
    public async read(id: number){
        let sport =(await SportModel.findByPk(id))?.get();
        return sport;
    }
    public async readAll(){
        let sports = (await SportModel.findAll()).map(table=>table.get());
        return sports;
    }
    public async readMany(count: number){
        let sports = (await SportModel.findAll({limit: count})).map(table=>table.get());
        return sports;
    }
    public async update(id: number, sport: Sport){
        await SportModel.build(sport).validate();
        await SportModel.update(sport, {where: {id: id}}); 
    }
    public async delete(id: number){
        await SportModel.destroy({where: {id: id}});
    }
}