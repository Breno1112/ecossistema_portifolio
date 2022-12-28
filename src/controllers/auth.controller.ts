import { NextFunction, Router, Request, Response } from "express";
import { generateKeysForLogin } from "../services/auth.service";

const authController = Router();



authController.get('/key/generate', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await generateKeysForLogin());
});

export default authController;