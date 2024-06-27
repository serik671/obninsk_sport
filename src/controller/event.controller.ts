import { Event, EventModel } from "../database/model/event.model";

export class EventController{
    public async create(Event: Event){
        await EventModel.build(Event).validate();
        await EventModel.create(Event);
    }
    public async read(id: number){
        let Event =(await EventModel.findByPk(id))?.get();
        return Event;
    }
    public async readMany(count: number){
        let Events = (await EventModel.findAll({limit: count})).map(table=>table.get());
        return Events;
    }
    public async update(id: number, event: Event){
        await EventModel.build(event).validate();
        await EventModel.update(event, {where: {id: id}}); 
    }
    public async delete(id: number){
        await EventModel.destroy({where: {id: id}});
    }
}