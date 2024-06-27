import { Model } from "sequelize";

export interface PlaceType {
    id: number,
    name: string
}

export class PlaceTypeModel extends Model<PlaceType> { }