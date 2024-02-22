import express from "express";
const router = express.Router();

import { createDepartments } from "../controllers/departmentController.js";

router.post("/", createDepartments);

export default router;
