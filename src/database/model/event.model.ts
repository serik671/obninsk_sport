import { Model } from "sequelize";

export interface Event{
    id: number,
    name: string,
    start: Date,
    end: Date,
    award: Date|null,
    description: string,
    sport_id: number,
    place_id: number,
}

export class EventModel extends Model<Event>{}