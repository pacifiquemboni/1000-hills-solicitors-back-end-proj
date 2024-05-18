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
userRoute.post("/reset",usersController.resetPassword)
// for paraming token from user
userRoute.post("/reset/:token", usersController.paramsToken);


export default userRoute;
