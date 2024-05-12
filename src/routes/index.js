import userRoute from "./usersRoutes";
import express, { Router } from "express";
 

const router = Router()

router.use('/users', userRoute)

export default router;