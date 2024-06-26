import { Sequelize, DataTypes } from "sequelize";
import { ArticleModel } from "./model/article.model";
import { EventModel } from "./model/event.model";
import { SportModel } from "./model/sport.model";
import { PlaceModel } from "./model/place.model";
import { PlaceTypeModel } from "./model/placeType.model";
import { AgeModel } from "./model/age.model";

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
    public static getConnection(): Sequelize{
        return this.instance?.connection!;
    }
}