import { Router } from "express";
import { OrderController } from "../controller/order.controller";
import { ValidationError } from "sequelize";

export class OrderRoute{
    private router: Router = Router();
    private orderController: OrderController = new OrderController();
    constructor(){
        this.router.route("/")
        .get((req, resp)=>{
            this.orderController.readAll().then(result=>{
                resp.send(result);
            });
        })
        .post((req, resp)=>{
            let order = req.body;
            this.orderController.create(order).then(result=>{
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
            this.orderController.read(id).then(result=>{
                resp.send(result);
            });
        })
        .put((req, resp)=>{
            let id: number = parseInt(req.params.id) || 0;
            this.orderController.update(id, req.body)
            .then(result=>{
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
            let id: number = parseInt(req.params.id) || 0;
            this.orderController.delete(id);
        });
    }
    public getRouter(): Router{
        return this.router;
    }
}