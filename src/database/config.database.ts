import { Sequelize, DataTypes } from "sequelize";
import { ArticleModel } from "./model/article.model";
import { EventModel } from "./model/event.model";
import { SportModel } from "./model/sport.model";
import { PlaceModel } from "./model/place.model";
import { PlaceTypeModel } from "./model/placeType.model";
import { AgeModel } from "./model/age.model";

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
  
    public static initArticleModel(){
        ArticleModel.init({
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            img: {
                type: DataTypes.BLOB('medium')
            },
            event_id: {
                type: DataTypes.INTEGER
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            sequelize: Database.getConnection(),
            tableName: "article"
        });
    }
    public static initEventModel(){
        EventModel.init({
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            start: {
                type: DataTypes.STRING,
                allowNull: false
            },
            end: {
                type: DataTypes.DATE,
                allowNull: false
            },
            award: DataTypes.DATE,
            description: DataTypes.STRING,
            sport_id: {
                type: DataTypes.INTEGER
            },
            place_id: {
                type: DataTypes.INTEGER
            },
            age_id: {
                type: DataTypes.INTEGER
            },
            gender: {
                type: DataTypes.ENUM('F', 'M', 'A'),
                allowNull: false,
                defaultValue: 'A'
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            sequelize: this.getConnection(),
            tableName: "event"
        });
    }
    public static initSportModel(){
        SportModel.init({
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize: this.getConnection(),
            tableName: "sport"
        });
    }
    public static initPlaceModel(){
        PlaceModel.init({
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type_id: DataTypes.INTEGER
        },
        {
            sequelize: this.getConnection(),
            tableName: "place"
        });
    }
    public static initPlaceTypeModel(){
        PlaceTypeModel.init({
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize: this.getConnection(),
            tableName: "place_type"
        });
    }
    public static initAgeModel(){
        AgeModel.init({
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize: this.getConnection(),
            tableName: "age"
        });
    }
    public static linkEventAge(){
        AgeModel.hasMany(EventModel, {foreignKey: "age_id"});
    }
    public static linkPlaceType(){
        PlaceTypeModel.hasMany(PlaceModel, {foreignKey: "type_id"});
    }
    public static linkEventPlace(){
        PlaceModel.hasMany(EventModel, {foreignKey: "place_id"});
    }
    public static linkEventSport(){
        SportModel.hasMany(EventModel, {foreignKey: "sport_id"});
    }
    public static linkArticleEvent(){
        EventModel.hasMany(ArticleModel, {
            foreignKey: "event_id"
        });
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

    public static getConnection(): Sequelize {
        return this.instance?.connection!;
    }

}