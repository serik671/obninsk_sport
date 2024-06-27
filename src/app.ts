import express from "express";
import dotenv from "dotenv";
import { Database } from "./database/config.database"
import { ArticleRouter } from "./router/article.router";
import { EventRouter } from "./router/event.router";
import { PlaceRouter } from "./router/place.router";
import { SportRouter } from "./router/sport.router";
import { PlaceTypeRouter } from "./router/placeType.router";
import { AgeRouter } from "./router/age.router";

class ObninskSport{
    private app;
    private port: number;
    private name: string;
    constructor(){
        dotenv.config();
        let dbName: string = process.env.DB_NAME!;
        let dbUser: string = process.env.DB_USER!;
        let dbPassword: string = process.env.DB_PASSWORD!;
        Database.init(dbName, dbUser, dbPassword);
        Database.initArticleModel();
        Database.initEventModel();
        Database.initSportModel();
        Database.initPlaceModel();
        Database.initPlaceTypeModel();
        Database.initAgeModel();
        Database.linkEventAge();
        Database.linkPlaceType();
        Database.linkEventPlace();
        Database.linkEventSport();
        Database.linkArticleEvent();
        Database.getConnection().sync({alter: true}).then(result=>{
            console.log("Database init!");
        })
        .catch(error=>{
            console.log("Database error", error);
        });
        this.app = express();
        this.port = Number(process.env.APP_PORT!);
        this.name = process.env.APP_NAME!;

        this.app.use(express.json());
        this.app.use("/article", new ArticleRouter().getRouter());
        this.app.use("/event", new EventRouter().getRouter());
        this.app.use("/place", new PlaceRouter().getRouter());
        this.app.use("/sport", new SportRouter().getRouter());
        this.app.use("/place-type", new PlaceTypeRouter().getRouter());
        this.app.use("/age", new AgeRouter().getRouter());
    }
    public run(): void{
        this.app.listen(this.port, "localhost", ()=>{
            console.log(this.name, "Server is running");
        });
    }
}

new ObninskSport().run();