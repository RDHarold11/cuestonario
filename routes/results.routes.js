import express from "express";
const router = express.Router();
import { createResult, getResults } from "../controllers/resultsController.js";

router.post("/", createResult);
router.get("/", getResults);

export default router;
