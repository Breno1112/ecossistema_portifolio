import { NextFunction, Router, Request, Response } from "express";

const userController = Router();

userController.get('/users', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send([]);
});

export default userController;