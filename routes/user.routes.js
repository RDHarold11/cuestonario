import express from "express";
const router = express.Router();

import {
  authUser,
  registerUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

router.get("/", getAllUsers);
router.post("/auth", authUser);
router.get("/:id", getUserById);
router.post("/register", registerUser);

export default router;
