import {default as express, Router, Request, Response} from "express";
import PersonController from "../controller/person.controller";

export default class PersonRouter {
    private router: Router;

    private personController: PersonController;

    constructor() {
        this.router = express.Router()

        this.personController = new PersonController();
        this.initRoutes();
    };

    getRouter(): Router {
        return this.router;
    };

    private initRoutes(): void {
        this.router.route('/')
        .post((req: Request, res: Response) => {
            this.personController.addPerson(req.body).then((result) => {
                res.status(201).send(result);
            },
            (error) => {
               res.status(500).send('Error when creating person');
            }
            );
        })
        .get((req: Request, res: Response) => {
            this.personController.getPersons(Number(req.query.limit)).then((result) => {
                res.send(result);
            },
            (error) => {
                res.status(500).send('Error when getting person');
            });
        });

        this.router.route('/:id')
        .get((req: Request, res: Response) => {
            this.personController.getPerson(Number(req.params.id)).then((result) => {
                res.send(result);
            },
            () => {
                res.status(404).send("No persons");
            })
        })
        .put((req: Request, res: Response) => {
            this.personController.updatePerson(Number(req.params.id), req.body).then(() => {
                res.send(200);
            },
            (error) => {
                res.status(500).send('Error when updating person');
            });
        })
        .delete((req: Request, res: Response) => {
            this.personController.deletePerson(Number(req.params.id)).then(() => {
                res.send(200);
            },
            (error) => {
                res.status(500).send('Error when deleting person');
            });
        });
    };
};