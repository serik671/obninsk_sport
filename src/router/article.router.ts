import { Router } from "express";
import { ArticleController } from "../controller/article.controller";
import { ValidationError } from "sequelize";

export class ArticleRouter{
    private router: Router = Router();
    private articleController = new ArticleController();
    constructor(){
        this.router.route("/")
            .get((req, resp) => {
                let limit: number = Number(req.query.limit) || 10;
                limit = limit < 0 ? 10 : limit;
                this.articleController.readMany(limit).then(result=>{
                    resp.send(result);
                });
            })
            .post((req, resp) => {
                this.articleController.create(req.body)
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
                this.articleController.read(id)
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
                this.articleController.update(id, req.body)
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
                this.articleController.delete(Number(req.params.id)||0).then(()=>{
                    resp.send("Deleted");
                });
            });
    }
    public getRouter(): Router{
        return this.router;
    }
}