import mongoose, { Schema } from "mongoose";

const answersChema = new Schema(
  {
    question: {
      type: String,
      default: "",
    },
    answer: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const resultsSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    answers: [answersChema],
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Results = mongoose.model("Results", resultsSchema);
export default Results;
