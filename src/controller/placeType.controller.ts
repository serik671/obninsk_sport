import { PlaceType, PlaceTypeModel } from "../database/model/placeType.model";

export class PlaceTypeController{
    public async create(placeType: PlaceType){
        await PlaceTypeModel.build(placeType).validate();
        await PlaceTypeModel.create(placeType);
    }
    public async read(id: number){
        let placeType =(await PlaceTypeModel.findByPk(id))?.get();
        return placeType;
    }
    public async readMany(count: number){
        let placeTypes = (await PlaceTypeModel.findAll({limit: count})).map(table=>table.get());
        return placeTypes;
    }
    public async update(id: number, placeType: PlaceType){
        await PlaceTypeModel.build(placeType).validate();
        await PlaceTypeModel.update(placeType, {where: {id: id}}); 
    }
    public async delete(id: number){
        await PlaceTypeModel.destroy({where: {id: id}});
    }
}