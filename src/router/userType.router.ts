import {default as express, Router, Request, Response} from "express";
import UserTypeController from "../controller/userType.controller";

export default class UserTypeRouter {
    private router: Router;

    private userTypeController: UserTypeController;

    constructor() {
        this.router = express.Router()

        this.userTypeController = new UserTypeController();
        this.initRoutes();
    };

    getRouter(): Router {
        return this.router;
    };

    private initRoutes(): void {
        this.router.route('/')
        .post((req: Request, res: Response) => {
            this.userTypeController.addUserType(req.body).then((result) => {
                res.status(201).send(result);
            },
            (error) => {
               res.status(500).send('Error when creating userType');
            }
            );
        })
        .get((req: Request, res: Response) => {
            this.userTypeController.getUserTypes(Number(req.query.limit)).then((result) => {
                res.send(result);
            },
            (error) => {
                res.status(500).send('Error when getting userType');
            });
        });

        this.router.route('/:id')
        .get((req: Request, res: Response) => {
            this.userTypeController.getUserType(Number(req.params.id)).then((result) => {
                res.send(result);
            },
            () => {
                res.status(404).send("No userTypes");
            })
        })
        .put((req: Request, res: Response) => {
            this.userTypeController.updateUserType(Number(req.params.id), req.body).then(() => {
                res.send(200);
            },
            (error) => {
                res.status(500).send('Error when updating userType');
            });
        })
        .delete((req: Request, res: Response) => {
            this.userTypeController.deleteUserType(Number(req.params.id)).then(() => {
                res.send(200);
            },
            (error) => {
                res.status(500).send('Error when deleting userType');
            });
        });
    };
};