import { Model } from "sequelize";

export interface PersonHasEvent {
    id: number,
    person_id: number,
    event_id: number
}

export class PersonHasEventModel extends Model<PersonHasEvent> { }