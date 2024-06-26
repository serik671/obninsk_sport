import { default as express, Express } from "express";
import dotenv from "dotenv";
import Database from "./database/config.database"
import UserRouter from "./router/user.router";
import PersonRouter from "./router/person.router";

class ObninskSport{
    private app: Express;
    private userRouter: UserRouter;

    private name: string;

    private port: number;

    constructor() {
        this.app = express();
        this.userRouter = new UserRouter();
        this.app.use(express.json());
        this.app.use('/user', this.userRouter.getRouter());
        this.app.use('/person', new PersonRouter().getRouter());

        dotenv.config();
        this.name = process.env.APP_NAME!;
        this.port = Number(process.env.APP_PORT!);
        let dbName: string = process.env.DB_NAME!;
        let dbUser: string = process.env.DB_USER!;
        let dbPassword: string = process.env.DB_PASSWORD!;

        Database.init(dbName, dbUser, dbPassword);
        Database.initUserModel();
        Database.initUserTypeModel();
        Database.initPersonModel();
        Database.linkPersoneUser();
        Database.makeUserLinks();
        Database.getConnection().sync().then(result=>{
            console.log("Database init!");
        })
        .catch(error=>{
            console.log("Database error", error);
        });
    }
    
    public run(): void{
        this.app.listen(this.port, "localhost", ()=>{
            console.log(this.name, "Server is running");
        });
    }
}

new ObninskSport().run();