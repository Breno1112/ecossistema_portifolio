import { NextFunction, Router, Request, Response } from "express";
import { isConnected } from "../drivers/postgres.driver";


const statusController = Router();

export default statusController;

statusController.get('/health', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(
        {
            status: "UP",
            databaseConnected: isConnected()
        }
        );
});