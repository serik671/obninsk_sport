import { User } from "../database/model/user.model";
import uuid from 'uuid';
import UserController from "./user.controller";

export class Session{
    private static users: Map<string, User> = new Map();
    private static sessions: Map<string, number> = new Map();
    public static login(username: string, password: string): string|undefined{
        let userController = new UserController();
        userController.getUserByLogin(username).then(result=>{
            if (result && result.passwd === password){
                let token: string = uuid.v4();
                Session.users.set(token, result);
                return token;
            }
        });
        return undefined;
    }
    public static sendCodeOnEmail(): string{
        let code: number = Math.ceil(Math.random()*1_000_000);
        //send email
        let session_id = uuid.v4()
        this.sessions.set(session_id, code);
        return session_id;
    }
    public static getUsers(){
        return this.users;
    }
    public static getSessions(){
        return this.sessions;
    }
    public static logout(token: string): void{
        this.users.delete(token);
    }
}