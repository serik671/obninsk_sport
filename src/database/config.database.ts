import { Sequelize, DataTypes } from "sequelize";

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
}