import express from 'express';
import userController from './controllers/user.controller';
import asyncLogger from './services/logger.service';

const app = express();
app.use(asyncLogger);
app.use(express.json());
app.use(userController);

app.listen(3000, () => {
    console.log("API listening on localhost:3000");
});