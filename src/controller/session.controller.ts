import { User } from "../database/model/user.model";
import {v4} from 'uuid';
import UserController from "./user.controller";
import MailController from "./mail.controller";

export class Session{
    private static users: Map<string, User> = new Map();
    private static sessions: Map<string, number> = new Map();
    public static async login(username: string, password: string){
        let userController = new UserController();
        const result = await userController.getUserByLogin(username);
        if (result && result.passwd === password) {
            let token: string = v4();
            Session.users.set(token, result);
            return token;
        } else {
            return undefined;
        }
    }
    public static sendCodeOnEmail(email: string): string{
        let code: number = Math.ceil(Math.random()*1_000_000);
        let mailController = new MailController();
        mailController.sendMail(email, "Регистрация", `Код подтверждения: ${code}`);
        let session_id: string = v4();
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