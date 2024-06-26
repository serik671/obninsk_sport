import express from "express";
import dotenv from "dotenv";
import { Database } from "./database/config.database"
import { ArticleRoute } from "./route/article.router";
import { EventRoute } from "./route/event.router";
import { PlaceRoute } from "./route/place.router";
import { SportRoute } from "./route/sport.router";
import { PlaceTypeRoute } from "./route/placeType.router";
import { AgeRoute } from "./route/age.router";

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
        Database.getConnection().sync().then(result=>{
            console.log("Database init!");
        })
        .catch(error=>{
            console.log("Database error", error);
        });
        this.app = express();
        this.port = Number(process.env.APP_PORT!);
        this.name = process.env.APP_NAME!;

        this.app.use(express.json());
        this.app.use("/article", new ArticleRoute().getRouter());
        this.app.use("/event", new EventRoute().getRouter());
        this.app.use("/place", new PlaceRoute().getRouter());
        this.app.use("/sport", new SportRoute().getRouter());
        this.app.use("/place-type", new PlaceTypeRoute().getRouter());
        this.app.use("/age", new AgeRoute().getRouter());
    }
    public run(): void{
        this.app.listen(this.port, "localhost", ()=>{
            console.log(this.name, "Server is running");
        });
    }
}

new ObninskSport().run();