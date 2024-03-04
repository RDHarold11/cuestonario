import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";
import cors from "cors";

app.use(cors());

const PORT = process.env.PORT || 5000;

import departmentsRoutes from "./routes/departments.routes.js";
import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/question.routes.js";
import resultRoutes from "./routes/results.routes.js";

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/departments", departmentsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/result", resultRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
