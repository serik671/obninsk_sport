import { Router } from "express";
import { ArticleController } from "../controller/article.controller";
import { ValidationError } from "sequelize";

export class ArticleRoute{
    private router: Router = Router();
    private articleController = new ArticleController();
    constructor(){
        this.router.route("/")
            .get((req, resp) => {
                let limit: number = Number(req.query) ?? 10;
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
    }
    public getRouter(): Router{
        return this.router;
    }
}