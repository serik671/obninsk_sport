import { Router } from "express";
import { SportController } from "../controller/sport.controller";
import { ValidationError } from "sequelize";

export class SportRoute{
    private router: Router = Router();
    private sportController = new SportController();
    constructor(){
        this.router.route("/")
            .get((req, resp) => {
                let limit: number = Number(req.query.limit) || 10;
                if (limit < 0){
                    this.sportController.readAll().then(result=>{
                        resp.send(result);
                    });
                }else{
                    this.sportController.readMany(limit).then(result=>{
                        resp.send(result);
                    });
                }
            })
            .post((req, resp) => {
                this.sportController.create(req.body)
                    .then(() => {
                        resp.send("Created!");
                    })
                    .catch((error)=>{
                        if (error instanceof ValidationError){
                            resp.status(409).send(error.errors[0].message);
                        }else{
                            resp.status(500).send(error);
                        }
                    });
            });
        this.router.route("/:id")
            .get((req, resp)=>{
                let id = Number(req.params.id) || 0;
                this.sportController.read(id)
                    .then(result=>{
                        if(result === undefined){
                            resp.status(404).send("Not found");
                        }else{
                            resp.send(result);
                        }
                    });
            })
            .put((req, resp)=>{
                let id = Number(req.params.id) || 0;
                this.sportController.update(id, req.body)
                    .then(()=>{
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
            .delete((req, resp)=>{
                this.sportController.delete(Number(req.params.id)||0).then(()=>{
                    resp.send("Deleted");
                });
            });
    }
    public getRouter(): Router{
        return this.router;
    }
}