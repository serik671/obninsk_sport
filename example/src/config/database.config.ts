import { Sequelize, DataTypes } from "sequelize";
import { FlowerTable } from "../model/flower.model"
import { OrderTable } from "../model/order.model";

export class Database{
    private static instance: Database|null = null;
    private connection: Sequelize;
    private constructor(databaseName: string, userName: string,
        userPassword: string) {
        this.connection = new Sequelize(databaseName, userName, userPassword,
            {
                dialect: "mysql"
            }
        );
    }
    public static init(databaseName: string,
        userName: string, userPassword: string): Database{
        if (Database.instance === null){
            Database.instance = new Database(databaseName, userName, userPassword);
        }
        return Database.instance; 
    }
    public static getConnection(): Sequelize{
        return this.instance?.connection!;
    }

    public static initFlower(): void{
        FlowerTable.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: false
                }
            },
            {
                sequelize: Database.getConnection(),
                tableName: "flower"
            }
        );
    }
    public static initOrder(): void{
        OrderTable.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
            }
        },{
            sequelize: Database.getConnection(),
            tableName: "order"
        });
    }
    public static linkOrderUser(): void{
        OrderTable.hasMany(FlowerTable, {onDelete: "cascade"});
    }
}