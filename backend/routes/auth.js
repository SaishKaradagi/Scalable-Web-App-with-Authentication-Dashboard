import express from "express";
import {
  register,
  login,
  logout,
  registerValidation,
  loginValidation,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", protect, logout);

export default router;
