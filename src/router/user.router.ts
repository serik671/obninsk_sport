import {default as express, Router, Request, Response} from "express";
import UserController from "../controller/user.controller";

export default class UserRouter {
    private router: Router;

    private userController: UserController;

    constructor() {
        this.router = express.Router()

        this.userController = new UserController();
        this.initRoutes();
    };

    getRouter(): Router {
        return this.router;
    };

    private initRoutes(): void {
        this.router.route('/')
        .post((req: Request, res: Response) => {
            this.userController.addUser(req.body).then((result) => {
                res.status(201).send(result);
            },
            (error) => {
               res.status(500).send('Error when creating user');
            }
            );
        })
        .get((req: Request, res: Response) => {
            this.userController.getUsers(Number(req.query.limit)).then((result) => {
                res.send(result);
            },
            (error) => {
                res.status(500).send('Error when getting user');
            });
        });

        this.router.route('/:id')
        .get((req: Request, res: Response) => {
            this.userController.getUser(Number(req.params.id)).then((result) => {
                res.send(result);
            },
            () => {
                res.status(404).send("No users");
            })
        })
        .put((req: Request, res: Response) => {
            this.userController.updateUser(Number(req.params.id), req.body).then(() => {
                res.send(200);
            },
            (error) => {
                res.status(500).send('Error when updating user');
            });
        })
        .delete((req: Request, res: Response) => {
            this.userController.deleteUser(Number(req.params.id)).then(() => {
                res.send(200);
            },
            (error) => {
                res.status(500).send('Error when deleting user');
            });
        });
    };
};