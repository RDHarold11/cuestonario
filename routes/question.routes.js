import express from "express";
const router = express.Router();

import {
  createQuestion,
  getQuestions,
} from "../controllers/questionsController.js";

router.post("/", createQuestion);
router.get("/", getQuestions);

export default router;
