import { Model } from "sequelize";

export interface Order{
    id: number;
    name: string;
    description: string|null;
}

export class OrderTable extends Model<Order>{}