import { Model } from "sequelize";

export interface Flower{
    id: number;
    name: string;
    price: number;
}

export class FlowerTable extends Model<Flower>{}