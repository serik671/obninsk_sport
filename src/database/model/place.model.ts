import { Model } from "sequelize";

export interface Place {
    id: number,
    name: string,
    address: string,
    type_id: number|null
}

export class PlaceModel extends Model<Place> { }