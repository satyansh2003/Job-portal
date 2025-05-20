import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";
import { Job } from "../models/job.model.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/remove/:id").delete(async (req, res) => {
  let jobId = req.params.id;
  await Job.deleteMany({ _id: jobId });
  return res.status(201).json({
    message: "New job created successfully.",
    success: true,
  });
});

export default router;
