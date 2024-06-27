import { Place, PlaceModel } from "../database/model/place.model";

export class PlaceController{
    public async create(place: Place){
        await PlaceModel.build(place).validate();
        await PlaceModel.create(place);
    }
    public async read(id: number){
        let place =(await PlaceModel.findByPk(id))?.get();
        return place;
    }
    public async readAll(){
        let places = (await PlaceModel.findAll()).map(table=>table.get());
        return places;
    }
    public async readMany(count: number){
        let places = (await PlaceModel.findAll({limit: count})).map(table=>table.get());
        return places;
    }
    public async update(id: number, place: Place){
        await PlaceModel.build(place).validate();
        await PlaceModel.update(place, {where: {id: id}}); 
    }
    public async delete(id: number){
        await PlaceModel.destroy({where: {id: id}});
    }
}