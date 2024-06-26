import { Sequelize, DataTypes, Model } from "sequelize";

import UserModel from "./model/user.model";
import UserTypeModel from "./model/userType.model";
import { PersonModel } from "./model/person.model";

export default class Database {
    private static instance: Database | null = null;
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
        userName: string, userPassword: string): Database {
        if (Database.instance === null) {
            Database.instance = new Database(databaseName, userName, userPassword);
        }
        return Database.instance;
    }

    public static getConnection(): Sequelize {
        return this.instance?.connection!;
    }

    public static initUserModel() {
        UserModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
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
                tableName: 'user',
                sequelize: Database.getConnection(),
            },
        )
    }

    public static initUserTypeModel() {
        UserTypeModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                tableName: 'user_type',
                sequelize: Database.getConnection(),
            },
        )
    }
    public static initPersonModel() {
        PersonModel.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            middleName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize: this.getConnection(),
            tableName: "persone"
        });
    }

    public static linkPersoneUser(){
        UserModel.hasOne(PersonModel, {foreignKey: "user_id"});
    }

    public static makeUserLinks() {
        UserTypeModel.hasMany(UserModel, { foreignKey: 'type_id' });
    }
}