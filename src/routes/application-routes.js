import express from "express";
import { asyncHandler } from "../helpers/common/asyncHandler.js";
import ApplicationController from "../controller/application-controller.js";

const router = express.Router();
const applicationController = new ApplicationController();

router.post("", asyncHandler(applicationController.createApplication));
router.patch("/:id", asyncHandler(applicationController.updateApplicationStage));

export const applicationRoutes = router;