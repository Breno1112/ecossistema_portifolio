import { NextFunction, Router, Request, Response } from "express";
import { generateKeysForLogin, generateToken } from "../services/auth.service";

const authController = Router();



authController.get('/key/generate', async (req: Request, res: Response, next: NextFunction) => {
    const response = await generateKeysForLogin();
    if(response.error != undefined) {
        res.status(500).send(response);
    } else {
        res.status(200).send(response);
    }
});

authController.post('/auth/token', async (req: Request, res: Response, next: NextFunction) => {
    await generateToken(req.body);
    res.status(200).send({});
});

export default authController;