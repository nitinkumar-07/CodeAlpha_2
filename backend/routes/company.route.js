import express from "express";
import { isAuthenticated } from "../middleware/isAuthenicated.js";
import { registerCompany, getAllCompanies, getCompanyById, updateCompany } from "../controller/companyController.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getAllCompanies);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);


export default router;