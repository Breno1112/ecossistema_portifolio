import express from 'express';
import statusController from './controllers/status.controller';
import userController from './controllers/user.controller';
import asyncLogger from './services/logger.service';
import authController from './controllers/auth.controller';

const app = express();
app.use(asyncLogger);
app.use(express.json());
app.use(userController);
app.use(statusController);
app.use(authController)

app.listen(3000, () => {
    console.log("API listening on localhost:3000");
});