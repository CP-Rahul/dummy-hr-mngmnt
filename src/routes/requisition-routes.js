import express from "express";
import { asyncHandler } from "../helpers/common/asyncHandler.js";
import RequisitionController from "../controller/requisition-controller.js";

const router = express.Router();
const requisitionController = new RequisitionController();

router.post("", asyncHandler(requisitionController.createRequisition));
router.post("/:id/submit", asyncHandler(requisitionController.submitRequisitionForApproval));
router.post("/:id/decision", asyncHandler(requisitionController.decideRequisition));
router.get("", asyncHandler(requisitionController.findRequisitionByStatus));

export const requisitionRoutes = router;