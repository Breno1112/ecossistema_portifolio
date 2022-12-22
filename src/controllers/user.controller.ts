import { NextFunction, Router, Request, Response } from "express";
import { UserDTO } from "../domain/dtos/user/user.domain";
import { businessLog, routeStepLog } from "../services/logger.service";
import { createUser, listUsers } from "../services/user.service";

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

userController.post('/users',  async (req: Request, res: Response, next: NextFunction) => {
    businessLog(req, "validating request body");
    let body: UserDTO;
    try {
        body = req.body as UserDTO;
    } catch (error) {
        routeStepLog(req, {route_step_error: error});
        res.status(400).send({message: "Bad request"});
        return;
    }
    routeStepLog(req, "got correct body in request");
    businessLog(req, "calling user service to add user");
    const response = await createUser(req, body);
    if(response.error != undefined) {
        res.status(422).send(response);
    } else {
        res.status(201).send(response);
    }
});

export default userController;