import express from "express";
import {
  getProfile,
  updateProfile,
  updateProfileValidation,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, updateProfileValidation, updateProfile);

export default router;
