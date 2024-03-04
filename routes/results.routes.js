import express from "express";
const router = express.Router();
import {
  createResult,
  getResults,
  calculateScore,
  getResultsById,
  getResultsByUser,
} from "../controllers/resultsController.js";

router.post("/", createResult);
router.get("/", getResults);
router.get("/:id", getResultsById);
router.get("/user/:id", getResultsByUser);
router.post("/calculate/:id", calculateScore);

export default router;
