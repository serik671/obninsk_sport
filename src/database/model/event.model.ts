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
    age_id: number,
    gender: 'F' | 'M' | 'A',
    deleted: boolean
}

export class EventModel extends Model<Event>{}