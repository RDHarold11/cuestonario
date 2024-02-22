import Question from "../models/questionsModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createQuestion = asyncHandler(async (req, res) => {
  const { question } = req.body;
  const questionModel = new Question({
    question,
  });

  const createdQuestion = questionModel.save();
  if (createdQuestion) {
    res.status(201).json(createdQuestion);
  } else {
    res.status(404);
    throw new Error("Error al crear una pregunta");
  }
});

const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({});
  res.json(questions);
});

export { createQuestion, getQuestions };
