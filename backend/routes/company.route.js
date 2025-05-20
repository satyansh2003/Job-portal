import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);
router.route("/delete/:id").delete(async (req, res) => {
  const companyId = req.params.id;
  console.log("Recived id of: ", companyId);
  await Company.deleteMany({ _id: companyId });
  await Job.deleteMany({ company: companyId });  
  return res.status(201).json({
    message: "Company removed successfully.",
    success: true,
  });
});

export default router;
