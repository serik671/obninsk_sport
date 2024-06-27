import { Model } from "sequelize"

export interface Sport {
    id: number,
    name: string
}

export class SportModel extends Model<Sport> { }