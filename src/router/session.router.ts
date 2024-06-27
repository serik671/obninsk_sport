import { Router } from "express";
import { Session } from "../controller/session.controller";
import UserController from "../controller/user.controller";
import { ValidationError } from "sequelize";
import { User } from "../database/model/user.model";

export class SessionRouter{
    private router: Router = Router();
    private userController = new UserController();
    constructor(){
        this.router.route("/login").post((req, resp)=>{
            let token = req.cookies["CSRF-Token"];
            let login: string = String(req.query.login) || "";
            let pswd: string = String(req.query.password) || "";
            if(token && Session.getUsers().get(token)){
                resp.status(409).send("User already login");
            }else{
                token = Session.login(login, pswd);
                if(token){
                    resp.cookie("CSRF-Token", token);
                    resp.send("OK");
                }else{
                    resp.status(409).send("No login");
                }
            }
        });
        this.router.route("/send-code").post((req, resp)=>{
            let session_id: string = Session.sendCodeOnEmail();
            resp.cookie("session_id", session_id);
            resp.send("OK");
        });
        this.router.route("/registration/:code").post((req, resp)=>{
            let code: number = Number(req.params.code) || 0;
            let session_id = req.cookies["session_id"];
            if(session_id && Session.getSessions().get(session_id)){
                if(Session.getSessions().get(session_id) === code){
                    this.userController.addUser(req.body)
                    .then((userModel)=>{
                        let user: User = userModel.get();
                        let token = Session.login(user.login, user.passwd);
                        resp.cookie("CSRF-Token", token);
                        resp.send("OK");
                    })
                    .catch(error=>{
                        if (error instanceof ValidationError){
                            resp.status(409).send(error.errors[0].message);
                        }else{
                            resp.status(500).send(error);
                        }
                    });
                    
                }else{
                    resp.status(409).send("Bad code");
                }
            }else{
                resp.status(409).send("No registration");
            }
        });
    }
}