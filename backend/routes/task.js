import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  createTaskValidation,
  updateTaskValidation,
  searchTasksValidation,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // Protect all task routes

router
  .route("/")
  .get(searchTasksValidation, getTasks)
  .post(createTaskValidation, createTask);

router
  .route("/:id")
  .get(getTask)
  .put(updateTaskValidation, updateTask)
  .delete(deleteTask);

export default router;
