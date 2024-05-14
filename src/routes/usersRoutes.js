import express from "express";
import usersController from '../controllers/usersController.js';

const userRoute = express.Router();

userRoute.post('/register', usersController.registerUsers);
userRoute.get('/', usersController.getUsers);
userRoute.post('/verify/:token', usersController.verifyEmail);
//user login route
userRoute.post('/login',usersController.loginUser)
//get single user profile
userRoute.get('/:id', usersController.getSingleUser)
//update single user
userRoute.put('/:id', usersController.updateSingleUser)
//update password in profile
userRoute.patch('/:id', usersController.updateUserPassword)

export default userRoute;
