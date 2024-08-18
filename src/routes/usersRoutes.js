import express from "express";
import usersController from "../controllers/usersController.js";
import authmiddleware from "../middleware/authmiddleware.js";

const userRoute = express.Router();

userRoute.post("/register", usersController.registerUsers);
userRoute.get(
  "/",
  authmiddleware.isAuthenticated,
  authmiddleware.checkAdminRole,
  usersController.getUsers
);
//get all Lawyers
userRoute.get(
  "/lawyers",
  usersController.getAdminStaff
);
userRoute.post("/verify/:token", usersController.verifyEmail);
//user login route
userRoute.post("/login", usersController.loginUser);
//get single user profile
userRoute.get(
  "/:id",
  // authmiddleware.isAuthenticated,
  usersController.getSingleUser
);
//update single user
userRoute.put(
  "/:id",
  authmiddleware.isAuthenticated,
  authmiddleware.checkAdminRole,
  usersController.updateSingleUser
);
//update password in profile
userRoute.patch(
  "/:id",
  authmiddleware.isAuthenticated,
  usersController.updateUserPassword
);
userRoute.post(
  "/reset",
  // authmiddleware.isAuthenticated,
  usersController.resetPassword
);
// for paraming token from user
userRoute.post(
  "/reset/:token",
  // authmiddleware.isAuthenticated,
  usersController.paramsToken
);

export default userRoute;
