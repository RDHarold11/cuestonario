import asyncHandler from "../middlewares/asyncHandler.js";
import { Departments } from "../models/userModel.js";

const createDepartments = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const department = new Departments({
    name,
  });
  const createdDepartments = await department.save();

  if (createdDepartments) {
    res.json(201).json(createdDepartments);
  } else {
    res.status(404);
    throw new Error("Error al crear un departamento");
  }
});

export { createDepartments };
