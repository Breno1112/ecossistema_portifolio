import express from 'express';
import userController from './controllers/user.controller';

const app = express();
app.use(userController);

app.listen(3000, () => {
    console.log("API listening on localhost:3000");
});