import express from "express";
import { asyncHandler } from "../helpers/common/asyncHandler.js";
import CandidateController from "../controller/candidate-controller.js";

const router = express.Router();
const candidateController = new CandidateController();

router.post("", asyncHandler(candidateController.createCandidate));
router.get("/:id", asyncHandler(candidateController.getCandidateById));

export const candidateRoutes = router;