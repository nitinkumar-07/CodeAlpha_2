import express from "express";
import { isAuthenticated } from "../middleware/isAuthenicated.js";
import { postJob, getAllJobs, getJobById, getAdminJob, updateJob } from "../controller/jobController.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJob);
router.route("/get/:id").get( getJobById);
router.route("/update/:id").put(isAuthenticated, updateJob);

export default router;