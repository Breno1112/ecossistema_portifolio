import { NextFunction, Router, Request, Response } from "express";
import { businessLog, routeStepLog } from "../services/logger.service";
import { listUsers } from "../services/user.service";

const userController = Router();

userController.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    businessLog(req, "calling user servie to list users");
    const users = await listUsers(req);
    routeStepLog(req, {listUsersResponse: users});
    if(users.length < 1) {
        businessLog(req, "empty user list");
    } else {
        businessLog(req, "non-empty user list");
    }
    res.status(200).send(users);
});

userController.get('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send([{nome: "breno"}]);
});

export default userController;