import { Router } from "express";
import { FlowerController } from "../controller/flower.controller";
import { ValidationError } from "sequelize";

export class FlowerRoute{
    private router = Router();
    private flowerController = new FlowerController();
    constructor(){
        this.router.route("/all")
        .get((req, resp)=>{
            this.flowerController.readAll().then((result)=>{
                resp.send(result);
            });
        })
        .post((req, resp)=>{
            let flower = req.body;
            this.flowerController.create(flower)
            .then(()=>{
                resp.status(201).send("Created!");
            })
            .catch(error=>{
                if (error instanceof ValidationError){
                    resp.status(409).send(error.errors[0].message);
                }else{
                    resp.status(500).send(error);
                }
            });
        });

        this.router.route("/:id")
        .get((req, resp)=>{
            let id: number = parseInt(req.params.id) || 0;
            this.flowerController.read(id).then(result=>{
                if(result){
                    resp.send(result);
                }else{
                    resp.status(404).send("Not found");
                }
            });
        })
        .put((req, resp)=>{
            let id: number = parseInt(req.params.id) || 0;
            let flower = req.body;
            this.flowerController.update(id, flower)
            .then(()=>{
                this.flowerController.read(id).then(result=>{
                    if(result){
                        resp.send(result);
                    }else{
                        resp.status(404).send("Not found");
                    }
                });
            }).catch((error)=>{
                if(error instanceof ValidationError){
                    resp.status(409).send(error.errors[0].message);
                }else{
                    resp.status(500).send(error);
                }
            });
        })
        .delete((req, resp)=>{
            let id: number = parseInt(req.params.id) || 0;
            this.flowerController.delete(id);
            resp.send("Deleted!");
        });
    }
    public getRouter(): Router{
        return this.router;
    }
}