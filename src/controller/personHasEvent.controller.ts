import { PersonHasEvent, PersonHasEventModel } from "../database/model/personHasEvent.model";

export class PersonHasEventController{
    public async create(personHasEvent: PersonHasEvent){
        await PersonHasEventModel.build(personHasEvent).validate();
        await PersonHasEventModel.create(personHasEvent);
    }
    public async read(id: number){
        let personHasEvent =(await PersonHasEventModel.findByPk(id))?.get();
        return personHasEvent;
    }
    public async readAll(){
        let personHasEvents = (await PersonHasEventModel.findAll()).map(table=>table.get());
        return personHasEvents;
    }
    public async readMany(count: number){
        let personHasEvents = (await PersonHasEventModel.findAll({limit: count})).map(table=>table.get());
        return personHasEvents;
    }
    public async update(id: number, personHasEvent: PersonHasEvent){
        await PersonHasEventModel.build(personHasEvent).validate();
        await PersonHasEventModel.update(personHasEvent, {where: {id: id}}); 
    }
    public async delete(id: number){
        await PersonHasEventModel.destroy({where: {id: id}});
    }
}