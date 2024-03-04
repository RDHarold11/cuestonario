import asyncHandler from "../middlewares/asyncHandler.js";
import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { userCode, password } = req.body;

  const user = await User.findOne({ userCode: userCode });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      department: user.department,
      score: user.score,
    });
  } else {
    res.status(400);
    throw new Error("Codigo de usuario o password incorrectos");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("Usuario no encontrado");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, lastName, userCode, department, password } = req.body;

  const userExits = await User.findOne({ userCode: userCode });

  if (userExits) {
    res.status(400);
    throw new Error("El usuario ya existe");
  }
  const user = await User.create({
    name,
    lastName,
    password,
    userCode,
    department,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user.id,
      name: user,
      name,
      lastName: user.lastName,
      userCode: user.userCode,
      department: user.department,
      score: user.score,
    });
  } else {
    res.status(400);
    throw new Error("Data de usuario invalida");
  }
});

export { authUser, registerUser, getAllUsers, getUserById };
