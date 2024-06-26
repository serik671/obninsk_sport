import express from "express";
import dotenv from "dotenv";
import { Database } from "./database/config.database"
class FlowerMarket{
    private app;
    private port: number;
    private name: string;
    constructor(){
        dotenv.config();
        let dbName: string = process.env.DB_NAME!;
        let dbUser: string = process.env.DB_USER!;
        let dbPassword: string = process.env.DB_PASSWORD!;
        Database.init(dbName, dbUser, dbPassword);
        Database.getConnection().sync().then(result=>{
            console.log("Database init!");
        })
        .catch(error=>{
            console.log("Database error", error);
        });
        this.app = express();
        this.port = parseInt(process.env.APP_PORT!);
        console.log("Port", this.port);
        this.name = process.env.APP_NAME!;
        console.log("Name", this.name);

        this.app.use(express.json());

    }
    public run(): void{
        this.app.listen(this.port, "localhost", ()=>{
            console.log(this.name, "is running!");
        });
    }
}

new FlowerMarket().run();