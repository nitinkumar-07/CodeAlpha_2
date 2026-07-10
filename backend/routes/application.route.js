import express from "express";
import { isAuthenticated } from "../middleware/isAuthenicated.js";
import { applyJob, getAppliedJobs, getApplicants, statusUpdate } from "../controller/applicationContoller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, statusUpdate);
                       

export default router;