import express from "express";
import { asyncHandler } from "../helpers/common/asyncHandler.js";
import JobController from "../controller/job-controller.js";

const router = express.Router();
const jobController = new JobController();

router.get("", asyncHandler(jobController.getAllJob));
router.get("/:id", asyncHandler(jobController.getJobById));
router.get("/:id/applications", asyncHandler(jobController.getApplicationsByJobId));

export const jobRoutes = router;