import { Router } from "express";
import { Session } from "../controller/session.controller";
import UserController from "../controller/user.controller";
import { ValidationError } from "sequelize";
import { User } from "../database/model/user.model";
import { Person } from "../database/model/person.model";
import PersonController from "../controller/person.controller";
import { v4 } from "uuid";

export class SessionRouter{
    private router: Router = Router();
    private userController = new UserController();
    private personeController = new PersonController();
    constructor(){
        this.router.route("/login").post((req, resp)=>{
            let token = req.cookies["CSRF-Token"];
            let login: string = String(req.query.login) || "";
            let pswd: string = String(req.query.password) || "";
            if(token && Session.getUsers().get(token)){
                resp.status(409).send("User already login");
            }else{
                Session.login(login, pswd).then(token=>{
                    if(token){
                        resp.cookie("CSRF-Token", token);
                        resp.send("OK");
                    }else{
                        resp.status(409).send("No login");
                    }
                });
            }
        });
        this.router.route("/logout").post((req, resp)=>{
            let token: string = req.cookies["CSRF-Token"];
            Session.logout(token);
            resp.cookie("CSRF-Token", undefined);
            resp.send("OK");
        });
        this.router.route("/send-code").post((req, resp)=>{
            let person: Person = req.body;
            let session_id: string = Session.sendCodeOnEmail(person.email);
            resp.cookie("session_id", session_id);
            resp.send("OK");
        });
        this.router.route("/registration/:code").post((req, resp)=>{
            let code: number = Number(req.params.code) || 0;
            let session_id: string = req.cookies["session_id"];
            if(session_id && Session.getSessions().get(session_id)){
                if(Session.getSessions().get(session_id) === code){
                    Session.getSessions().delete(session_id);
                    let user: User = req.body[0];
                    let person: Person = req.body[1];
                    this.userController.addUser(user)
                    .then((userModel)=>{
                        let user: User = userModel.get();
                        let token: string = v4();
                        person.user_id = user.id;
                        this.personeController.addPerson(person)
                        .then(()=>{
                            Session.getUsers().set(token, user);
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

    public getRouter(): Router{
        return this.router;
    }

}