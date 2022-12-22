import express from 'express';
import statusController from './controllers/status.controller';
import userController from './controllers/user.controller';
import asyncLogger from './services/logger.service';

const app = express();
app.use(asyncLogger);
app.use(express.json());
app.use(userController);
app.use(statusController);

app.listen(3000, () => {
    console.log("API listening on localhost:3000");
});