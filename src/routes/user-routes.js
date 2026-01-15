import express from "express";
import { asyncHandler } from "../helpers/common/asyncHandler.js";
import UserController from "../controller/user-controller.js";

const router = express.Router();
const userController = new UserController();

router.post("/", asyncHandler(userController.createUser));

export const userRoutes = router;