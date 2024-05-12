import express from "express";
import usersController from '../controllers/usersController.js';

const userRoute = express.Router();

userRoute.post('/register', usersController.registerUsers);
userRoute.get('/', usersController.getUsers);
userRoute.post('/verify/:token', usersController.verifyEmail);

export default userRoute;
