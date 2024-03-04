import asyncHandler from "../middlewares/asyncHandler.js";
import Results from "../models/resultsModel.js";
import { User } from "../models/userModel.js";

const createResult = asyncHandler(async (req, res) => {
  const { user_id, answers } = req.body;

  const newResult = new Results({
    user_id: user_id,
  });

  const createdResult = await newResult.save();
  if (createdResult) {
    const finalResult = await Results.findOne({
      _id: createdResult._id,
    });

    if (finalResult) {
      answers.map((item) =>
        finalResult.answers.push({
          question: item.question,
          answer: item.answer,
        })
      );
      /* Suma todas las respuestas positivas para obtener el score */
      let sum = 0;
      const finalScore = answers.map((item) => {
        if (item.answer == "Yes") {
          sum += 10;
        }
      });
      finalResult.score = sum;
      /* Calcular todos los resultados para asignarle el score al usuario */
      /*   const user = await User.findOne({ _id: user_id });
      const userResults = await Results.find({ user_id: user._id });

      user.score =
        userResults.reduce((acc, item) => item.score + acc, 0) /
        userResults.length; */

      /* const totalScore =
        userResults.length == 0
          ? userResults.reduce((acc, result) => acc + result.score, 0)
          : (user.score = user.score = totalScore.toFixed(2)); */

      await finalResult.save();
      /* await user.save(); */
      res.status(201).json("Resultado creado");
    } else {
      res.status(404);
      throw new Error("Resultado no encontrado");
    }
  } else {
    res.status(404);
    throw new Error("Resultado no creado");
  }
});

const calculateScore = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const results = await Results.find({ user_id: req.params.id });

  const maxScore = 100; // Supongamos que el puntaje máximo posible es 100

  const totalScore = results.reduce((acc, item) => item.score + acc, 0);
  const averageScore = results.length > 0 ? totalScore / results.length : 0;
  const scorePercentage = (averageScore / maxScore) * 100;

  if (!isNaN(scorePercentage)) {
    res.status(200).json({ message: "Score actualizado", scorePercentage });
    user.score = scorePercentage.toFixed(2); // Almacenar el puntaje como un porcentaje en el usuario
    await user.save();
  } else {
    res.status(400);
    throw new Error("No se pudo actualizar el score");
  }
});

/* const dd = () => {
  const user = await User.findById(req.params.id);
  const results = await Results.find({ user_id: req.params.id });

  const score =
    user.score == 0
      ? results.reduce((acc, item) => item.score + acc, 0)
      : results.reduce((acc, item) => item.score + acc, 0) / results.length;

  if (score) {
    res.status(200).json({ message: "Score actualizado" });
    user.score = score;
    await user.save();
  } else {
    res.status(400);
    throw new Error("No se pudo actualizar el score");
  }
} */

const getResultsByUser = asyncHandler(async (req, res) => {
  const results = await Results.find({ user_id: req.params.id });
  if (results) {
    res.status(200).json(results);
  } else {
    res.status(404);
    throw new Error("No se pudo encontrar los resultados");
  }
});

const getResultsById = asyncHandler(async (req, res) => {
  const results = await Results.findById(req.params.id);
  if (results) {
    res.status(200).json(results);
  } else {
    res.status(400);
    throw new Error("No se pudo encontrar el resultado");
  }
});

const getResults = asyncHandler(async (req, res) => {
  const results = await Results.find({});
  res.status(201).json(results);
});

export {
  createResult,
  getResults,
  calculateScore,
  getResultsById,
  getResultsByUser,
};
