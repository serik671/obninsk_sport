import { Sequelize, DataTypes, Model } from "sequelize";

import UserModel from "./models/user.model";
import UserTypeModel from "./models/userType.model";

export default class Database{
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

    public static initUserModel() {
        UserModel.init(
            {
                // Model attributes are defined here
                id: {
                    type: DataTypes.INTEGER,
                    //autoIncrement: true,
                    primaryKey: true,
                },

                login: {
                  type: DataTypes.STRING,
                  allowNull: false,
                },
                passwd: {
                  type: DataTypes.STRING,
                  allowNull: false,
                },
                type_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
              },
              {
                modelName: 'Users',
                sequelize: Database.getConnection(),
              },
        )
    }

    public static initUserTypeModel() {
        UserTypeModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    //autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                modelName: 'UserType',
                sequelize: Database.getConnection(),
            },
        )
    }

    public static makeUserLinks() {
        UserTypeModel.hasMany(UserModel, { foreignKey: 'type_id' });
        UserModel.belongsTo(UserTypeModel, { foreignKey: 'id' });
    }
}