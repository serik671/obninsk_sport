import { Model } from "sequelize";

export interface Age {
    id: number,
    name: string
}

export class AgeModel extends Model<Age> { }