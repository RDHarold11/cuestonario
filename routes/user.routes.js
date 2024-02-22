import express from "express";
const router = express.Router();

import {
  authUser,
  registerUser,
  getAllUsers,
} from "../controllers/userController.js";

router.get("/", getAllUsers);
router.post("/auth", authUser);
router.post("/register", registerUser);

export default router;
