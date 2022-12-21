import { NextFunction, Router, Request, Response } from "express";
import { listUsers } from "../services/user.service";

const userController = Router();

userController.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await listUsers();
    if(users.length < 1) {
        res.status(422).send(users);
    }
    res.setHeader("testebreno", "bla");
    res.status(200).send([]);
});

userController.get('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send([{nome: "breno"}]);
});

export default userController;