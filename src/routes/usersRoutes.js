import express, { Router } from "express";
import usersController from '../controllers/usersController.js'
// import verifyEmailRouter from "./verifyEmailRouter.js";

const userRoute = Router()

userRoute.post('/', usersController.registerUsers);

userRoute.get('/', usersController.getUsers);
userRoute.get('/verify/:token', usersController.verifyEmail);
export default userRoute;